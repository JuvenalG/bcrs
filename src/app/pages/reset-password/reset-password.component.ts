/*
; ==============================
; Title: reset-password.component.ts
; Author: Professor Krasso
; Date: 24 April 2021
; Modified By: Brooklyn Hairston
; Description: Reset Password
; ==============================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityQuestion } from 'src/app/shared/security-question.interface';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  selectedSecurityQuestions: any;
  form: FormGroup;
  verifyUsername: FormGroup;
  securityQuestions: FormGroup;
  newPassword: FormGroup;
  errorMessage: string;
  question1: string;
  question2: string;
  question3: string;
  username: string;
  isAuthenticated: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private fb: FormBuilder, private cookieService: CookieService) {

   }

  ngOnInit() {

    this.verifyUsername = this.fb.group({
      username: [null, Validators.compose([Validators.required])]
    });
    this.securityQuestions = this.fb.group({
      answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
        answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
        answerToSecurityQuestion3: [null, Validators.compose([Validators.required])]
    });
    this.newPassword = this.fb.group({
      password: [null, Validators.compose([Validators.required])]
    });
  }




  validateUsername() {

    const username = this.verifyUsername.controls['username'].value;

    this.http.get('/api/session/verify/users/' + username).subscribe(res => {
      if (res) {
        this.router.navigate(['/session/verify-security-questions'], {queryParams: {username: username}});
      }
    }, err => {
      console.log(err);
    });
  }

  verifySecurityQuestions() {
    this.username = this.route.snapshot.queryParamMap.get('username');
    console.log(this.username)
    const answerToSecurityQuestion1 = this.securityQuestions.controls['answerToSecurityQuestion1'].value;
    const answerToSecurityQuestion2 = this.securityQuestions.controls['answerToSecurityQuestion2'].value;
    const answerToSecurityQuestion3 = this.securityQuestions.controls['answerToSecurityQuestion3'].value;

    console.log(answerToSecurityQuestion1);
    console.log(answerToSecurityQuestion2);
    console.log(answerToSecurityQuestion3);

    this.http.post('/api/session/verify/users/' + this.username + '/security-questions', {
      questionText1: this.question1,
      questionText2: this.question2,
      questionText3: this.question3,
      answerText1: answerToSecurityQuestion1,
      answerText2: answerToSecurityQuestion2,
      answerText3: answerToSecurityQuestion3
    }).subscribe(res => {
      console.log(res);
      if (res['message'] === 'success') {
        this.router.navigate(['/session/reset-password'], {queryParams: {isAuthenticated: true, username: this.username}})
      } else {
        console.log('Unable to verify security question answers');
      }
    });
  }
  resetPassword() {
    this.isAuthenticated = this.route.snapshot.queryParamMap.get('isAuthenticated');
    this.username = this.route.snapshot.queryParamMap.get('username');

   this.http.post('/api/session/users' + this.username + '/reset-password', {
     password: this.newPassword.controls['password'].value
   }).subscribe(res => {
     this.cookieService.set('sessionuser', this.username, 1);
     this.router.navigate(['/']);
   }, err => {
     console.log(err);
   });
 }
}

