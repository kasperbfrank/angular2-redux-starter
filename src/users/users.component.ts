import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStoreService, AppStore } from '../app/app.store';
import { UserListComponent } from './userlist.component';
import { UserFormComponent } from './userform.component';


@Component({
  moduleId: module.id,
  selector: 'users',
  template: `
  <h3>Users</h3>
  <user-list [users]="appStore.users.users$ | async"></user-list>
  <user-form [user]="appStore.users.selectedUser$ | async"></user-form>
  `,
  directives: [UserListComponent, UserFormComponent]
})
export class UsersComponent {

  constructor(private appStore: AppStoreService, private store: Store<AppStore>) {
    this.appStore.users.fetch();
  }

}
