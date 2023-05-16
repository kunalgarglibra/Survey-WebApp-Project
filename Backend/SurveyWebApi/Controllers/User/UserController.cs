using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SurveyWebApi.Dto;
using SurveyWebApi.Model;
using SurveyWebApi.ViewModel;
using System;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebAPI;
using WebAPI.Controllers;
using WebAPI.Interfaces;

namespace SurveyWebApi.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IConfiguration configuration;
     

        public UserController(IUnitOfWork uow, IConfiguration configuration)
        {
            this.uow = uow;
            this.configuration = configuration;
           
        }

        //api/user/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginReqDto loginReq)
        {
            var user = await uow.UserRepository.Authenticate(loginReq.Name, loginReq.Password);
            if(user == null)
            {
                return Unauthorized();
            }

            var loginRes = new LoginResDto
            {
                Name = loginReq.Name,
                Token = "token generated"
            };
            return Ok(loginRes);
        }

        /*private string CreateJWT(User user)
        {
            var secretKey = configuration.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var claims = new Claim[] {
                new Claim(ClaimTypes.Name,user.Name),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
            };

            var signingCredentials = new SigningCredentials(
                    key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(5),
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }*/




        [HttpPost("submitSurvey")]

        public async Task<IActionResult> SubmitSurvey(SurveySubmitVM model)
        {

            uow.UserRepository.SubmitSurvey(model);
            await uow.SaveAsync();
            return StatusCode(201);



        }
    }
}
