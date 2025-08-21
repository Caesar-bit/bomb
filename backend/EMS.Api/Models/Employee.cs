using System;

namespace EMS.Api.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string Status { get; set; } = "offline";
        public DateTime JoinDate { get; set; } = DateTime.UtcNow;
        public decimal Salary { get; set; }
        public int Performance { get; set; }
        public string? Location { get; set; }
        public DateTime? LastLogin { get; set; }
    }
}
