using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SurveyWebApi.Dto;
using SurveyWebApi.Model;
using System.Data;
using System.Threading.Tasks;
using WebAPI;
using WebAPI.Controllers;
using WebAPI.Interfaces;

namespace SurveyWebApi.Controllers
{
    public class UserAdminController: BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
      

        public UserAdminController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
            
        }


        [HttpGet("getUsers")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await uow.UserAdminRepository.GetUsersAsync();
            return Ok(users);
        }

        [HttpPost("addUser")]
        public async Task<IActionResult> AddUser(LoginReqDto loginreq)
        {
            if (string.IsNullOrEmpty(loginreq.Name.Trim()) ||
                string.IsNullOrEmpty(loginreq.Password.Trim()))
            {
                return BadRequest("Username or password cannot be null");
            }

            if (await uow.UserAdminRepository.UserAlreadyExists(loginreq.Name))
            {
                return BadRequest("already exists");
            }

            uow.UserAdminRepository.AddUser(loginreq);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpDelete("deleteUser/{userid}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {

            uow.UserAdminRepository.DeleteUser(userId);
            await uow.SaveAsync();
            return Ok(userId);

        }

        [HttpGet("getUser/{userId}")]

        public async Task<IActionResult>GetUser(int userId)
        {
            var user = await uow.UserAdminRepository.FindUser(userId);
            return Ok(user);
        }

        [HttpPut("updateuser/{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserUpdateDto userdto)
        {
            if (id != userdto.Id)
            {
                return BadRequest("Update not allowed");
            }
            var userFromDb = await uow.UserAdminRepository.FindUser(id);
            if (userFromDb == null)
            {
                return BadRequest("Update not allowed");
            }

            mapper.Map(userdto, userFromDb);
            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpGet("matchUser/{name}")]

        public async Task<IActionResult> GetUserPassword(string name)
        {

            var nxtId = await uow.UserAdminRepository.FindUserByNames(name);
            return Ok(nxtId.Id);

        }


    }
}
