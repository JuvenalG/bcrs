/*
; ==============================
; Title: role.service.ts
; Author: Professor Krasso
; Date: 30 April 2021
; Modified By: Brooklyn Hairston
; Description: Role service
; ==============================
*/

//import statements
import { Injectable } from '@angular/core';
import { Role } from './role.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  /**
   *
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * findAllRoles
   * @returns All Roles
   */
  findAllRoles(): Observable<any> {
    return this.http.get('/api.roles');
  }

  /**
   * updateRoles
   * @param roleId
   * @param role
   * @returns An updated Role
   */
  updateRoles(roleId: string, role: Role): Observable<any> {
    return this.http.put('/api/roles/' + roleId, {
      text: role.text
    })
  }

 /**
  *
  * @param role
  * @returns new role
  */
  createRole(role: Role): Observable<any> {
    return this.http.post('/api/roles', {
      text: role.text
    })
  }


}
