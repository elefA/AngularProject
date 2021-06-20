import { ApplicationService } from './application.service';
import { EmployeeService } from './employee/employee-service';


import { Component, Input } from '@angular/core';
import { Employee } from './employee/Employee';
import { OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  menuBool : boolean = true;
  title = 'CITE';
  employees : Employee[] = [];
  constructor(private backEnd : EmployeeService,private appSrv : ApplicationService,private router:Router){
    backEnd.getEmployeesInstance().subscribe(data=>this.employees = data);
    backEnd.getAllEmployees().subscribe();

  }
  ngOnInit(): void {

  }
  hideMenu(){
    this.menuBool = false;
  }
  showMenu(){
    this.menuBool = true;
    this.router.navigateByUrl("");
  }

}
