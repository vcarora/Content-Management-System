import { Component } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginServiceService } from '../services/login-service.service';
import { RouteService } from '../services/route.service';
import { TokenStoreService } from '../services/token-store.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  result : any;
  errorMessage : any 
  role = null;

  constructor(private fb: FormBuilder,private loginService : LoginServiceService,
    private tokenStore : TokenStoreService,
    private route : RouteService, private snackBar : MatSnackBar){}
  

  registerForm = this.fb.group({
    email : ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    password : ['',[Validators.required,Validators.minLength(8)]],
    name : ['',[Validators.required,Validators.minLength(3)]]
  })

  get email(){return this.registerForm.get("email");}
  get name(){return this.registerForm.get("name");}
  get password(){return this.registerForm.get("password");}

  onRegister() : any{
    // console.log(this.registerForm.value.email)
    // console.log(this.registerForm.value.name)
    // console.log(this.registerForm.value.password)
     let name : any = this.registerForm.value.name
     let email : any = this.registerForm.value.email
     let password : any = this.registerForm.value.password
     this.loginService.register(name,email,password,"user").subscribe({
      next : data =>{   
        console.log(data)
  
        this.loginService.login(email,password).subscribe({
          next: data =>{
            this.tokenStore.saveToken(data.token);
            this.tokenStore.saveUser(data);
            this.tokenStore.saveEmail(data.email);
            this.route.toDashboard()
          }
        })
        

        this.snackBar.open('Registration Successful', 'OK', {
          duration: 3000
        });
      
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage)
        alert("Registration Failed, Please try after sometime")
      }
     })
  }
  
  reloadPage() : void{
    window.location.reload();
  }

}
