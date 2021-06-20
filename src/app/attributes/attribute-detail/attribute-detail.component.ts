import { Component, Input, OnInit } from '@angular/core';
import { Attribute } from '../attribute';

@Component({
  selector: 'app-attribute-detail',
  templateUrl: './attribute-detail.component.html',
  styleUrls: ['./attribute-detail.component.css']
})
export class AttributesDetailComponent implements OnInit {
  @Input() attribute :Attribute = new Attribute();
  constructor() { }

  ngOnInit(): void {
  }

}
