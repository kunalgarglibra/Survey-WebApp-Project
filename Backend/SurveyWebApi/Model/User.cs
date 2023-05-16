using System.ComponentModel.DataAnnotations;

namespace SurveyWebApi.Model
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Email { get; set; }

        public string Mobile { get; set; }

        [Required]
        public string Password { get; set; }

        //For password salting when hashing the password
        //public byte[] SaltKey {get; set;}

    }
}
