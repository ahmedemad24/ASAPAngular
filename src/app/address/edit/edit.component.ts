import { Component, OnInit, Inject } from '@angular/core';
import { AddressServiceService } from 'src/app/Service/Address/address-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: AddressServiceService) { }

    public AddressesList:any [] = [];

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :'';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {

    this.dataService.EditAddress(this.data).subscribe(e=>{console.log(e)},er=>{console.log(er)});
    this.dialogRef.close();
  }

  RefreshAddressesList()
  {
    this.dataService.GetAllAddresses().subscribe(data =>{
      this.AddressesList = data;
    })
  }

}
