import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { content } from '../model/content';
import { AddContentService } from '../services/add-content.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  constructor(private fb : FormBuilder, private add : AddContentService,
    private snackBar: MatSnackBar, private route : RouteService){}

  contentData = history.state.content;

  editContent = this.fb.group({
    title : [`${this.contentData?.title}`,[Validators.required,Validators.minLength(5)]],
    description : [`${this.contentData?.description}`,[Validators.required]]

  })

  get title(){return this.editContent.get('title')}
  get description(){return this.editContent.get('description')}

  ngOnInit(){
    console.log()
  }

  edit(){

    let title = this.editContent.value.title
    let desc = this.editContent.value.description
    // console.log(title)

     this.add.edit(this.contentData?.cid,title,desc).subscribe({
      next: data=>{
        console.log(`data: ${data}`)
        this.snackBar.open('Content Updated Successfully', 'OK', {
          duration: 3000
        });
        this.route.toDashboard();
      }
     })

  }

}
