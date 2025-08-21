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
    public class PerformanceController : ControllerBase
    {
        private readonly EmsDbContext _context;
        public PerformanceController(EmsDbContext context)
        {
            _context = context;
        }

        [HttpGet("reviews")]
        public async Task<ActionResult<IEnumerable<PerformanceReview>>> GetReviews()
            => await _context.PerformanceReviews.AsNoTracking().ToListAsync();

        [HttpGet("reviews/{id}")]
        public async Task<ActionResult<PerformanceReview>> GetReview(int id)
        {
            var review = await _context.PerformanceReviews.FindAsync(id);
            return review == null ? NotFound() : review;
        }

        [HttpPost("reviews")]
        public async Task<ActionResult<PerformanceReview>> CreateReview(PerformanceReview review)
        {
            _context.PerformanceReviews.Add(review);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetReview), new { id = review.Id }, review);
        }

        [HttpPut("reviews/{id}")]
        public async Task<IActionResult> UpdateReview(int id, PerformanceReview review)
        {
            if (id != review.Id) return BadRequest();
            _context.Entry(review).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("reviews/{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _context.PerformanceReviews.FindAsync(id);
            if (review == null) return NotFound();
            _context.PerformanceReviews.Remove(review);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("report")]
        public IActionResult Report(string format = "json")
        {
            var top = _context.PerformanceReviews
                .GroupBy(r => r.EmployeeId)
                .Select(g => new { EmployeeId = g.Key, AverageScore = g.Average(r => r.Score) })
                .OrderByDescending(x => x.AverageScore)
                .Take(5)
                .ToList();

            if (format == "csv")
            {
                using var writer = new StringWriter();
                using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
                {
                    csv.WriteRecords(top);
                }
                return File(System.Text.Encoding.UTF8.GetBytes(writer.ToString()), "text/csv", "performance_report.csv");
            }

            return Ok(top);
        }
    }
}
