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
  onSwitchMode(){this.isLoginMode=!this.isLoginMode;}
  onLogin(user:NgForm)
  {
    if(!user.valid)
    {
      console.log('User is not valid !')
      return;   
    }
    if(this.isLoginMode){
      console.log('You are in login mode ')

    }
    else
    {
      console.log("You are in signup mode ")
      const email=user.value.email;
      const password=user.value.password;
      this.auth.signup(email,password)
      .subscribe((res)=>{
        console.log(res)
      },(err)=>{
        console.log(err)
      });
      user.reset()
    }
  }
}
