using EmployeeProject.Models;
using EmployeeProject.Services;
using System.Runtime.CompilerServices;

namespace EmployeeProject
{
    public static class EmployeeAPI
    {
        public static void RegisterEmployeeAPI(this WebApplication app)
        {
            app.MapPost("/Employee/AddNewEmp", AddNewEmployee);
          //  app.MapGet("/Employee/GetAllEmployees", GetAllEmployees);
            app.MapGet("/Employees/GetEmployeeByDepartId", GetEmployeeByDepartId);
            //app.MapGet("/Employees/DepartmentById", GetDepartmentById);
            app.MapGet("/Employees/GetAllDepartments", GetAllDepartments);
            //app.MapGet("/Employees/GetQualifications", GetQualifications);
            app.MapGet("/Employees/GetDocument", GetDocument);
            app.MapGet("/Employees/GetQualificationDrop", GetQualificationDrop);
            app.MapGet("/Employees/FetchAllData/{id}", FetchAllDetails);
            app.MapPut("/Employees/EditEmployeeInfo/{id}", EditEmployeeInfo);
            app.MapDelete("/Employees/DeleteEmployeeInfo/{id}", DeleteEmployeeInfo);
            app.MapDelete("/Employees/DeleteEmployeeQual/{id}", DeleteQualificationInfo);



        }

        private static async Task<IResult>AddNewEmployee(EmployeeModel empObj, IEmployeeServices services)
        {
        
            string retust = await services.AddNewEmployee(empObj);

            return  Results.Ok(retust);
        }


        //private static async Task<IResult> GetAllEmployees(IEmployeeServices services)
        //{
        //    List<EmployeeModel> employees = await services.GetAllEmployees();
        //    return Results.Ok(employees);
        //}

        private static async Task<IResult> GetEmployeeByDepartId(IEmployeeServices services)
        {
            List<EmployeeModel> employees = await services.GetEmployeeByDepartId();
            return Results.Ok(employees);
        }

        //private static async Task<IResult> GetDepartmentById(IEmployeeServices services, int id)
        //{
        //    DepartmentModel employees = await services.GetDepartmentById(id);
        //    return Results.Ok(employees);
        //}

        private static async Task<IResult> GetAllDepartments(IEmployeeServices services)
        {
            List<DepartmentModel> departments = await services.GetAllDepartments();
            return Results.Ok(departments);
        }
        //private static async Task<IResult> GetQualifications(IEmployeeServices services, int id)
        //{
        //    List<QualificationModel> employees = await services.GetQualifications(id);
        //    return Results.Ok(employees);
        //}
        private static async Task<IResult> GetDocument(IEmployeeServices services)
        {
            List<Document> employees = await services.GetDocument();
            return Results.Ok(employees);
        }

        private static async Task<IResult> GetQualificationDrop(IEmployeeServices services)
        {
            List<QualificationModel> employees = await services.GetQualificationDrop();
            return Results.Ok(employees);
        }

        private static async Task<IResult> FetchAllDetails(int id ,IEmployeeServices services)
        {
            var employee = await services.FetchAllDetails(id);
            return Results.Ok(employee);
        }

        private static async Task<IResult> EditEmployeeInfo(EmployeeModel employee, int id, IEmployeeServices services)
        {
            var result = (await services.EditEmployeeInfo(employee, id));
            return Results.Ok(result);

        }

        private static async Task<IResult> DeleteEmployeeInfo(int id, IEmployeeServices services)
        {
            string result = (await services.DeleteEmployeeInfo(id));
            return Results.Ok(result);
        }

        private static async Task<IResult> DeleteQualificationInfo(int id, int qualId, IEmployeeServices services)
        {
            string result = (await services.DeleteQualificationInfo(id, qualId));
            return Results.Ok(result);
        }

    }
}
