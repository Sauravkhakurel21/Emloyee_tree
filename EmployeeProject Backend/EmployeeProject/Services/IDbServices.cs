using EmployeeProject.Models;

namespace EmployeeProject.Services
{
    public interface IDbServices
    {
        Task<object> AddData(string command, object employee);
        Task<List<T>> GetAll<T>(string command, object parms);
        Task<T> GetAsync<T>(string command, object parms);
        Task<int> EditData(string command, object parms);
        Task<T> GetAsyncAll<T>(string command, object parms);
    }
}
