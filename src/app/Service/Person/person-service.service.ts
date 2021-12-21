import { Injectable } from '@angular/core';
import { Person } from './person';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class PersonServiceService {

  constructor(public http : HttpClient) { }
  BaseURL = "https://localhost:44304/api"

  DataChange : BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);

  GetAllPeople(){
    return this.http.get<Person[]>(this.BaseURL+"/Person")
  }

  CreatePerson(newPerson:any){
    return this.http.post<Person>(this.BaseURL+"/Person/",newPerson)
  }

  GetPersonByID(id:number){
    return this.http.get<Person>(this.BaseURL+"/Person/"+id)
  }

  EditPerson(person:Person){
    return this.http.put(this.BaseURL+"/Person/"+person.personId,person)
  }

  DeletePerson(id:number){
    return this.http.delete(this.BaseURL+"/Person/"+id)
  }
}
