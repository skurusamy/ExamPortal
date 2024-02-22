import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormControlName, FormGroup, NgForm, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import {  RegisterService } from '../services/register.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerForm:FormGroup;
  fname:FormControl;
  lname:FormControl;
  email:FormControl;
 isRegistered:boolean=false;
  createFormControl(){
    console.log("in control")
    this.fname = new FormControl('',[Validators.required,
                                    Validators.minLength(2),
                                    Validators.pattern('^[a-zA-Z \-\']+')]) 
    this.lname = new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z \-\']+')])
    this.email = new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')])
  }
  createForm(){
    this.registerForm = new FormGroup({
      fname:this.fname,
      lname:this.lname,
      email:this.email
    })
  }
  constructor(
    private router:Router,
    private registerService:RegisterService,
  ) { }

  ngOnInit(): void {
    this.createFormControl();
    this.createForm();
  }
  register(){
    //console.log("Register clicked")
    var f_name=this.registerForm.get('fname').value;
    var l_name=this.registerForm.get('lname').value;
    var r_email = this.registerForm.get('email').value
    this.isRegistered = this.registerService.register(f_name,l_name,r_email);
    if(this.isRegistered == true){
      this.router.navigate(['app/language',f_name,l_name]);

      console.log(this.isRegistered)
    }
    else{
      this.router.navigate(['app/home']);
    }

  }

}
