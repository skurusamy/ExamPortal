import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Option,Question, Quiz, QuizConfig } from '../models';
import { LanguageService } from '../services/language.service';
import { QuizService } from '../services/quiz.service';



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService,LanguageService]
})
export class QuizComponent implements OnInit {
  
  result:string;
  name:string;
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  score:number=0;
  quizName: string ; //initialized to java script
  //quizName: string = "data/angular.json";
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 600,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };
  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  time:any = null;
  //startTime: Date;
  //endTime: Date;
  //ellapsedTime = '00:00';
  duration = '';
  countdownTimer;
  

  constructor(private quizService: QuizService,
    private router:Router,
    private languageService: LanguageService,
    private ac:ActivatedRoute,) { }
  ngOnInit(): void {
   
    this.quizName = this.ac.snapshot.params['quizname'];
    this.name = this.ac.snapshot.params['name'];
    
    console.log("In quiz ts",this.name)
    this.loadQuiz(this.quizName);
    this.languageService.preventBackButton();
    
  }
  loadQuiz(quizName: string) {
    this.quizService.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
      this.time="10 : 00";
      this.timer = this.countdown();
    });
    this.mode = 'quiz';
  }
  
  countdown(){
    let timer1 = this.config.duration, minutes, seconds;
    this.countdownTimer=setInterval(()=>{
    minutes = Math.floor(timer1 / 60);
    seconds = Math.round(timer1 % 60);
    minutes = (minutes < 10 ? '0' : '')+minutes;
    seconds = (seconds < 10 ? '0' : '')+seconds;
    this.time = minutes+" : "+seconds;
    //console.log(this.time,timer1);
    if (--timer1 < 0) {
      this.timeUp();
    }
  },1000)
  }


  timeUp(){
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered })
    );
    this.quiz.questions.forEach(x => {
      if(x.options.every(y => y.selected === y.isAnswer))
          this.score++;
    });
    this.mode = 'result';
  }
  onSubmit() {
    if (confirm('Are you sure you want to Submit the exam?')) {
      let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered })
    );
    this.quiz.questions.forEach(x => {
      if(x.options.every(y => y.selected === y.isAnswer))
          this.score++;
    });
    this.mode = 'result';
    } else {
      // Do nothing!
      console.log('Not Confirmed');
    }
    
    
  }
  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }
  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }
  goTo(index: number) {
    console.log(index);
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }

  }
  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    if(question.options.every(x => x.selected === x.isAnswer)){
     // console.log("iscorrect",question)
     //this.score +=1;
     this.result='correct';
    }
    else{
      this.result='wrong';
    } 
    return this.result;
  };
  endTest(){
    if (confirm('Are you sure you want to end your exam?')) {
      console.log("in ok")
      this.timeUp();
    } else {
      console.log("Test on progress");
    }
  }
}
