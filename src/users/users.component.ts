import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { AppStoreService, AppStore } from '../app/app.store';
import { User } from './service/user.service';

import { UserListComponent } from './userlist.component';
import { UserFormComponent } from './userform.component';


@Component({
  moduleId: module.id,
  selector: 'users',
  template: `
  <h3>Users</h3>
  <user-list [users]="users$ | async"></user-list>
  <user-form [user]="user$ | async"></user-form>
  `,
  directives: [UserListComponent, UserFormComponent]
})
export class UsersComponent {
  users$: Observable<User[]>;
  user$: Observable<User>;

  constructor(private appStore: AppStoreService, private store: Store<AppStore>) {
    let users = this.appStore.users;

    this.users$ = users.users$;
    this.user$ = users.selectedUser$;

    users.fetch();
  }

}
