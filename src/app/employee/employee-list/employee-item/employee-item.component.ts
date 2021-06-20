import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/employee/Employee';
import { EmployeeService } from 'src/app/employee/employee-service';

@Component({
  selector: 'app-employee-item',
  templateUrl: './employee-item.component.html',
  styleUrls: ['./employee-item.component.css']
})
export class EmployeeItemComponent implements OnInit {
  @Input() employee: Employee = new Employee;
  constructor(private employeeService : EmployeeService) { }

  ngOnInit() {
  }

  onSelected(){
    this.employeeService.employeeSelected.emit(this.employee);
  }

}
