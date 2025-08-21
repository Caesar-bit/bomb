using System.Globalization;
using CsvHelper;
using EMS.Api.Data;
using EMS.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EMS.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly EmsDbContext _context;
        public EmployeesController(EmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
            => await _context.Employees.AsNoTracking().ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            return employee == null ? NotFound() : employee;
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, Employee employee)
        {
            if (id != employee.Id) return BadRequest();
            _context.Entry(employee).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return NotFound();
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("import")]
        public async Task<IActionResult> ImportEmployees(IFormFile file)
        {
            if (file == null || file.Length == 0) return BadRequest("File is required");
            using var reader = new StreamReader(file.OpenReadStream());
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
            var records = csv.GetRecords<Employee>();
            await _context.Employees.AddRangeAsync(records);
            await _context.SaveChangesAsync();
            return Ok(new { imported = _context.Employees.Count() });
        }

        [HttpGet("export")]
        public IActionResult ExportEmployees()
        {
            var employees = _context.Employees.AsNoTracking().ToList();
            using var writer = new StringWriter();
            using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
            {
                csv.WriteRecords(employees);
            }
            return File(System.Text.Encoding.UTF8.GetBytes(writer.ToString()), "text/csv", "employees.csv");
        }
    }
}
