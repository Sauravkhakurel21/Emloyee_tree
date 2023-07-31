using EmployeeProject.Models;
using Npgsql;
using System.Data;
using System.Reflection.Metadata.Ecma335;
using System.Xml.Linq;

namespace EmployeeProject.Services
{
    public class EmployeeServices : IEmployeeServices
    {
        private readonly IDbServices _dbServices;
        private readonly IWebHostEnvironment _env;
        public EmployeeServices(IDbServices services, IWebHostEnvironment env)
        {
            _dbServices = services;
            _env = env;
        }
        private readonly string _insertEmployee = @"select ""Employee"".add_new_employee(@EmployeeId,@EmployeeName,@EmployeeEmail, @EmployeePhone, @DepartmentId)";
        private readonly string _deleteEmployeeDetail = @"select ""Employee"".delete_employee_detail(@id)";

        private readonly string _insertDepartment = @"select ""Employee"".add_department(@DepartmentId,@DepartmentName)";

        private readonly string _insertDocument = @"select ""Employee"".add_documents(@DocumentId,@FileName, @File,@temp)";

        private readonly string _insertQualification = @"select ""Employee"".add_qualification(@QualificationId,@QualificationName,@temp, @Marks)";

        private readonly string _editEmployeeInfo = @"select ""Employee"".update_employee_details(@id,@EmployeeName,@EmployeeEmail, @EmployeePhone)";
        private readonly string _editEmployeeQual = @"select ""Employee"".update_employee_qualification(@Marks,
                                                    @QualificationId, @id)";
        private readonly string _editEmployeeDocs = @"select ""Employee"".update_employee_docs(@FileName, @File,                                                   @DocumentId, @id)";
        




        //private readonly string _getAllEmployees = @"select e.employee_id as EmployeeId,
	 	     //                                           e.employee_name as EmployeeName,
	 	     //                                           e.employee_mail as EmployeeEmail,
	 	     //                                           e.contact_number as EmployeePhone,
	 	     //                                           e.department_id as DepartmentId 
	 	     //                                           from ""Employee"".employeetable e ";

        private readonly string _getEmployeeByDepartId = @"select e.employee_id as EmployeeId,
                                                    e.employee_name as EmployeeName,
                                                    e.department_id as DepartmentId
                                                    from ""Employee"".employeetable e;";

        private readonly string _getEmployeeById = @"select e.employee_id as EmployeeId,
                                                    e.employee_name as EmployeeName ,
                                                    e.employee_mail as EmployeeEmail,
                                                    e.contact_number as EmployeePhone,
                                                    e.department_id as DepartmentId
                                                    from ""Employee"".employeetable e  where e.employee_id =  @id;";



        //private readonly string _getDepartmentById = @"select d.department_id as DepartmentId,
		      //                                          d.department_name  as DepartmentName 
		      //                                          from ""Employee"".department";

        private readonly string _getAllDepartments = @"select d.department_id as DepartmentId,
		                                                d.department_name  as DepartmentName 
		                                                from ""Employee"".department d";

        private readonly string _getQualification = @"select q.qualification_id as QualificationId,
		                                                q.qualification_name  as QualificationName, 
		                                                q.marks as Marks
		                                                from ""Employee"".qualification q where employee_id = @id";

        private readonly string _getDocument = @"  select d.document_id as DocumentId,
   			                                    d.document_name  as DocumentType
   			                                    from ""Employee"".documentlookup d";

        private readonly string _gerDcoMain = @"       select d.document_id  as DocumentId,
                                                        d.document_type  as DocumentType,
                                                        d.file as File,
                                                        d.file_name as FileName
                                                        from ""Employee"".documentstable d where d.employee_id = @id;";

