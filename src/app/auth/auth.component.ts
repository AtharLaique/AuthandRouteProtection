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
  error=false;
  message=''
  
  onSwitchMode(){
    if(this.error)
    {
      this.error=false;
      this.message=''
    }
    this.isLoginMode=!this.isLoginMode;
  }
  onLogin(user:NgForm)
  {
    if(!user.valid)
    {
      console.log('User is not valid !')
      return;   
    }
    if(this.isLoginMode){
      this.isloading=true;
      const email=user.value.email;
      const password=user.value.password;
      this.auth.login(email,password)
      .subscribe((res)=>{
        console.log(res)

      },(err)=>{
        console.log(err.error.error.message)
        this.isloading=false;
        this.error=true;
        this.message=err.error.error.message;
      })
      
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
        this.error=true;
        this.message='Acount is created';
       
        
      },(err)=>{
        console.log(err.error.error.message)
        this.isloading=false;
        this.error=true;
        this.message=err.error.error.message;
      });
      
     
    }
  }
}
