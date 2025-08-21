using EMS.Api.Data;
using EMS.Api.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<EmsDbContext>(opt => opt.UseInMemoryDatabase("ems"));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Seed sample data
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<EmsDbContext>();
    if (!db.Employees.Any())
    {
        db.Employees.AddRange(
            new Employee { Name = "Alice", Email = "alice@example.com", Position = "Developer", Department = "Engineering" },
            new Employee { Name = "Bob", Email = "bob@example.com", Position = "Designer", Department = "Design" }
        );
        db.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
