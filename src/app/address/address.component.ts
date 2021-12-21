import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { AddressServiceService } from '../Service/Address/address-service.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  Filter = true;
  Location = false;
  DataSource: any =new MatTableDataSource
  displayedColumns: string[] = ['AddressID','Location','Action']

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(public service:AddressServiceService , public ar:ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refresh()
  }

  refresh() {
    this.service.GetAddressByPersonID(this.ar.snapshot.params["id"]).subscribe(e => { 
      console.log(e);
      this.DataSource = new MatTableDataSource(e);
      this.DataSource.paginator = this.paginator;
    },er => {console.log(er)});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.DataSource.filter = filterValue.trim().toLowerCase();
    if (this.DataSource?.paginator) {
      this.DataSource.paginator?.firstPage();
    }
  }

  addNew(AddressID?:number,Location?:string, PersonID?:number) {
    PersonID=this.ar.snapshot.params["id"]
    const dialogRef = this.dialog.open(CreateComponent, {
      data: {addressId: AddressID, location: Location, personId : PersonID}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
      this.ngOnInit()
    });
    this.ngOnInit()
    this.refresh();
  }

  startEdit( AddressID:number,Location:string,PersonID:number){
    const dialogRef = this.dialog.open(EditComponent, {
      data: {addressId: AddressID, location: Location, personId: PersonID}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
      this.ngOnInit()
    });
    this.ngOnInit()
    this.refresh();
  }

  deleteItem( AddressID:number,Location:string,PersonID:number) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {addressId: AddressID,location:Location, personId: PersonID}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refresh();
      this.ngOnInit()
    });
    this.ngOnInit()
    this.refresh();
  }

  Filters(){
    this.Filter = !this.Filter
  }

}
