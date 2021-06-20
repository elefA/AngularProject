import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Attribute } from '../attribute';
import { AttributeService } from '../attribute.service';

@Component({
  selector: 'app-attributes-list',
  templateUrl: './attributes-list.component.html',
  styleUrls: ['./attributes-list.component.css'],
})
export class AttributesListComponent implements OnInit {
  attributes: Attribute[] = [];
  attribute: Attribute = new Attribute();
  displayedColumns: string[] = ['attrName', 'attrValue', 'delete'];
  attrForm = this.fb.group({
    attrName: ['', Validators.required],
    attrValue: ['', Validators.required],
  });

  constructor(private attrBackEnd: AttributeService, private fb: FormBuilder) {
    attrBackEnd
      .getAttributesInstance()
      .subscribe((data) => (this.attributes = data));
    attrBackEnd.getAllAttributes().subscribe();
  }

  ngOnInit(): void {}
  onSubmit() {}
  deleteAttribute(attrDel: Attribute) {
    this.attrBackEnd.deleteAttribute(attrDel.attrId || '');
    this.emptyAttribute();
  }
  emptyAttribute() {
    this.attrBackEnd.attributeSelected.emit();
  }
  createAttribute() {
    let goon = true;
    this.copyFormValuesToAttribute();
    for (var i = 0; i < this.attributes.length; i++) {
      if (
        this.attribute.attrName === this.attributes[i].attrName &&
        this.attribute.attrValue === this.attributes[i].attrValue
      ) {
        goon = false;
        alert("This attribute already exists");
        break;
      }
    }
    if (goon) {
      this.attrBackEnd.createAttribute(this.attribute);
    }
  }
  copyFormValuesToAttribute() {
    this.attribute.attrName = this.attrForm.value.attrName;
    this.attribute.attrValue = this.attrForm.value.attrValue;
  }
  onAttrSelected() {
    this.attrBackEnd.attributeSelected.emit(this.attribute);
  }
}
