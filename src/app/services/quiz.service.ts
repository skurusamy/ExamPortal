
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class QuizService {

  constructor(private http: HttpClient) { }
 
  get(url: string) {
    console.log("In service ",url);
   return this.http.get(url);
   //return this.http.get("data/angular.json")
  }
  getAll() {
    return [
      { id: 'data/javascript.json', name: 'JavaScript' },
      { id: 'data/aspnet.json', name: 'Asp.Net' },
      { id: 'data/csharp.json', name: 'C Sharp' },
      { id: 'data/designPatterns.json', name: 'Design Patterns' },
      { id: 'data/angular.json', name: 'Angular' }
    ];
  }

}
