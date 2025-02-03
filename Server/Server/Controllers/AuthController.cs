using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Dto;
using Server.Entities;
using Server.Helper;
using Server.Repository;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        private readonly IJwtHelper helper;

        public AuthController(IUserRepository userRepository, IJwtHelper helper)
        {
            this.userRepository = userRepository;
            this.helper = helper;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<ResponseDto>> Login([FromBody] LoginUserReqDto req)
        {
            User? user = await this.userRepository.GetUserByEmail(req.Email);
            ResponseDto res = new ResponseDto();
            
            if (user == null) {
                res.IsSuccessed = false;
                res.Message = "Invalid Credentials";
                return BadRequest(res);
            }
            if (!BCrypt.Net.BCrypt.Verify(req.Password, user.Password)){
                res.IsSuccessed = false;
                res.Message = "Invalid Credentials";
                return BadRequest(res);
            }

            LoginUserResDto userDetail = new LoginUserResDto()
            {
                AccessToken = this.helper.GenerateJwtToken(user)
            };

            res.Data = userDetail;

            return Ok(res);
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<ResponseDto>> Register([FromBody] RegisterUserDto req)
        {
            User? user = await this.userRepository.GetUserByEmail(req.Email);
            ResponseDto res = new ResponseDto();

            if (user != null)
            {
                res.IsSuccessed = false;
                res.Message = $"User with email {req.Email} already exists.";
                return BadRequest(res);
            }

            User newUser = new User()
            {
                Username = req.Username,
                Email = req.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(req.Password)
            };

            bool result =  await this.userRepository.AddUser(newUser);

            if (!result)
            {
                res.IsSuccessed = false;
                res.Message = "Internal Server Error";
                return BadRequest(res);
            }

            res.Message = "User registered successfully";
            return Ok(res);
        }


    }
}
