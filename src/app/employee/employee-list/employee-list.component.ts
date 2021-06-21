import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee/employee-service';
import { Employee } from 'src/app/employee/Employee';
import { Router } from "@angular/router";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employee! : Employee;
  employees! : Employee[] ;
  constructor(private backEnd : EmployeeService) {
    backEnd.getEmployeesInstance().subscribe(data=>this.employees = data);
    backEnd.getAllEmployees().subscribe();
  }

  ngOnInit(): void {

  }
  createEmpl(){
    this.backEnd.employeeSelected.emit(new Employee());
  }

}
