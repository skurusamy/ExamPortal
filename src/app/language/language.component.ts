import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css'],
  providers:[QuizService,LanguageService]
})
export class LanguageComponent implements OnInit {
  fname:any;
  lname:any;
  quizes: any[];
  quizName:string
  termsForm:FormGroup
  lang:FormControl;
  terms:FormControl
  isAccepted: boolean=false;
  LanguageService: any;
  createFormControl(){
    this.lang = new FormControl('Select One',Validators.required)
    this.terms = new FormControl('true',Validators.required)
  }
  createForm(){
    this.termsForm = new FormGroup({
      lang : this.lang,
      terms : this.terms
    })
  }
  constructor(
    private router:Router,
    private ac:ActivatedRoute,
    private quizService:QuizService,
    private languageService:LanguageService
  ) { }
  ngOnInit(): void {
    this.languageService.preventBackButton();
    this.fname = this.ac.snapshot.params['fname'];
    this.lname = this.ac.snapshot.params['lname'];
    this.quizes = this.quizService.getAll();// to load in dropdown
   // this.quizName = this.quizes[0].id;// to get id
    this.createFormControl();
    this.createForm();
    
  }
 startTest(){
   console.log(this.lang.value);
   var fullname= this.fname+" "+this.lname;
    var quizname = this.lang.value
    this.isAccepted = this.languageService.FindQuiz(quizname);
    if(this.isAccepted == true){
      this.router.navigate(['app/quiz',quizname,fullname]);
      console.log(this.isAccepted)
    }
    else{
      this.router.navigate(['app/home']);
    }

  }
 }
