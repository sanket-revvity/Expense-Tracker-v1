using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dto;
using Server.Entities;

namespace Server.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly AuthContext context;

        public CategoryController(AuthContext context) {
            this.context = context;
        }

        // get All Categories
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await context.Categories
                .Select(c => new CategoryDto { Id = c.CategoryId, Name = c.Name })
                .ToListAsync();

            return Ok(categories);
        }

        // Get Category by Id
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var category = await context.Categories
                .Where(c => c.CategoryId == id)
                .Select(c => new CategoryDto { Id = c.CategoryId,Name = c.Name })
                .FirstOrDefaultAsync();

            if (category == null) {
                return NotFound("Category not found");
            }

            return Ok(category);
        }

        // Add Categoty
        [HttpPost]
        public async Task<IActionResult> AddCategory([FromBody] CreateCategoryDto categoryDto) {
            var category = new Category { Name = categoryDto.Name };

            context.Categories.Add(category);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCategoryById), new { id = category.CategoryId }, category);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] UpdateCategoryDto categoryDto)
        {
            var category = await context.Categories.FindAsync(id);

            if (category == null) {
                return NotFound("Category Not Found");
            }

            category.Name = categoryDto.Name;
            await context.SaveChangesAsync();

            return Ok(category);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound("Category not found");
            }

            context.Categories.Remove(category);
            await context.SaveChangesAsync();

            return NoContent();
        }

    }
}
