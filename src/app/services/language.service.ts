import { LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})

export class LanguageService{
    constructor(
        private locationStrategy: LocationStrategy
    ){}
    FindQuiz(quizname:string){
        if(quizname !=null ){
            localStorage.setItem('quizname',quizname);
            return true;
        }
        else{
            return false;
        }
    }
    preventBackButton() {
        history.pushState(null, null, location.href);
        this.locationStrategy.onPopState(() => {
          history.pushState(null, null, location.href);
        })
      }
}