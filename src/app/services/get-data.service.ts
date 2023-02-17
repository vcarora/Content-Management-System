import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { content } from '../model/content';

const API_URL = 'http://localhost:8085/userdetails/user/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http : HttpClient) { }

  getAllContents(email : any): Observable<any> {
    
    // let httpHeaders = new HttpHeaders({
    //   'Authorization' : 'Bearer ' + localStorage.getItem('auth-token')
    // });
    // let requestOptions = {headers : httpHeaders}
    return this.http.get<Array<content>>(API_URL+'getCont');
  }

  getAll(): Observable<any> {

    return this.http.get<Array<content>>(API_URL+'getContent',httpOptions);
  }
}
