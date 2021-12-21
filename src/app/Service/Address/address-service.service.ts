import { Injectable } from '@angular/core';
import { Address } from './address';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import { Person } from '../Person/person';

@Injectable({
  providedIn: 'root'
})
export class AddressServiceService {

  constructor(public http : HttpClient) { }
  BaseURL = "https://localhost:44304/api"

  DataChange : BehaviorSubject<Address[]> = new BehaviorSubject<Address[]>([]);

  GetAllAddresses(){
    return this.http.get<Address[]>(this.BaseURL+"/Address")
  }
  
  CreateAddress(newAddress : any){
    return this.http.post<Address>(this.BaseURL+"/Address/",newAddress)
  }

  GetAddressByID(id:number){
    return this.http.get<Address>(this.BaseURL+"/Address/"+id)
  }

  GetAddressByPersonID(id:number){
    return this.http.get<Address[]>(this.BaseURL+"/Address/"+id)
  }

 EditAddress(address:Address){
   return this.http.put(this.BaseURL+"/Address/"+address.addressId,address)
 }

 DeleteAddress(addressID:number, personID:number){
   return this.http.delete(this.BaseURL+"/Address/"+addressID+"/"+personID)
 }

 GetPersonInAddress(){
  return this.http.get<Person[]>(this.BaseURL+"/Person")
 }
}
