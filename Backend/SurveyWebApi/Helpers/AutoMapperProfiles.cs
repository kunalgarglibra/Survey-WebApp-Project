using AutoMapper;
using SurveyWebApi.Dto;
using SurveyWebApi.Model;

namespace WebAPI.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserUpdateDto>().ReverseMap();
            CreateMap<Survey, SurveyUpdateDto>().ReverseMap();
            CreateMap<Question, QuestionUpdateDto>().ReverseMap();

        }
    }
}
