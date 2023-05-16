using SurveyWebApi.Dto;
using SurveyWebApi.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SurveyWebApi.Interfaces.Admin
{
    public interface IUserAdminRepository
    {
        Task<IEnumerable<User>> GetUsersAsync();

        void AddUser(LoginReqDto loginreq);

        void DeleteUser(int userId);

        Task<User> FindUser(int userId);

        Task<bool> UserAlreadyExists(string name);

        //int FindUserByName(string name);

        Task<User> FindUserByNames(string name);
    }
}
