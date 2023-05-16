using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SurveyWebApi.Dto;
using SurveyWebApi.Interfaces.Admin;
using SurveyWebApi.Model;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using WebAPI;

namespace SurveyWebApi.Data.Repo.Admin
{
    public class UserAdminRepository : IUserAdminRepository
    {
        private readonly DataContext dc;

        public UserAdminRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void AddUser(LoginReqDto loginreq)
        {
            byte[] passwordHash, passwordKey;
            using (var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(loginreq.Password));
            }

            User user = new User
            {
                Name = loginreq.Name,
                Email = loginreq.Email,
                Mobile = loginreq.Mobile,
                Password = loginreq.Password
            };
            dc.Users.Add(user);
        }

        public void DeleteUser(int userId)
        {
            var user = dc.Users.Find(userId);
            dc.Users.Remove(user);
        }

        public async Task<User> FindUser(int userId)
        {
            return await dc.Users.FindAsync(userId);
        }

        //public int FindUserByName(string name)
        //{
        //    string conn_str = @"server = QA10-13307.sotiqa.com; database = survey; user id = sa; password = Welcome1234";
        //    SqlConnection conn = new SqlConnection(conn_str);

        //    string query = "SELECT Id from Users where Name=" + name + ";";

        //    // SQL Command Reader for reading results
        //    SqlCommand comm = new SqlCommand(query, conn);
        //    conn.Open();

        //    SqlDataAdapter sda = new SqlDataAdapter(comm);
        //    DataTable dt = new DataTable();
        //    sda.Fill(dt);

        //    var nxtId = int.Parse(dt.Rows[0][0].ToString());

        //    return nxtId;
        //}

        public async Task<User> FindUserByNames(string name)
        {
            var user = await dc.Users.Where(u => u.Name == name).FirstAsync();
            return user;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await dc.Users.ToListAsync();
        }

        public async Task<bool> UserAlreadyExists(string name)
        {
            return await dc.Users.AnyAsync(x => x.Name == name);
        }
    }
}
