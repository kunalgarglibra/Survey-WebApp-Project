using Microsoft.AspNetCore.Mvc;
using SurveyWebApi.Model;
using SurveyWebApi.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SurveyWebApi.Interfaces.Users
{
    public interface IUserRepository
    {
        Task<User> Authenticate(string name, string password);

        void SubmitSurvey(SurveySubmitVM model);
    }
}
