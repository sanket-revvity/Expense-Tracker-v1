using System.Security.Claims;
using System.Transactions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dto;
using static Server.Entities.Transaction;


namespace Server.Controllers
{
    [Route("api/transaction")]
    [ApiController]
    [Authorize]
    public class TransactionController : ControllerBase
    {
        private readonly AuthContext context;

        public TransactionController(AuthContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserTransactions()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var transactions = await context.Transactions
                .Where(t =>  t.UserId == userId)
                .Include(t => t.Category)
                .Select(t => new TransactionDto
                {
                    Id = t.Id,
                    CategoryName = t.Category.Name,
                    Amount = t.Amount,
                    Description = t.Description,
                    Date = t.Date,
                    Type = t.Type.ToString()
                }).ToListAsync();

            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransactionById(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var transaction = await context.Transactions
                .Where(t => t.UserId == userId && t.Id == id)
                .Include(t => t.Category)
                .Select(t => new TransactionDto
                {
                    Id = t.Id,
                    CategoryName = t.Category.Name,
                    Amount = t.Amount,
                    Description = t.Description,
                    Date = t.Date,
                    Type=t.Type.ToString()
                }).FirstOrDefaultAsync();

            if (transaction == null)
                return NotFound("Transaction not found");

            return Ok(transaction);
        }


        [HttpPost]
        public async Task<IActionResult> CreateTransaction([FromBody] CreateTransactionDto transactionDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (!Enum.TryParse(transactionDto.Type, out TransactionType transactionType))
                return BadRequest("Invalid transaction type. Use 'Expense' or 'Income'.");

            var transaction = new Entities.Transaction
            {
                UserId = userId,
                CategoryId = transactionDto.CategoryId,
                Amount = transactionDto.Amount,
                Description = transactionDto.Description,
                Date = transactionDto.Date == DateTime.MinValue ? DateTime.UtcNow : transactionDto.Date,
                Type = transactionType
            };

            context.Transactions.Add(transaction);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransactionById), new { id = transaction.Id }, transaction);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction(int id, [FromBody] UpdateTransactionDto transactionDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var transaction = await context.Transactions.FindAsync(id);

            if (transaction == null || transaction.UserId != userId)
                return NotFound("Transaction not found or access denied");

            if (!Enum.TryParse(transactionDto.Type, out TransactionType transactionType))
                return BadRequest("Invalid transaction type. Use 'Expense' or 'Income'.");

            transaction.Amount = transactionDto.Amount;
            transaction.Description = transactionDto.Description;
            transaction.CategoryId = transactionDto.CategoryId;
            transaction.Date = transactionDto.Date;
            transaction.Type = transactionType;

            await context.SaveChangesAsync();
            return Ok(transaction);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var transaction = await context.Transactions.FindAsync(id);

            if (transaction == null || transaction.UserId != userId)
                return NotFound("Transaction not found or access denied");

            context.Transactions.Remove(transaction);
            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("income")]
        public async Task<IActionResult> GetIncomeTransactions()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var incomeTransactions = await context.Transactions
                .Where(t => t.UserId == userId && t.Type == TransactionType.Income) 
                .Include(t => t.Category)
                .Select(t => new TransactionDto
                {
                    Id = t.Id,
                    CategoryName = t.Category.Name,
                    Amount = t.Amount,
                    Description = t.Description,
                    Date = t.Date,
                    Type = t.Type.ToString()
                })
                .ToListAsync();

            return Ok(incomeTransactions);
        }

        [HttpGet("expense")]
        public async Task<IActionResult> GetExpenseTransactions()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var expenseTransactions = await context.Transactions
                .Where(t => t.UserId == userId && t.Type == TransactionType.Expense) 
                .Include(t => t.Category)
                .Select(t => new TransactionDto
                {
                    Id = t.Id,
                    CategoryName = t.Category.Name,
                    Amount = t.Amount,
                    Description = t.Description,
                    Date = t.Date,
                    Type = t.Type.ToString()
                })
                .ToListAsync();

            return Ok(expenseTransactions);
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetTransactionSummary()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var totalIncome = await context.Transactions
                .Where(t => t.UserId == userId && t.Type == TransactionType.Income)
                .SumAsync(t => t.Amount); 

            var totalExpense = await context.Transactions
                .Where(t => t.UserId == userId && t.Type == TransactionType.Expense)
                .SumAsync(t => t.Amount); 

            var balance = totalIncome - totalExpense; 

            return Ok(new
            {
                TotalIncome = totalIncome,
                TotalExpense = totalExpense,
                Balance = balance
            });
        }

        [HttpGet("cat-spend")]
        public async Task<IActionResult> GetCategoryWiseSpending()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); 

            var categoryWiseSpending = await context.Transactions
                .Where(t => t.UserId == userId && t.Type == TransactionType.Expense) // Filter transaction for logged in user and type of transaction
                .GroupBy(t => new { t.CategoryId, t.Category.Name }) // Groupby categoryId and categoryName
                .Select(g => new
                {
                    CategoryId = g.Key.CategoryId,
                    CategoryName = g.Key.Name,
                    TotalAmount = g.Sum(t => t.Amount) 
                })
                .ToListAsync();

            return Ok(categoryWiseSpending);
        }


    }
}
