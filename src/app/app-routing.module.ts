/*
; ==============================
; Title: app-routing.module.ts
; Author: Professor Krasso
; Date: 18 April 2021
; Modified By: Brooklyn Hairston
; Description: App routing module
; ==============================
*/

import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AuthGuard } from './shared/auth.guard';

//These are routes which will load the corresponding component based on the URL path.
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
         //Apply a guard to our Home Component so users that are not logged in cannot access.
        canActivate: [AuthGuard]
      },
      {
        path: 'security-question/create/new',
        component: SecurityQuestionCreateComponent
      },

    ]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path:"sign-in",
        component: SignInComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
