import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee-service';
import { Employee } from './Employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
  selectedEmployee: Employee | undefined;


  constructor(private backEnd : EmployeeService){   }
  ngOnInit(): void {
    //εδω παιρνουμε τον επιλεγμενο employee για να τον εμφανισουμε στο employee detail component.
    this.backEnd.employeeSelected.
    subscribe((employee:Employee) =>{
      this.selectedEmployee = employee;
    });
  }

}
