import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { PersonComponent } from './person/person.component';

const routes: Routes = [
  {path:"",component: PersonComponent},
  {path:"Home", component: PersonComponent},
  {path:"Home/Address/:id", component:AddressComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
