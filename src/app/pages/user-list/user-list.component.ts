/*
; ==============================
; Title: user-list.component.ts
; Author: Professor Krasso
; Date: 18 April 2021
; Modified By: Brooklyn Hairston
; Description: User list component
; ==============================
*/

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import { UserService } from './../../shared/user.service';
import { User } from './../../shared/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  displayedColumn = ['userName', 'lastName', 'phoneNumber', 'address', 'email', 'functions'];


  /**
   *
   * @param http
   * @param dialog
   * @param userService
   */
  constructor(private http: HttpClient, private dialog: MatDialog, private userService: UserService) {

    this.userService.findAllUsers().subscribe(res => {
      this.users = res['data'];
      console.log(this.users);
    }, err => {
      console.log(err);
    });
   }

  ngOnInit(): void {
  }

}
