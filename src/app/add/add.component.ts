import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddContentService } from '../services/add-content.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  constructor(private fb : FormBuilder, private add : AddContentService,
    private snackBar : MatSnackBar){}

  contentForm = this.fb.group({
    title : ['',[Validators.required,Validators.minLength(5)]],
    description : ['',[Validators.required]]

  })

  get title(){return this.contentForm.get('title')}
  get description(){return this.contentForm.get('description')}
  
  addContent() : void { 
    this.add.add(this.contentForm.value.title,this.contentForm.value.description).subscribe({
      next: data=>{
        //console.log(data)
        this.snackBar.open('Content Published Successfully', 'OK', {
          duration: 3000
        });
        this.reloadPage();
      }
      
    })

  }

  reloadPage(){
    window.location.reload()
  }

}
