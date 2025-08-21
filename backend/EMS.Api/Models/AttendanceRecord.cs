using System;

namespace EMS.Api.Models
{
    public class AttendanceRecord
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; } = "Present"; // Present or Absent
        public Employee? Employee { get; set; }
    }
}
