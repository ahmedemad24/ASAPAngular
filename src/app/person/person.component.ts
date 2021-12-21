import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { PersonServiceService } from '../Service/Person/person-service.service';
import { CreateComponent } from './create/create.component';
import { Person } from '../Service/Person/person';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  Filter = true;
  PersonName=false;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  DataSource : any = new MatTableDataSource
  DisplayColumns: string[] = ['PersonID', 'PersonName', 'Action']
  constructor(public service : PersonServiceService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.GetAllPeople();
  }

  GetAllPeople(){
    this.service.GetAllPeople().subscribe(e => {
      console.log(e);
      this.DataSource = new MatTableDataSource(e);
      this.DataSource.paginator = this.paginator;
    },er => {console.log(er)});
  }

  ApplyFilter(event : Event){
    const FilterValue = (event.target as HTMLInputElement).value;
    this.DataSource.filter = FilterValue.trim().toLowerCase();
    if(this.DataSource.paginator){
      this.DataSource.paginator?.firstpage();
    }
  }

  CreateNewPerson(){
    const DialogRef = this.dialog.open(CreateComponent,{
      data: {issue: Person}
    });
    DialogRef.afterOpened().subscribe(e =>{this.GetAllPeople()})
    DialogRef.afterClosed().subscribe(result =>{
      this.GetAllPeople()
      this.ngOnInit()
    });
    this.GetAllPeople()
  }

  EditPerson(personID : number, personName : string){
    const DialogRef = this.dialog.open(EditComponent,{
      data : {personId : personID, personName : personName}
    })
    DialogRef.afterOpened().subscribe(e =>{this.GetAllPeople()})
    DialogRef.afterClosed().subscribe(result =>{
      this.GetAllPeople()
      this.ngOnInit()
    });
    this.GetAllPeople();
    this.ngOnInit();
  }

  DeletePerson(PersonID : number, PersonName : string){
    const DialogRef = this.dialog.open(DeleteComponent,{
      data : {personId : PersonID, personName : PersonName}
    });
    DialogRef.afterClosed().subscribe(result =>{
      this.GetAllPeople()
      this.ngOnInit()
    });
    this.GetAllPeople()
  }

  Filters(){
    this.Filter != this.Filter
  }

}
