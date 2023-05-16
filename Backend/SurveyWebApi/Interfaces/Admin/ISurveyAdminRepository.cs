using SurveyWebApi.Model;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SurveyWebApi.Interfaces.Admin
{
    public interface ISurveyAdminRepository
    {
        //Survey Methods

        Task<IEnumerable<Survey>> GetSurveysAsync();

        void AddSurvey(Survey survey);

        void DeleteSurvey(int surveyId);

        Task<Survey> GetSpecificSurvey(int surveyId);

        Task<IEnumerable<Survey>> GetPublishedSurveys();

        // Question Methods

        Task<IEnumerable<Question>> GetQuestionsAsync(int surveyId);

        void AddQuestion(Question question);

        void DeleteQuestion(int questionId);

        Task<Question> GetSpecificQuestion(int surveyId);


    }
}
