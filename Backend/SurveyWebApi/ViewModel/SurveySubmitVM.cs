using SurveyWebApi.Model;
using System.Collections.Generic;

namespace SurveyWebApi.ViewModel
{
    public class SurveySubmitVM
    {
        public SurveySubmit Survey { get; set; }

        public List<ResponseSubmit> Response { get; set; }
    }
}
