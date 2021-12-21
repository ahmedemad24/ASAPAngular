import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonServiceService } from 'src/app/Service/Person/person-service.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
   public dataService: PersonServiceService) { }

   public PeopleList:any [] = [];

  ngOnInit(): void {
    this.RefreshPeopleList();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.DeletePerson(this.data.personId).subscribe(e=>{console.log(e)},er=>{console.log(er)});
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
