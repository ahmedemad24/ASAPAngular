import { Component, OnInit, Inject } from '@angular/core';
import { PersonServiceService } from 'src/app/Service/Person/person-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: PersonServiceService) { }
    public PeopleList : any[] = [];

  ngOnInit(): void {
    this.RefreshPeopleList();
  }

  FormControl = new FormControl('',[
    Validators.required,
  ]);

  getErrorMessage() {
    return this.FormControl.hasError('required') ? 'Field is required' : '';
  }

  submit() {
    // emppty stuff
    }

  onNoClick(): void {
    this.dialogRef.close();
    this.RefreshPeopleList();
  }

  public confirmAdd(): void {
    this.dataService.CreatePerson(this.data).subscribe(e=>{console.log(e) },er=>{console.log(er)});
  }

  RefreshPeopleList()
  {
    this.dataService.GetAllPeople().subscribe(data =>{
      this.PeopleList = data;
    })
  }

}
