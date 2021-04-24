/*
; ==============================
; Title: app-routing.module.ts
; Author: Professor Krasso
; Date: 18 April 2021
; Modified By: Brooklyn Hairston, Dan Ross
; Description: App routing module
; ==============================
*/

import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SecurityQuestion } from './shared/security-question.interface';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserListComponent } from './pages/user-list/user-list.component';

import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AuthGuard } from './shared/auth.guard';
import { SecurityQuestionDetailsComponent } from "./pages/security-question-details/security-question-details.component";
import { ErrorComponent } from './pages/error/error.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { VerifySecurityQuestionsFormComponent } from './pages/verify-security-questions-form/verify-security-questions-form.component';



//These are routes which will load the corresponding component based on the URL path.
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path: 'users/:userId',
        component: UserDetailsComponent
      },
      {
        path: 'users/create/new',
        component: UserCreateComponent
      },
      {
        path: 'security-questions',
        component: SecurityQuestionListComponent
      },
      {
        path: 'security-questions/:questionId',
        component: SecurityQuestionDetailsComponent
      },
      {
        path: 'security-questions/create/new',
        component: SecurityQuestionCreateComponent
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'verify-security-questions',
        component: VerifySecurityQuestionsFormComponent
      },
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      {
        path: 'error',
        component: ErrorComponent
      }
    ]
  },
  {
    //If an invalid URL is entered, this will redirect them to the not-found component.
    path: '**',
    redirectTo: 'session/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
