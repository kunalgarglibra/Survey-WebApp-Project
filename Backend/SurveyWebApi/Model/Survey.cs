using System.ComponentModel.DataAnnotations;

namespace SurveyWebApi.Model
{
    public class Survey
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Published { get; set; }
    }
}
