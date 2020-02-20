import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  providers:[AuthService]
})
export class AuthComponent {
  constructor(private auth :AuthService){}
  isLoginMode=true;
  isloading=false;
  onSwitchMode(){this.isLoginMode=!this.isLoginMode;}
  onLogin(user:NgForm)
  {
    if(!user.valid)
    {
      console.log('User is not valid !')
      return;   
    }
    if(this.isLoginMode){
      this.isloading=true;
      console.log('You are in login mode ')
      this.isloading=false;

    }
    else
    {
      console.log("You are in signup mode ")
      this.isloading=true;
      const email=user.value.email;
      const password=user.value.password;
      this.auth.signup(email,password)
      .subscribe((res)=>{
        console.log(res)
        this.isloading=false;
        
      },(err)=>{
        console.log(err)
        this.isloading=false;
      });
      
      user.reset()
    }
  }
}
