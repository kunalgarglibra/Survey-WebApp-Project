


using Microsoft.EntityFrameworkCore;
using SurveyWebApi.Model;

namespace WebAPI
{
    public class DataContext: DbContext 
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Survey> Surveys { get; set; }

        public DbSet<Question> Questions { get; set; }

        public DbSet<SurveySubmit> SurveySubmits { get; set; }

        public DbSet<ResponseSubmit> ResponseSubmits { get; set; }

    }
}
