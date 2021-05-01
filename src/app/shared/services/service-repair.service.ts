/*
; ==============================
; Title: service-repair.service.ts
; Author: Professor Krasso
; Date: 1 May 2021
; Modified By: Dan Ross
; Description: service repair service
; ==============================
*/
import { ServiceRepairItem } from './../interfaces/service-repair-item.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceRepairService {
  ServiceRepairItems: ServiceRepairItem[];

/**
 * List of our service repair items. These will populate the user interface.
 */
  constructor() {
    this.ServiceRepairItems = [
      {
        id: '101',
        title: 'Password Reset',
        price: 39.99

      },
      {
        id: '102',
        title: 'Spyware Removal',
        price: 99.9

      },
      {
        id: '103',
        title: 'RAM Upgrade',
        price: 129.99

      },
      {
        id: '104',
        title: 'Software Installation',
        price: 49.99

      },
      {
        id: '105',
        title: 'PC Tune-Up',
        price: 89.99

      },
      {
        id: '106',
        title: 'Keyboard Cleaning',
        price: 45.00

      },
      {
        id: '107',
        title: 'Disk Clean-up',
        price: 149.99

      }
    ]
   }
   /**
    *
    * @returns Service Repair interface
    */
   getServiceRepairItems(): ServiceRepairItem[] {
     return this.ServiceRepairItems;
   }
}
