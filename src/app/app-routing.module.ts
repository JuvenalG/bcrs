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

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'security-question/create/new',
        component: SecurityQuestionCreateComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
