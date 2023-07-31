namespace EmployeeProject.Models
{
    public class EmployeeModel
    {
        public string EmployeeName { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeEmail { get; set; }
        public string EmployeePhone { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public List<QualificationModel>Qualifications { get; set; } 
        public List<Document>DocumentFiles { get; set; }
    }


    public class DepartmentModel
    {
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
    }
}
