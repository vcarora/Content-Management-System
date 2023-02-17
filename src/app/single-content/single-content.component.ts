import { Component,Input } from '@angular/core';
import { content } from '../model/content';
import { AddContentService } from '../services/add-content.service';
import { GetDataService } from '../services/get-data.service';
import { RouteService } from '../services/route.service';
import { TokenStoreService } from '../services/token-store.service';

@Component({
  selector: 'app-single-content',
  templateUrl: './single-content.component.html',
  styleUrls: ['./single-content.component.css']
})
export class SingleContentComponent {


  constructor(private crud : AddContentService, private token_Store : TokenStoreService,private route: RouteService){}

  email : string|null = this.token_Store.getEmail()


  @Input()
  content?: content ={}

  edit(content : any) {
   console.log(content)
      this.route.toEdit(content)   
  }

  delete(title : any){
   let userSelection =  confirm('The content will get deleted.\n It cannot be restored again')
   if(userSelection){
    this.crud.delete(title?.title).subscribe(
      response =>{
        console.log("deleted")
        window.location.reload()

      })
    }    
  }

  

}
