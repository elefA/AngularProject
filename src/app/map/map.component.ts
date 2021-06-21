import { Attribute } from './../attributes/attribute';
import { Component, OnInit } from '@angular/core';
import { AttributeService } from '../attributes/attribute.service';
import { Employee } from '../employee/Employee';
import { EmployeeService } from '../employee/employee-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MapModalComponent } from './map-modal/map-modal.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  attributes: Attribute[] = [];
  attribute!: Attribute;
  displayedColumns: string[] = ['attrName', 'attrValue', 'delete'];

  displayedEmplColumns: string[] = ['name', 'address', 'showMap'];
  employees!: Employee[];
  empToShow!:Employee[];

  showAttributes:boolean=true;

  constructor(
    private attrBackEnd: AttributeService,
    private backEnd: EmployeeService,
    private modalService: NgbModal
  ) {
    attrBackEnd
      .getAttributesInstance()
      .subscribe((data) => (this.attributes = data));
    attrBackEnd.getAllAttributes().subscribe();

    backEnd.getEmployeesInstance().subscribe((data) => (this.employees = data));
    backEnd.getAllEmployees().subscribe();
  }

  cancelFilter(){
    this.showAttributes = true;
  }
  ngOnInit(): void {}

  showMap(emp:Employee){
    const ref = this.modalService
        .open(MapModalComponent, {

          size: 'lg',
          keyboard: false,
          centered: true,
        });

        ref.componentInstance.employee = emp;
        ref.componentInstance.employees = this.employees;


        ref.result.then((result) => {
          console.log(result);
          console.log('closed');

        })
        .catch((result) => {
          console.log(result);
          console.log('cancelling');
        });
  }
  selectAttribute(attr: Attribute) {
    this.empToShow = [];
    this.showAttributes=false;
    for (var emp of this.employees)
    {
      for (var empAttr of emp.employeeAttributes)
      {
        if (attr.attrId === empAttr.empattrAttributeId)
        {
          this.empToShow.push(emp);
          break;
        }
      }
    }


  }
}
