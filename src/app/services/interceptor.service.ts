import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStoreService } from './token-store.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  

  constructor(private token : TokenStoreService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req
    let token = this.token.getToken()
    //const token = this.token.getToken();
      if (token != null) {
 
        authReq = req.clone({setHeaders:{
          Authorization : 'Bearer '+token
        }
       });
      } 
       return next.handle(authReq)
    }
    
  }

