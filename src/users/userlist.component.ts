import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStoreService, AppStore } from '../app/app.store';
import { User } from './service/user.service';


@Component({
  moduleId: module.id,
  selector: 'user-list',
  template: `
  <ul>
    <li *ngFor="let user of users">
      <a href="javascript:void(0);" (click)="selectUser(user)">
        {{ user.name }}
      </a>
      <button (click)="deleteUser(user)">Delete</button>
    </li>
  </ul>
  `
})
export class UserListComponent implements OnInit {
  @Input() users: User[];

  constructor(private appStore: AppStoreService, store: Store<AppStore>) { }

  ngOnInit() { }

  selectUser(user: User) {
    this.appStore.users.select(user);
  }

  deleteUser(user: User) {
    this.appStore.users.remove(user);
  }

}
