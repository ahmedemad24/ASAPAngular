import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { PersonServiceService } from 'src/app/Service/Person/person-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: PersonServiceService) { }
    public PeopleList:any [] = [];

  ngOnInit(): void {
  }

  FormControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.FormControl.hasError('required') ? 'Field is required' :'';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.EditPerson(this.data).subscribe(e=>{console.log(e)},er=>{console.log(er)});
    this.dataService.GetAllPeople().subscribe(e=>e);
    this.dialogRef.close()
    this.RefreshPeopleList();
  }

  RefreshPeopleList()
  {
    this.dataService.GetAllPeople().subscribe(data =>{
      this.PeopleList = data;
    })
  }

}
