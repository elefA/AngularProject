import { AttributeService } from './attribute.service';
import { Component, OnInit } from '@angular/core';
import { Attribute } from './attribute';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributesComponent implements OnInit {
  selectedAttribute: Attribute | undefined;
  constructor(private attrBackEnd:AttributeService) { }

  ngOnInit(): void {
    this.attrBackEnd.attributeSelected.
    subscribe((attribute:Attribute) =>{
      this.selectedAttribute = attribute;
    });
  }

}
