import { Component,OnInit } from '@angular/core';
import { RouteService } from '../services/route.service';
import { TokenStoreService } from '../services/token-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLoggedIn = false;

  constructor(private tokenStore : TokenStoreService, private route: RouteService){}
  
  ngOnInit() : void{
    let user = this.tokenStore.getToken();
    if(user){
      console.log(user)
      this.isLoggedIn = true;
    }else 
    this.isLoggedIn =false
    
    
  } 

  logout(): void{
    this.tokenStore.singOut()
    //this.isLoggedIn = false
    this.reloadPage()

  }

  login():void{
    this.route.toLogin()
  }

  register():void{
    this.route.toRegister()
  }



  reloadPage() : void{
    window.location.reload();
  }


}
