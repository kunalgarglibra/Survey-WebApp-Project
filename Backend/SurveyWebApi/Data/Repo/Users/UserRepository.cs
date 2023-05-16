using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SurveyWebApi.Interfaces.Users;
using SurveyWebApi.Model;
using SurveyWebApi.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Security.Cryptography;
using System.Threading.Tasks;
using WebAPI;

namespace SurveyWebApi.Data.Repo.Users
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext dc;

        public UserRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<User> Authenticate(string name, string password)
        {
            return await dc.Users.FirstOrDefaultAsync(x => x.Name == name && x.Password == password);

            //For hashing
/*            if (user == null || user.SaltKey == null)
                return null;*/

/*            if (!MatchPasswordHash(passwordText, user.Password, user.SaltKey))
                return null;*/

/*            return user;*/
        }





        
        public void SubmitSurvey(SurveySubmitVM model)
        {
           
            string conn_str = @"server=localhost; database=survey; user id=sa; password=sa";
            SqlConnection conn = new SqlConnection(conn_str);

            // Query for next Id
            string query = "select ident_current('SurveySubmits') + ident_incr('SurveySubmits')";
            dc.SurveySubmits.Add(model.Survey);

            // SQL Command Reader for reading results
            SqlCommand comm = new SqlCommand(query, conn);
            conn.Open();

            SqlDataAdapter sda = new SqlDataAdapter(comm);
            DataTable dt = new DataTable();
            sda.Fill(dt);

            var nxtId = int.Parse(dt.Rows[0][0].ToString());

            foreach (ResponseSubmit resp in model.Response)
            {
                resp.SubmitSurveyId = nxtId;
                dc.ResponseSubmits.Add(resp);
            }


        }
























        //For hashing 
        /* private bool MatchPasswordHash(string passwordText, byte[] password, byte[] saltKey)
         {
             using (var hmac = new HMACSHA512(saltKey))
             {
                 var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordText));

                 for (int i = 0; i < passwordHash.Length; i++)
                 {
                     if (passwordHash[i] != password[i])
                         return false;
                 }
             }
             return true;
         }*/
    }
}
