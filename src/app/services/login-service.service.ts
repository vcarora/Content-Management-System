import { HttpClient,HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const AUTH_API = 'http://localhost:8085/';
const Content_API = 'http://localhost:8085/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  loginStatus = new EventEmitter<any>;
  

  constructor(private http : HttpClient) { }

  register(name: string, email: string, password: string,role:string): Observable<any> {
    return this.http.post(Content_API + 'userdetails/register', {
      name,
      email,
      password,
      role
    }, httpOptions);
  }

  login(email : string, password : string): Observable<any>{
    return this.http.post(AUTH_API+'authentication/login',{email,password},httpOptions);
  }
}
