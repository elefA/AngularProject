import { AttributesComponent } from './attributes/attributes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';


const routes: Routes = [
  { path: 'empl-component', component: EmployeeComponent },
  { path: 'attr-component', component: AttributesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

