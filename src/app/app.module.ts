import { EmployeeItemComponent } from './employee/employee-list/employee-item/employee-item.component';
import { AttributesComponent } from './attributes/attributes.component';
import { EmployeeComponent } from './employee/employee.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule}from '@angular/material/form-field';
import { MatIconModule}from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttributesListComponent } from './attributes/attributes-list/attributes-list.component';
import { AttributesDetailComponent } from './attributes/attribute-detail/attribute-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEmpattrComponent } from './employee/employee-details/add-empattr/add-empattr.component';
@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeItemComponent,
    AttributesComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    AttributesListComponent,
    AttributesDetailComponent,
    AddEmpattrComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'empl-component', component: EmployeeComponent},
      {path: 'attr-component', component: AttributesComponent},

    ]),
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
