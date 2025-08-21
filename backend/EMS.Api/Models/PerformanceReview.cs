using System;

namespace EMS.Api.Models
{
    public class PerformanceReview
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public DateTime Date { get; set; }
        public int Score { get; set; }
        public string Comments { get; set; } = string.Empty;
        public Employee? Employee { get; set; }
    }
}
