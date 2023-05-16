using Microsoft.EntityFrameworkCore;
using SurveyWebApi.Interfaces.Admin;
using SurveyWebApi.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI;

namespace SurveyWebApi.Data.Repo.Admin
{
    public class SurveyAdminRepository : ISurveyAdminRepository
    {
        private readonly DataContext dc;

        public SurveyAdminRepository(DataContext dc)
        {
            this.dc = dc;
        }

        //-------------------------------------------------------------Survey Methods-----------------------------------------------------

        public void AddSurvey(Survey survey)
        {     
            dc.Surveys.Add(survey);
        }

        public void DeleteSurvey(int surveyId)
        {
            var survey = dc.Surveys.Find(surveyId);
            dc.Surveys.Remove(survey);
        }

        public async Task<IEnumerable<Survey>> GetPublishedSurveys()
        {
            var surveys = await dc.Surveys.Where(prop => prop.Published == "Yes").ToListAsync();
            return surveys;

        }

        public async Task<Survey> GetSpecificSurvey(int surveyId)
        {
            return await dc.Surveys.FindAsync(surveyId);
        }

        public async Task<IEnumerable<Survey>> GetSurveysAsync()
        {
            return await dc.Surveys.ToListAsync();
        }




        // -------------------------------------------------------Question Methods---------------------------------------------------


        public void AddQuestion(Question question)
        {
         
            dc.Questions.Add(question);
           
        }

        public void DeleteQuestion(int questionId)
        {
            var question = dc.Questions.Find(questionId);
            dc.Questions.Remove(question);
        }

        public async Task<IEnumerable<Question>> GetQuestionsAsync(int surveyId)
        {
            var questions = await dc.Questions.Where(q => q.SurveyId == surveyId).ToListAsync();
            return questions;
        }

        public async Task<Question> GetSpecificQuestion(int surveyId)
        {
            return await dc.Questions.FindAsync(surveyId);
            
        }

    }
}
