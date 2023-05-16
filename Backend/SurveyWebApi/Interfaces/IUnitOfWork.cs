using SurveyWebApi.Interfaces.Admin;
using SurveyWebApi.Interfaces.Users;
using System.Threading.Tasks;

namespace WebAPI.Interfaces
{
    public interface IUnitOfWork
    {

        IUserAdminRepository UserAdminRepository { get; }
        IUserRepository UserRepository { get; }

        ISurveyAdminRepository SurveyAdminRepository { get; }

        Task<bool> SaveAsync();

    }
}
