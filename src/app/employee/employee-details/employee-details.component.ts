import { AddEmpattrComponent } from './add-empattr/add-empattr.component';
import { AttributeService } from './../../attributes/attribute.service';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Employee } from 'src/app/employee/Employee';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { EmployeeService } from 'src/app/employee/employee-service';
import { formatDate } from '@angular/common';
import { Attribute } from 'src/app/attributes/attribute';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  @ViewChild(MatTable) empAttrTable!: MatTable<any>;
  empAttributes: Attribute[] = [];
  allAttributes: Attribute[] = [];
  @Input() employee: Employee = new Employee();

  constructor(
    private backEnd: EmployeeService,
    private fb: FormBuilder,
    private attrBackEnd: AttributeService,
    private modalService: NgbModal
  ) {
    attrBackEnd
      .getAttributesInstance()
      .subscribe((data) => (this.allAttributes = data));
    attrBackEnd.getAllAttributes().subscribe();
  }

  openEmpAttrModal() {
    let attrToAdd : Attribute[];
    attrToAdd = this.backEnd.checkForAttributesToAdd(this.allAttributes,this.empAttributes);
    if (attrToAdd.length>0){
      const ref = this.modalService
        .open(AddEmpattrComponent, {
          backdrop: 'static',
          size: 'lg',
          keyboard: false,
          centered: true,
        });

        ref.componentInstance.attributes = attrToAdd;
        ref.componentInstance.employee = this.employee;


        ref.result.then((result) => {
          console.log(result);
          console.log('closed');
          this.empAttrTable.renderRows();
        })
        .catch((result) => {
          console.log(result);
          console.log('cancelling');
        });
    }
    else{
      alert("There are no available attributes to add. If you want to change the value of an already existing, delete it first ");
    }
  }

  employeeForm = this.fb.group({
    name: ['', Validators.required],
    dateOfHire: ['', Validators.required],
    address: ['', Validators.required],
    dateOfBirth: [''],
    hasCar: [''],
  });

  displayedColumns: string[] = ['attrName', 'attrValue', 'delete'];

  submitted = false;

  deleteEmpAttribute(attrId: string) {
    this.backEnd.deleteEmpAttribute(attrId, this.employee);
    this.populateEmpAttrs();

  }

  ngOnChanges() {
    if (this.employee) {
      this.passEmployeeToForm();
      this.populateEmpAttrs();
    }
  }

  ngOnInit(): void {
    this.passEmployeeToForm();
    this.populateEmpAttrs();
  }

  populateEmpAttrs() {
    this.empAttributes = [];
    for (var i = 0; i < this.employee.employeeAttributes.length; i++) {
      for (var attr of this.allAttributes) {
        if (
          attr.attrId === this.employee.employeeAttributes[i].empattrAttributeId
        ) {
          this.empAttributes.push(attr);
          break;
        }
      }
    }
    this.empAttrTable.renderRows();
  }

  passEmployeeToForm() {
    this.employeeForm.patchValue({
      name: this.employee.empName,
      address: this.employee.empAddress,
      dateOfBirth: [
        formatDate(this.employee.empDateOfBirth, 'yyyy-MM-dd', 'en'),
      ],
      dateOfHire: [formatDate(this.employee.empDateOfHire, 'yyyy-MM-dd', 'en')],
      hasCar: this.employee.empHasCar ? 'true' : 'false',
    });
    this.populateEmpAttrs();
  }
  copyFormValuesToEmployee() {
    this.employee.empName = this.employeeForm.value.name;
    this.employee.empHasCar =
      this.employeeForm.value.hasCar === 'true' ? true : false;
    this.employee.empAddress = this.employeeForm.value.address;
    this.employee.empDateOfBirth = new Date(
      this.employeeForm.value.dateOfBirth
    );
    this.employee.empDateOfHire = new Date(this.employeeForm.value.dateOfHire);
  }

  updateEmployee() {
    this.copyFormValuesToEmployee();
    this.backEnd.updateEmployee(this.employee);
  }

  createEmployee() {
    if (confirm('Are you sure?')) {
      this.copyFormValuesToEmployee();
      this.backEnd.createEmployee(this.employee);
    }
  }

  emptyEmployee() {
    this.backEnd.employeeSelected.emit();
  }
  deleteEmployee() {
    if (confirm('Are you sure you want to delete ' + this.employee.empName)) {
      this.backEnd.deleteEmployee(this.employee.empId || '');
      this.emptyEmployee();
    }
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.employeeForm.value);
  }
}
