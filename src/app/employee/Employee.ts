import { formatDate } from '@angular/common';

export class Employee {
  empId : string ="";
  empName: string | undefined;
  empDateOfBirth: Date = new Date();
  empDateOfHire: Date  = new Date();
  empHasCar: boolean =false;
  empAddress: string | undefined;
  employeeAttributes: {
                      empattrAttributeId: string,
                      empattrAttribute:null }[] = [];

  //μεθοδος που καλειται για να μετατρεψει μια γραμμη απο json σε instance της κλασης Employee.
  adapt(item: any): Employee {
    const employee = new Employee();
    employee.empId = item.empId;
    employee.empName = item.empName;
    employee.empHasCar = item.empHascar;
    employee.empAddress = item.empAddress;
    employee.empDateOfBirth = new Date(item.empDateOfBirth);
    employee.empDateOfHire = new Date(item.empDateOfHire);
    employee.employeeAttributes = item.employeeAttributes;
    return employee;
  }
}
