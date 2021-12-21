import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { AddressServiceService } from 'src/app/Service/Address/address-service.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: AddressServiceService) { }

    public AddressesList:any [] = [];

  ngOnInit(): void {
     this.RefreshAddressesList();
  }

  formControl = new FormControl('', [
    Validators.required,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close()
    this.RefreshAddressesList();
  }

  public confirmAdd(): void {
    this.dataService.CreateAddress(this.data).subscribe(e=>{console.log(e) },er=>{console.log(er)});
    this.RefreshAddressesList()
  }

  RefreshAddressesList()
  {
    this.dataService.GetAllAddresses().subscribe(data =>{
      this.AddressesList = data;
    })
  }

}
