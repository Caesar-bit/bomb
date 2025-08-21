using Microsoft.EntityFrameworkCore;
using EMS.Api.Models;

namespace EMS.Api.Data
{
    public class EmsDbContext : DbContext
    {
        public EmsDbContext(DbContextOptions<EmsDbContext> options) : base(options) { }

        public DbSet<Employee> Employees => Set<Employee>();
        public DbSet<AttendanceRecord> AttendanceRecords => Set<AttendanceRecord>();
        public DbSet<PerformanceReview> PerformanceReviews => Set<PerformanceReview>();
        public DbSet<LeaveRequest> LeaveRequests => Set<LeaveRequest>();
    }
}
