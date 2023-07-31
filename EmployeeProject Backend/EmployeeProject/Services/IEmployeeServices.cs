using EmployeeProject.Models;
using System.ComponentModel.DataAnnotations;

namespace EmployeeProject.Services
{
    public interface IEmployeeServices
    {
        Task<dynamic> AddNewEmployee(EmployeeModel model);
       // Task<List<EmployeeModel>> GetAllEmployees();
        Task<EmployeeModel> FetchAllDetails(int id);
        Task<List<EmployeeModel>> GetEmployeeByDepartId();
        //Task<DepartmentModel> GetDepartmentById(int id);
        Task<List<DepartmentModel>> GetAllDepartments();
       // Task<List<QualificationModel>> GetQualifications(int id);
        Task<List<Document>> GetDocument();
        Task<List<QualificationModel>> GetQualificationDrop();
        Task <string>EditEmployeeInfo(EmployeeModel model, int id);
        Task<string> DeleteEmployeeInfo(int id);
        Task<string> DeleteQualificationInfo(int id, int qualId);

        //Task<EmployeeModel> EditEmployeeAll(int id);


        //Task<returnType> Method_name(DataType parameter);







    }
}
