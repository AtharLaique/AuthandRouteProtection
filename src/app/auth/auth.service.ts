//This service is Responcible for user signup and signin and token managment
import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';

interface AuthResponceData{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string
}

Injectable ({providedIn: 'root'});
export class AuthService{
    constructor( private http:HttpClient){}
    signup(email:string , password:string ){
        return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbg21E7AxSymXOccbQtnNjoVdIwYw9gnw',{
        email:email,
        password: password,
        returnSecureToken:true
       })
    }
}