using Dapper;
using EmployeeProject.Models;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Components;
using Npgsql;
using System.Data;

namespace EmployeeProject.Services
{
    public class DbServices : IDbServices
    {
        private readonly IDbConnection _db;
        public DbServices(IConfiguration db) 
        {
            _db = new NpgsqlConnection(db.GetConnectionString("EmployeeDB"));
        }
                
        public async Task<object> AddData(string command, object employee)
        {
            object result = (await (_db.ExecuteScalarAsync(command, employee)));
            return result;
        }


        public async Task<List<T>> GetAll<T>(string command, object employee)
        {
            var employees = (await _db.QueryAsync<T>(command, employee)).ToList();
            return employees;
        }   

        public async Task<T> GetAsync<T>(string command, object parms)
        {
            T result = (await _db.QueryAsync<T>(command, parms)).FirstOrDefault();
            return result;
        }


        public async Task<int> EditData(string command, object parms)
        {
            var result = (await _db.ExecuteAsync(command, parms));
            return result;
        }
        public async Task<T> GetAsyncAll<T>(string command, object parms)
        {
            var result = (await _db.QueryAsync(command, parms)).FirstOrDefault();
            return result;
        }
    }
}
