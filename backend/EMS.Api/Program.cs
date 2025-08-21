using EMS.Api.Data;
using EMS.Api.Models;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<EmsDbContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=ems.db"));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

// Seed sample data
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<EmsDbContext>();
    db.Database.EnsureCreated();
    if (!db.Employees.Any())
    {
        db.Employees.AddRange(
            new Employee {
                Name = "Alice",
                Email = "alice@example.com",
                Position = "Developer",
                Department = "Engineering",
                Status = "online",
                JoinDate = DateTime.UtcNow.AddYears(-2),
                Salary = 90000,
                Performance = 92,
                Location = "New York",
                LastLogin = DateTime.UtcNow.AddMinutes(-30)
            },
            new Employee {
                Name = "Bob",
                Email = "bob@example.com",
                Position = "Designer",
                Department = "Design",
                Status = "away",
                JoinDate = DateTime.UtcNow.AddYears(-1),
                Salary = 75000,
                Performance = 88,
                Location = "San Francisco",
                LastLogin = DateTime.UtcNow.AddHours(-2)
            }
        );
        db.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.MapControllers();

app.Run();
