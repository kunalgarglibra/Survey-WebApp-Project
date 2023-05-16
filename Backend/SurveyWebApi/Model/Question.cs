﻿using System.Collections.Generic;

namespace SurveyWebApi.Model
{
    public class Question
    {
        public int Id { get; set; }
        public string Quest { get; set; }

        public string Option1 { get; set; }

        public string Option2 { get; set; }

        public string Option3 { get; set; }

        public string Option4 { get; set; }

        public int SurveyId { get; set; }
    }
}
