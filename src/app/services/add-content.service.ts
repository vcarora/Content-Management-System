import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { content } from '../model/content';
import { TokenStoreService } from './token-store.service';


const Content_API = 'http://localhost:8085/userdetails/user/';
// const httpOptions = {
//   headers: new HttpHeaders({ 'Authorization' :'Bearer '+window.sessionStorage.getItem('auth-token') })
// };
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AddContentService {

  constructor(private http : HttpClient, private token : TokenStoreService) { }

  email : any = this.token.getEmail();

  add(title: any,description:any){  
    return this.http.post(Content_API+"addContent/",{title,description},httpOptions)
  }

  delete(content : any): Observable<any>{
    return this.http.delete(Content_API+'delete/'+content,httpOptions)
  }
  deleteAdmin(content : any,email : any): Observable<any>{
    return this.http.delete(Content_API+'deletead/'+content+"/"+email,httpOptions)
  }

  edit(cid : any,title: any,description: any){
    console.log(cid)
    return this.http.put(Content_API+'update/'+cid,{title,description},httpOptions)
  }
}

