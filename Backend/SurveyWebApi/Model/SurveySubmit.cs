namespace SurveyWebApi.Model
{
    public class SurveySubmit
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int SurveyId { get; set; }


    }

    public class ResponseSubmit
    {
        public int Id { get; set; }

        public string Question { get; set; }

        public string Answer { get; set; }

        public int SubmitSurveyId { get; set; }
    }
}
