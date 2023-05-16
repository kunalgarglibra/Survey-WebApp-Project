using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SurveyWebApi.Dto;
using SurveyWebApi.Model;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPI;
using WebAPI.Controllers;
using WebAPI.Interfaces;

namespace SurveyWebApi.Controllers.Admin
{
    public class SurveyAdminController: BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly DataContext dc;

        public SurveyAdminController(IUnitOfWork uow, IMapper mapper, DataContext dc)
        {
            this.uow = uow;
            this.mapper = mapper;
            this.dc = dc;
        }

        //-------------------------------------------------------survey methods----------------------------------------------------------

        //For displaying all the surveys
        [HttpGet("getSurveys")]
        public async Task<IActionResult> GetSurveys()
        {
            var surveys = await uow.SurveyAdminRepository.GetSurveysAsync();
            return Ok(surveys);
        }
         

        //For displaying one individual survey.
        [HttpGet("getSurvey/{surveyId}")]

        public async Task<IActionResult> GetSurvey(int surveyId)
        {
            var survey = await uow.SurveyAdminRepository.GetSpecificSurvey(surveyId);
            return Ok(survey);
        }

        //For displaying all the punlished surveys
        [HttpGet("getPublishedSurveys")]
        public async Task<IActionResult> GetPublishedSurveys()
        {
            var publishedSurveys = await uow.SurveyAdminRepository.GetPublishedSurveys();
            return Ok(publishedSurveys);
        }

        [HttpPost("addSurvey")]
        public async Task<IActionResult> AddSurvey(Survey survey)
        {
            survey.Published = "No";
            uow.SurveyAdminRepository.AddSurvey(survey);
            await uow.SaveAsync();
            return StatusCode(201);

        }

        [HttpDelete("deleteSurvey/{surveyId}")]
        public async Task<IActionResult> DeleteSurvey(int surveyId)
        {
            uow.SurveyAdminRepository.DeleteSurvey(surveyId);
            await uow.SaveAsync();
            return Ok(surveyId);
        }

        [HttpPut("updatesurvey/{id}")]
        public async Task<IActionResult> UpdateSurvey(int id, SurveyUpdateDto surveydto)
        {
            if (id != surveydto.Id)
            {
                return BadRequest("Update not allowed");
            }

            var surveyFromDb = await uow.SurveyAdminRepository.GetSpecificSurvey(id);

            if (surveyFromDb == null)
            {
                return BadRequest("Update not allowed");
            }

            mapper.Map(surveydto, surveyFromDb);
            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpPut("publishSurvey/{id}")]
        public async Task<IActionResult> PublishSurvey(int id)
        {
            var surveyFromDb = await uow.SurveyAdminRepository.GetSpecificSurvey(id);

            if (surveyFromDb == null)
            {
                return BadRequest("Update not allowed");
            }

            surveyFromDb.Published = "Yes";
            await uow.SaveAsync();
            return StatusCode(200);

        }

        //-------------------------------------------------------Question methods------------------------------------------------------------------------------

        [HttpPost("addQuestion/{surveyId}")]

        public async Task<IActionResult> AddQuestion(Question question, int surveyId)
        {   
            question.SurveyId = surveyId;          
            uow.SurveyAdminRepository.AddQuestion(question);
            await uow.SaveAsync();
            return StatusCode(201);

        }

        [HttpDelete("deleteQuestion/{questionId}")]

        public async Task<IActionResult> DeleteQuestion(int questionId)
        {

            uow.SurveyAdminRepository.DeleteQuestion(questionId);
            await uow.SaveAsync();
            return Ok(questionId);
        }

        [HttpGet("getQuestions/{surveyId}")]

        public async Task<IActionResult> GetQuestions(int surveyId)
        {

            var questions = await uow.SurveyAdminRepository.GetQuestionsAsync(surveyId);
            return Ok(questions);
        }

        [HttpGet("getQuestion/{questionId}")]

        public async Task<IActionResult> GetQuestion(int questionId)
        {

            var question = await uow.SurveyAdminRepository.GetSpecificQuestion(questionId);
            return Ok(question);
        }

        [HttpPut("updateQuestion/{questionId}")]

        public async Task<IActionResult> UpdateQuestion(QuestionUpdateDto question, int questionId)
        {

            if(question.Id != questionId)
            {
                return BadRequest("Update not allowed");
            }

            var questionFromDb = await uow.SurveyAdminRepository.GetSpecificQuestion(questionId);

            if(questionFromDb == null)
            {
                return NotFound("Not found");
            }

            mapper.Map(question, questionFromDb);
            await uow.SaveAsync();
            return StatusCode(200);
        }



        //--------------------------------------------------------------  Get Survey Reports -------------------------------------------------------------------

        [HttpGet("getReport/submittedSurveys")]

        public async Task<IActionResult> GetReport()
        {
            string conn_str = @"server=localhost; database=survey; user id=sa; password=sa";
            SqlConnection conn = new SqlConnection(conn_str);
            
            // Query for INNER Join
            string query = "SELECT * FROM SurveySubmits INNER JOIN Surveys ON SurveySubmits.SurveyId = Surveys.Id INNER JOIN Users ON SurveySubmits.UserId = Users.Id";

            // SQL Command Reader for reading results
            SqlCommand comm = new SqlCommand(query, conn);
            conn.Open();
            
            SqlDataAdapter sda = new SqlDataAdapter(comm);
            DataTable dt = new DataTable();
            sda.Fill(dt);
                        
            await uow.SaveAsync();
            return Ok(dt);

        }

        [HttpGet("getReport/SubmittedResponses/{submittedSurveyId}")]

        public async Task<IActionResult> GetSubmittedResponses(int submittedSurveyId)
        {
            var responses = await dc.ResponseSubmits.Where(r => r.SubmitSurveyId == submittedSurveyId).ToListAsync();
            return Ok(responses);
        }

        [HttpGet("getUserSubmittedStatus/{userId}")]

        public async Task<IActionResult> GetUserSubmittedStatus(int userId)
        {
            string conn_str = @"server=localhost; database=survey; user id=sa; password=sa";
  
            SqlConnection conn = new SqlConnection(conn_str);

            // Query for INNER Join
            string query = "SELECT surveyid, count(1) as cnt FROM SurveySubmits where userid =" + userId + "group by surveyid";

            // SQL Command Reader for reading results
            SqlCommand comm = new SqlCommand(query, conn);
            conn.Open();

            SqlDataAdapter sda = new SqlDataAdapter(comm);
            DataTable dt = new DataTable();
            sda.Fill(dt);

            await uow.SaveAsync();
            return Ok(dt);

        }
    }
}