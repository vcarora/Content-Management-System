import { Component,OnInit } from '@angular/core';
import { content } from '../model/content';
import { GetDataService } from '../services/get-data.service';
import { TokenStoreService } from '../services/token-store.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  contentList : content[] =[]

  constructor(private getContent : GetDataService, private token_Store : TokenStoreService){}

  email : any = this.token_Store.getEmail()

  ngOnInit(){
    if( window.localStorage )
  {
    if( !localStorage.getItem('firstLoad') )
    {
      localStorage['firstLoad'] = true;
      window.location.reload();
    }  
    else
      localStorage.removeItem('firstLoad');
  }
    
    this.getContent.getAllContents(this.email).subscribe({
      next: data =>{
        this.contentList = data
        console.log(data)
      },error : err=>{
        alert("Failed to Load data")
      }
    })   
  }

  




  reloadPage() : void{
    window.location.reload();
  }

}
