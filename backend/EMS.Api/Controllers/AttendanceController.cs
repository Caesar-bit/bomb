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
    public class AttendanceController : ControllerBase
    {
        private readonly EmsDbContext _context;
        public AttendanceController(EmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AttendanceRecord>>> GetRecords()
            => await _context.AttendanceRecords.AsNoTracking().ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<AttendanceRecord>> GetRecord(int id)
        {
            var record = await _context.AttendanceRecords.FindAsync(id);
            return record == null ? NotFound() : record;
        }

        [HttpPost]
        public async Task<ActionResult<AttendanceRecord>> CreateRecord(AttendanceRecord record)
        {
            _context.AttendanceRecords.Add(record);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRecord), new { id = record.Id }, record);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecord(int id, AttendanceRecord record)
        {
            if (id != record.Id) return BadRequest();
            _context.Entry(record).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecord(int id)
        {
            var record = await _context.AttendanceRecords.FindAsync(id);
            if (record == null) return NotFound();
            _context.AttendanceRecords.Remove(record);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("export")]
        public IActionResult Export(DateTime from, DateTime to, string format = "csv")
        {
            var records = _context.AttendanceRecords
                .Where(r => r.Date >= from && r.Date <= to)
                .AsNoTracking()
                .ToList();

            if (format == "json")
            {
                return Ok(records);
            }

            using var writer = new StringWriter();
            using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
            {
                csv.WriteRecords(records);
            }
            return File(System.Text.Encoding.UTF8.GetBytes(writer.ToString()), "text/csv", "attendance.csv");
        }
    }
}
