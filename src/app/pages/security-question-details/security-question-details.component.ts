import { Component, OnInit } from '@angular/core';
import { SecurityQuestion } from 'src/app/shared/security-question.interface';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute , Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SecurityQuestionService } from './../../shared/security-question.service';

@Component({
  selector: 'app-security-question-details',
  templateUrl: './security-question-details.component.html',
  styleUrls: ['./security-question-details.component.css']
})
export class SecurityQuestionDetailsComponent implements OnInit {
  question: SecurityQuestion;
  questionId: string;
  form: FormGroup;


  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router, private SecurityQuestionService: SecurityQuestionService) {
      this.questionId = this.route.snapshot.paramMap.get('questionId');

      this.SecurityQuestionService.findSecurityQuestionById(this.questionId).subscribe(res => {
         this.question = res['data'];
      }, err => {
          console.log(err);
      }, () => {
          this.form.controls.text.setValue(this.question.text);
      })
  }

  ngOnInit(): void {
      this.form = this.fb.group({
        text: [null, Validators.compose([Validators.required])],
      });
  }

  saveQuestion() {
      const updatedSecurityQuestion = {} as SecurityQuestion;
      updatedSecurityQuestion.text = this.form.controls.text.value;

      this.SecurityQuestionService.updateSecurityQuestion(this.questionId, updatedSecurityQuestion).subscribe(res => {
          this.router.navigate(['/security-questions'])
      })
  }

  cancel() {
      this.router.navigate(['/security-questions']);
  }

}
