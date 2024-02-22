import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './quiz/quiz.component';
import { RegisterGuard } from './guard/register.guard';
import { LanguageComponent } from './language/language.component';
import { QuizService } from './services/quiz.service';
import { HttpClientModule } from '@angular/common/http';
import { LanguageGuard } from './guard/language.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    QuizComponent,
    LanguageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

  ],

  providers: [
    RegisterGuard,
    LanguageGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
