//This service is Responcible for user signup and signin and token managment
import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { User } from './user.model';
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
           console.log("tap")
          console.log(resData)
       }))
    }

    // sign in into your acount
    login(email:string , password:string )
    {

       return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbg21E7AxSymXOccbQtnNjoVdIwYw9gnw',
        { email:email,
          password: password,
          returnSecureToken:true})
        

    }
}