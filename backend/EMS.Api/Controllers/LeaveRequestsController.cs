using EMS.Api.Data;
using EMS.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EMS.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeaveRequestsController : ControllerBase
    {
        private readonly EmsDbContext _context;
        public LeaveRequestsController(EmsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeaveRequest>>> GetRequests()
            => await _context.LeaveRequests.AsNoTracking().ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<LeaveRequest>> GetRequest(int id)
        {
            var req = await _context.LeaveRequests.FindAsync(id);
            return req == null ? NotFound() : req;
        }

        [HttpPost]
        public async Task<ActionResult<LeaveRequest>> CreateRequest(LeaveRequest request)
        {
            _context.LeaveRequests.Add(request);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRequest), new { id = request.Id }, request);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRequest(int id, LeaveRequest request)
        {
            if (id != request.Id) return BadRequest();
            _context.Entry(request).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequest(int id)
        {
            var req = await _context.LeaveRequests.FindAsync(id);
            if (req == null) return NotFound();
            _context.LeaveRequests.Remove(req);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
