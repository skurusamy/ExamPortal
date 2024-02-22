import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})

export class RegisterService{
    constructor(){}
    register(fname:string,lname:string,email:string){
        if(fname !=null && lname !=null && email!=null){
            localStorage.setItem('fname',fname);
            localStorage.setItem('lname',lname);
            localStorage.setItem('email',email);
            return true;
        }
        else{
            return false;
        }
    }
}