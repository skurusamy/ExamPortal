import { LiteralMap } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguageGuard } from './guard/language.guard';
import { RegisterGuard } from './guard/register.guard';
import { HomeComponent } from './home/home.component';
import { LanguageComponent } from './language/language.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  {path: '',component:HomeComponent},
  {path:'app/home',component:HomeComponent},
  {path:'app/language/:fname/:lname',component:LanguageComponent,canActivate:[RegisterGuard]},
  {path:'app/quiz/:quizname/:name',component:QuizComponent,canActivate:[LanguageGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
