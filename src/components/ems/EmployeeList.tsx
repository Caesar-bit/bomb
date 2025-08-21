import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Filter } from "lucide-react";
import { mockEmployees } from "@/data/mockData";
import { Employee } from "@/types/employee";
import { AddEmployeeDialog } from "@/components/ems/AddEmployeeDialog";

const getStatusColor = (status: Employee['status']) => {
  switch (status) {
    case 'online':
      return 'bg-online';
    case 'offline':
      return 'bg-offline';
    case 'busy':
      return 'bg-busy';
    case 'away':
      return 'bg-away';
    default:
      return 'bg-offline';
  }
};

const getStatusLabel = (status: Employee['status']) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(mockEmployees);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term === "") {
      setFilteredEmployees(mockEmployees);
    } else {
      const filtered = mockEmployees.filter(employee =>
        employee.name.toLowerCase().includes(term.toLowerCase()) ||
        employee.department.toLowerCase().includes(term.toLowerCase()) ||
        employee.position.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Employee Directory</CardTitle>
          <div className="flex items-center gap-2">
            <AddEmployeeDialog>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Employee
              </Button>
            </AddEmployeeDialog>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredEmployees.map((employee, index) => (
            <div
              key={employee.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(employee.status)}`} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{employee.name}</p>
                  <p className="text-xs text-muted-foreground">{employee.position}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {employee.department}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`text-xs border-current ${
                    employee.status === 'online' ? 'text-online' :
                    employee.status === 'busy' ? 'text-busy' :
                    employee.status === 'away' ? 'text-away' : 'text-offline'
                  }`}
                >
                  {getStatusLabel(employee.status)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};