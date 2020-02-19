//This service is Responcible for user signup and signin and token managment
import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';

Injectable ({providedIn: 'root'});
export class AuthService{
    constructor( private http:HttpClient){}
    signup(email:string , password:string ){
       this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbg21E7AxSymXOccbQtnNjoVdIwYw9gnw',{
        email:email,
        password: password,
        returnSecureToken:true
       })
    }
}