using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Dto;
using Server.Repository;

namespace Server.Controllers
{
    [Route("api/user")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;

        public UserController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        [HttpGet]
        [Route("getalluser")]
        public async Task<ActionResult<ResponseDto>> GetAll()
        {
            ResponseDto responseDto = new ResponseDto();
            responseDto.Data = await this.userRepository.GetAllUsers();
            return Ok(responseDto);
        }
    }
}
