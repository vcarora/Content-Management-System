import { Component, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginServiceService } from '../services/login-service.service';
import { RouteService } from '../services/route.service';
import { TokenStoreService } from '../services/token-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role = null;
  loginStatus = new EventEmitter<any>;

  

  constructor(private fb: FormBuilder, private loginService : LoginServiceService, 
    private tokenStore : TokenStoreService,
    private route : RouteService,private snackBar: MatSnackBar){}
  
  ngOnInit(): void {
    if (this.tokenStore.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStore.getUser().role;
    }
  }


  loginForm = this.fb.group({
    email : ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    password : ['',[Validators.required,Validators.minLength(8)]]
  })

  get email(){return this.loginForm.get("email");}
  get password(){return this.loginForm.get("password");}

  onLogin(){
    console.log(this.loginForm.value)
    let email : any = this.loginForm.value.email
    let password : any = this.loginForm.value.password
    this.loginService.login(email,password).subscribe({
      next : data =>{
      //  this.reloadPage()
        this.tokenStore.saveToken(data.token);
        this.tokenStore.saveUser(data);
        this.tokenStore.saveEmail(data.email);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.tokenStore.getUser().role;
        this.loginStatus.emit(this.isLoggedIn)
        if(this.role == "admin")
        this.route.toAdmin()
        else 
        this.route.toDashboard()
        this.snackBar.open('Logged in Successfully', 'OK', {
          duration: 3000
        });
            
      },error : err=>{
        alert("Login Failed, Please try after sometime")
      }
    })
   
  
  }

  reloadPage() : void{
    window.location.reload();
  }

}
