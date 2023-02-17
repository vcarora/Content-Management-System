import { Component,Input } from '@angular/core';
import { userData } from '../model/content';
import { AddContentService } from '../services/add-content.service';
import { RouteService } from '../services/route.service';
import { TokenStoreService } from '../services/token-store.service';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.css']
})
export class ContentCardComponent {

  @Input()
  userData : userData= {}

  constructor(private crud : AddContentService, private token_Store : TokenStoreService,private route: RouteService){}


  edit(content : any) {
    console.log(content)
       this.route.toEdit(content)   
   }
 
   delete(title : any, email: any){
console.log(title?.title)
console.log(email)

    let userSelection =  confirm('The content will get deleted.\n It cannot be restored again')
    if(userSelection){
     this.crud.deleteAdmin(title?.title,email).subscribe(
       response =>{
         console.log("deleted")
         window.location.reload()
       })
      }
   }
 

}
