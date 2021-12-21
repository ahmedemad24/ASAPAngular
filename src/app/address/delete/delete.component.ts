import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddressServiceService } from 'src/app/Service/Address/address-service.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,@Inject(MAT_DIALOG_DATA) public data: any, public dataService: AddressServiceService) { }
  
  public AddressesList:any [] = [];

  ngOnInit(): void {
    this.RefreshAddressesList();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.DeleteAddress(this.data.addressId, this.data.personId).subscribe(e=>{console.log(e)},er=>{console.log(er)});
    this.dialogRef.close();
    this.RefreshAddressesList();
  }

  RefreshAddressesList()
  {
    this.dataService.GetAllAddresses().subscribe(data =>{
      this.AddressesList = data;
    })
  }

}
