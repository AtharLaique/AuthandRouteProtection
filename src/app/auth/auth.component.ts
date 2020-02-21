import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthResponceData } from '../auth.service';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  providers:[AuthService]
})
export class AuthComponent {
  authObs:Observable<AuthResponceData>;
  constructor(private auth :AuthService ,private route:Router){}
  isLoginMode=true;
  isloading=false;
  error=false;
  message=''
  
  //Siwith Mode for login / signup
  onSwitchMode(){
    if(this.error)
    {
      this.error=false;
      this.message=''
    }
    this.isLoginMode=!this.isLoginMode;
  }

  //On signup / Login
  onLogin(user:NgForm)
  {
    if(!user.valid)
    {
      console.log('User is not valid !')
      return;   
    }
    //Login Request
    if(this.isLoginMode){
      console.log("You are in Login mode ")
      this.isloading=true;
      const email=user.value.email;
      const password=user.value.password;
      this.authObs=this.auth.login(email,password);
    }
    //Signup request
    else
    {
      console.log("You are in signup mode ")
      this.isloading=true;
      const email=user.value.email;
      const password=user.value.password;
      this.authObs=this.auth.signup(email,password);
    }

    this.authObs.subscribe((res)=>{
      console.log("Request Successfully submitted !")
      this.isloading=false;
     if(this.isLoginMode){
       this.route.navigate(['/recipes'])
     }

      //Deal with Signup message
      if(!this.isLoginMode){
        this.error=true;
        this.message='Acount is created';
      }
    },(err)=>{
      console.log("An Error Occured")
      this.isloading=false;
      this.error=true;
      this.message=err.error.error.message;
    });
  }
}
