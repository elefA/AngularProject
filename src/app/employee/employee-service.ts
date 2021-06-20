import { Attribute } from './../attributes/attribute';
import { Employee } from './Employee';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { isBreakStatement } from 'typescript';
import { EmployeeAttribute } from '../attributes/EmployeeAttribute';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employeeSelected = new EventEmitter<Employee>();
  url = `https://localhost:44374/api/Employees1`;
  urlEmpAtr = `https://localhost:44374/api/EmployeeAttributes`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  //Class του employee με ακομα μια μεθοδο για να μετατρεπει ενα json row σε Employee object.
  adapter: Employee = new Employee();

  checkForAttributesToAdd(
    attributes: Attribute[],
    emplAttributes: Attribute[]
  ): Attribute[] {
    let attributesToAdd = new Array<Attribute>();
    let put = true;
    for (var attr of attributes) {
      put = true;
      for (var empAttr of emplAttributes) {
        if (attr.attrName === empAttr.attrName) {
          put = false;
          break;
        }
      }
      if (put) {
        attributesToAdd.push(attr);
      }
    }
    return attributesToAdd;
  }
  deleteEmpAttribute(attrId: string, employee: Employee) {
    this.http
      .delete(this.urlEmpAtr + '/' + attrId + '/' + employee.empId)
      .subscribe({
        next: (data) => {
          console.log('Delete successful');
          this.getAllEmployees().subscribe();
          //αφου γραψω το attribute θελω να επιλεχτει ο employee μιας και τους φερνω παλι ολους ενω δεν χρειαζεται...
          this.employeeSelected.emit();
        },
        error: (error) => {
          console.error('There was an error!', error.message);
        },
      });
  }
  //εδω ειναι το list που μπορουν ολα τα components να κανουν subscribe και να εχουν μια
  //up to date λιστα των Employees της βασης
  private employees: Employee[] = new Array<Employee>();

  //Object για να κανει συγχρονισμο του array απο το service με ενα στο component μεσω Observable.
  private employeesArray: BehaviorSubject<Employee[]> = new BehaviorSubject<
    Employee[]
  >(this.employees);

  constructor(private http: HttpClient) {}

  getEmployeesInstance(): Observable<Employee[]> {
    return this.employeesArray;
  }

  //αποθηκευει στην μεταβλητη employees την λιστα απο την βαση.
  getAllEmployees(): Observable<any> {
    this.employees = [];
    return this.http.get(this.url).pipe(
      map((data: any) => {
        data.map((item: any) => this.employees.push(this.adapter.adapt(item)));
        //Για να ενημερωθουν ολοι που ακουνε στο Observable του array
        this.employeesArray.next(this.employees);

        return;
      })
    );
  }

  updateEmployee(employee: Employee) {
    console.log(JSON.stringify(employee));
    return this.http
      .put(
        this.url + '/' + employee.empId,
        JSON.stringify(employee),
        this.httpOptions
      )
      .subscribe({
        error: (error) => {
          console.error('There was an error!', error.message);
        },
      });
  }
  postEmpAttr(empAttr:EmployeeAttribute,employee:Employee) {
    this.http.post(this.urlEmpAtr,
      JSON.stringify(empAttr), this.httpOptions).subscribe({
        next:(data)=>{
          this.getAllEmployees().subscribe();
          employee.employeeAttributes.push({
            empattrAttributeId: empAttr.empattrAttributeId,
            empattrAttribute: null
        });
        this.employeeSelected.emit();
        }
      });
  }
  createEmployee(employee: Employee) {
    employee.empId = uuid(); //generate a new uid.
    return this.http
      .post(this.url, JSON.stringify(employee), this.httpOptions)
      .subscribe({
        next: (data) => {
          this.getAllEmployees().subscribe();
          console.log('Created employee with name = ' + employee.empName);
        },
        error: (error) => {
          console.error('There was an error!', error.message);
        },
      });
  }

  deleteEmployee(employeeId: string) {
    return this.http.delete(this.url + '/' + employeeId).subscribe({
      next: (data) => {
        console.log('Delete successful');
        this.getAllEmployees().subscribe();
        //Διάβασα οτι δεν ειναι σωστο να κανεις subscribe μεσα στα Services αλλα δεν μπορεσα να κανω update αλλιως
        //την λιστα μου μετα το delete.
      },
      error: (error) => {
        console.error('There was an error!', error.message);
      },
    });
  }

  updateEmployeesList() {
    this.getAllEmployees();
  }
}
