using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using WebAPI;
using WebAPI.Controllers;
using WebAPI.Interfaces;

namespace SurveyWebApi.Controllers.Admin
{
    public class CountController: BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly DataContext dc;

        public CountController(IUnitOfWork uow, DataContext dc)
        {
            this.uow = uow;
            this.dc = dc;
        }

        [HttpGet("getUsers")]
        public async Task<IActionResult> GetUsersCount()
        {
            var user = await uow.UserAdminRepository.GetUsersAsync();
            return Ok(user.Count());
        }

        [HttpGet("getTotalSurveys")]

        public async Task<IActionResult> GetTotalSurveys()
        {
            var surveys = await uow.SurveyAdminRepository.GetSurveysAsync();
            return Ok(surveys.Count());
        }

        [HttpGet("getPublishedSurveys")]

        public async Task<IActionResult> GetPublishedSurveys()
        {
            var survyes = await uow.SurveyAdminRepository.GetPublishedSurveys();
            return Ok(survyes.Count());
        }

        [HttpGet("getSubmittedSurveys")]

        public async Task<IActionResult> GetSubmittedSurveys()
        {
            var surveys = await dc.SurveySubmits.ToListAsync();
            return Ok(surveys.Count());
        }

        [HttpPost("sendEmail")]
        [AllowAnonymous]
        public async Task<IActionResult> SendEmail()
        {
            //MailMessage message = new MailMessage();
            //System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient();
            //message.From = new MailAddress("amanvr2@gmail.com");
            //message.To.Add(new MailAddress("amanvr4@outlook.com"));
            //message.Subject = "Test";
            //message.IsBodyHtml = true; //to make message body as html  
            //message.Body = "hi";
            //smtp.Port = 587;
            //smtp.Host = "smtp.gmail.com"; //for gmail host  
            //smtp.EnableSsl = true;
            //smtp.UseDefaultCredentials = false;
            //smtp.Credentials = new NetworkCredential("amanvr2@gmail.com", "Canadianvr2@");
            //smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            //smtp.Send(message);

            var smtpClient = new System.Net.Mail.SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("amanvr2@gmail.com", "lugdeadmcunobrlz"),
                EnableSsl = true,
            };

            smtpClient.Send("amanvr2@gmail.com", "amanvr4@outlook.com", "subject", "body");

            await uow.SaveAsync();
            return Ok(201);
        }
    }
}
