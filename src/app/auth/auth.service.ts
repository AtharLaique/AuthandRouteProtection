//This service is Responcible for user signup and signin and token managment
import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';

Injectable ({providedIn: 'root'});
export class AuthService{
    constructor( private http:HttpClient){}
    signup(){
    
    }
}