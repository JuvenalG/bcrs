/*
; ==============================
; Title: security-question.service.ts
; Author: Professor Krasso
; Date: 18 April 2021
; Modified By: Brooklyn Hairston
; Description: Security Question service
; ==============================
*/

//import statements
import { Injectable } from '@angular/core';
import { SecurityQuestion } from './security-question.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityQuestionService {

  constructor(private http: HttpClient) { }

/**
 *
 * @param newSecurityQuestion
 * @description A http post request with the URL path as the parameter
 * @returns an observable of type any
 */
  createSecurityQuestion(newSecurityQuestion: SecurityQuestion): Observable<any> {
    return this.http.post('api/security-questions', {
      text: newSecurityQuestion.text
    })
  }

  /**
   * @param questionId
   * @returns an observable of type any
   * @description A http delete request with the URL path as the parameter
   */
  deleteSecurityQuestion(questionId: string): Observable<any> {
    return this.http.delete('/api/security-questions/' + questionId);
  }
}
