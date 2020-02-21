//This service is Responcible for user signup and signin and token managment
import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { User } from './auth/user.model';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators'; 

export interface AuthResponceData{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string
}

Injectable ({providedIn: 'root'});
export class AuthService{
    
    //Subject inform all over the application our user data is changed
    //if authentication status is changed it's always change
    user =new Subject<User>();
    constructor( private http:HttpClient){}
    //Create acount
    signup(email:string , password:string ){
        console.log('signup service is called')
        return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbg21E7AxSymXOccbQtnNjoVdIwYw9gnw',{
        email:email,
        password: password,
        returnSecureToken:true
       }).pipe( tap(resData=>{
        console.log("tap signup")
        this.handleAuthuntication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
       }))
    }

    // sign in into your acount
    login(email:string , password:string )
    {

       return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbg21E7AxSymXOccbQtnNjoVdIwYw9gnw',
        { email:email,
          password: password,
          returnSecureToken:true})
          .pipe( tap(resData=>{
            console.log("tap Login")
            this.handleAuthuntication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
           }))
    
    }

    private handleAuthuntication(email:string,id:string,token:string,expireIn:number )
    {
         console.log('Handle Authentacation')
        const expirationDate=new Date( new Date().getDate()+ expireIn*1000)
        const user= new User(email , id ,token ,expirationDate);
        this.user.next(user);
     
    }
}