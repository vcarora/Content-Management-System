import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { content } from '../model/content';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private router:Router) { }

  toDashboard(){
    this.router.navigate(['dashboard'])
  }
  toLogin(){
    this.router.navigate(['login'])
  }
  toRegister(){
    this.router.navigate(['register'])
  }

  toEdit(content? : content){
    this.router.navigateByUrl(`edit/${content?.cid}`,{state:{content:content}});

  }

  toAdmin(){
    this.router.navigate(['admin'])
  }
}
