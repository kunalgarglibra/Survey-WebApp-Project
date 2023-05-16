using SurveyWebApi.Data.Repo.Admin;
using SurveyWebApi.Data.Repo.Users;
using SurveyWebApi.Interfaces.Admin;
using SurveyWebApi.Interfaces.Users;
using System.Threading.Tasks;
using WebAPI.Interfaces;

namespace WebAPI.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext dc;

        public UnitOfWork(DataContext dc)
        {
            this.dc = dc;
        }
      

        public IUserAdminRepository UserAdminRepository => new UserAdminRepository(dc);

        public IUserRepository UserRepository => new UserRepository(dc);

        public ISurveyAdminRepository SurveyAdminRepository => new SurveyAdminRepository(dc);

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}