        private readonly string _getQualificationDrop = @" select q.qualification_id as QualificationId,
		                                            q.qualification_name as QualificationName
		                                            from ""Employee"".qualificationlookup q ";
        private readonly string _deleteQual = @"select  ""Employee"".delete_emp_qual(@id, @qualId)";
        public async Task<dynamic> AddNewEmployee(EmployeeModel employeeObj)
        {
            try
            {
                object addEmployee = await _dbServices.AddData(_insertEmployee, new { employeeObj.EmployeeId, employeeObj.EmployeeName, employeeObj.EmployeeEmail, employeeObj.EmployeePhone, employeeObj.DepartmentId });
                int temp = int.Parse(addEmployee.ToString());

                var addDepartmrnt = await _dbServices.AddData(_insertDepartment, new { employeeObj.DepartmentId, employeeObj.DepartmentName });
                foreach (var qual in employeeObj.Qualifications)
                {
                    var parameter = new { qual.QualificationId, qual.QualificationName, temp, qual.Marks };
                    var addQual = await _dbServices.AddData(_insertQualification, parameter);
                }
                List<Document> tempDoc = employeeObj.DocumentFiles;

                foreach (var document in employeeObj.DocumentFiles)
                {
                    object path = SaveFile(document);
                    var parameter = new { document.DocumentId, document.FileName, document.File, temp };
                    var addDocument = await _dbServices.AddData(_insertDocument, parameter);
                }
                string msg = "Added new Employee Successfully";
                return msg;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }


        //public async Task<List<EmployeeModel>> GetAllEmployees()
        //{
        //    List<EmployeeModel> employees = (await _dbServices.GetAll<EmployeeModel>(_getAllEmployees, new { }));
        //    return employees;
        //}


        public async Task<List<EmployeeModel>> GetEmployeeByDepartId()
        {
           List< EmployeeModel> employee = await _dbServices.GetAll<EmployeeModel>(_getEmployeeByDepartId, new {  });
            return employee;
        }


        //public async Task<DepartmentModel> GetDepartmentById(int id)
        //{
        //    DepartmentModel department = await _dbServices.GetAsync<DepartmentModel>(_getDepartmentById, new { id });
        //    return department;
        //}


        public async Task<List<DepartmentModel>> GetAllDepartments()
        {
            List<DepartmentModel> departments = (await _dbServices.GetAll<DepartmentModel>(_getAllDepartments, new { }));
            return departments;
        }

        //public async Task<List<QualificationModel>> GetQualifications(int id)
        //{
        //    List<QualificationModel> departments = (await _dbServices.GetAll<QualificationModel>(_getQualification, new { id }));
        //    return departments;
        //}

        public async Task<List<Document>> GetDocument()
        {
            List<Document> document = (await _dbServices.GetAll<Document>(_getDocument, new { }));
            return document;
        }
        public async Task<List<QualificationModel>> GetQualificationDrop()
        {
            List<QualificationModel> qual = (await _dbServices.GetAll<QualificationModel>(_getQualificationDrop, new { }));
            return qual;
        }

        public async Task<EmployeeModel> FetchAllDetails(int id)
        {
            EmployeeModel employee = (await _dbServices.GetAsync<EmployeeModel>(_getEmployeeById, new { id }));

            employee.Qualifications = await _dbServices.GetAll<QualificationModel>(_getQualification, new { id });

            var temp = employee.DocumentFiles = await _dbServices.GetAll<Document>(_gerDcoMain, new { id });
            foreach (var doc in temp)
            {
                string dir = _env.ContentRootPath + @"\DocumentUploads";

                Document file = new Document();
                var TempUniquePath = dir + @"\" + doc.FileName;

                byte[] bytes;
                bytes = File.ReadAllBytes(TempUniquePath);
                var b64String = Convert.ToBase64String(bytes);
                file.FileName = doc.FileName;
                string type = file.FileName.Split('.').Last().ToLower();
                string prefix = "";
                if (type == "png")
                    prefix = "data:image/png;base64,";
                else if (type == "jpg" || type == "jpeg" || type == "jfif")
                    prefix = "data:image/jpeg;base64,";
                else if (type == "pdf")
                    prefix = "data:application/pdf;base64,";
                file.File = prefix + b64String;
            }

            return employee;
        }

       public async Task<string> DeleteEmployeeInfo(int id)
        {
            var result = (await _dbServices.GetAsync<dynamic>(_deleteEmployeeDetail, new { id }));
            string msg = "Deleted Data Success";
            return msg;
        }


        public async Task<string> EditEmployeeInfo(EmployeeModel employee, int id)
        {
            int result = (await _dbServices.EditData(_editEmployeeInfo, new { id, employee.EmployeeName, employee.EmployeeEmail, employee.EmployeePhone}));


            foreach (var qual in employee.Qualifications)
            {
                var parameter = new {qual.Marks,  qual.QualificationId, id};
                var addQual = await _dbServices.AddData(_editEmployeeQual, parameter);
            }
            List<Document> tempDoc = employee.DocumentFiles;

            foreach (var document in employee.DocumentFiles)
            {
                object path = SaveFile(document);
                var parameter = new { document.FileName,document.File, document.DocumentId, id };
                var addDocument = await _dbServices.AddData(_editEmployeeDocs, parameter);
            }
            return "Updated Successfully"; 
        }

        public async Task<string> DeleteQualificationInfo(int id, int qualId)
        {
            var result = (await _dbServices.GetAsync<dynamic>(_deleteQual, new { id, qualId }));
            return result;
        }

        public object SaveFile(Document file)
        {
            string DocPath = "DocumentUploads";

            Guid guid = Guid.NewGuid();
            string type = file.FileName.Split('.').Last().ToLower();
            file.FileName = guid.ToString() + "." + type;
            string prefix = "";
            if (type == "png")
                prefix = "data:image/png;base64,";
            else if (type == "jpg" || type == "jpeg" || type == "jfif")
                prefix = "data:image/jpeg;base64,";
            else if (type == "pdf")
                prefix = "data:application/pdf;base64,";
            string newfilestring = prefix + file.File;
            string dir = _env.ContentRootPath + DocPath;
            //string dir = "";
            //dir = directory + DocPath;
            if (!Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
            }
            string path = Path.Combine(dir, file.FileName);
            //string FilePath = path;
            string[] dataURL = file.File.Split(new char[] { ',' }, 2);
            byte[] byteArray = Convert.FromBase64String(dataURL[0]);
            File.WriteAllBytes(path, byteArray);
            return new { path, file };
        }
    }
}