import { EmployeeService } from 'src/app/employee/employee-service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Attribute } from 'src/app/attributes/attribute';
import { Employee } from '../../Employee';
import { EmployeeAttribute } from 'src/app/attributes/EmployeeAttribute';


@Component({
  selector: 'app-add-empattr',
  templateUrl: './add-empattr.component.html',
  styleUrls: ['./add-empattr.component.css']
})
export class AddEmpattrComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
              private backEnd:EmployeeService) { }

  displayedColumns: string[] = ['attrName', 'attrValue','add'];
  attributesToShow: Attribute[] = [];
  selection = new SelectionModel<Attribute>(false, []);

    attributes: Attribute[] = [];
    datasource : MatTableDataSource<Attribute> = new MatTableDataSource<Attribute>();
    @ViewChild(MatTable) myTable!: MatTable<any>;
    employee:Employee = new Employee();
    employeeAttributes: {
    empattrAttributeId: string,
    empattrAttribute:null }[] = [];
  ngOnInit(): void {
    console.log(this.attributes.length);
    this.datasource = new MatTableDataSource<Attribute>(this.attributes);
  }

  addEmpAttr(attrId:string,attrName:string){
    let empAttr:EmployeeAttribute  = new EmployeeAttribute();
    empAttr.empattrEmployeeId = this.employee.empId;
    empAttr.empattrAttributeId = attrId;
    this.backEnd.postEmpAttr(empAttr,this.employee);
    this.activeModal.dismiss('');
  }

}
