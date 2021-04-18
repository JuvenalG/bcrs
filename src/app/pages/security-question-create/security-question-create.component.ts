/*
; ==============================
; Title: security-question-create.component.ts
; Author: Professor Krasso
; Date: 18 April 2021
; Modified By: Brooklyn Hairston
; Description: Create Security Question
; ==============================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityQuestionService } from  './../../shared/security-question.service';
import { SecurityQuestion } from './../../shared/security-question.interface';

@Component({
  selector: 'app-security-question-create',
  templateUrl: './security-question-create.component.html',
  styleUrls: ['./security-question-create.component.css']
})
export class SecurityQuestionCreateComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private securityQuestionService: SecurityQuestionService) {

   }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  create() {
    const newSecurityQuestion = {} as SecurityQuestion;
    newSecurityQuestion.text = this.form.controls.text.value;

    this.securityQuestionService.createSecurityQuestion(newSecurityQuestion).subscribe(res => {
      this.router.navigate(['/security-questions']);
    }, err => {
      console.log(err);
    })
  }

  cancel() {
    this.router.navigate(['/security-questions']);
  }

}
