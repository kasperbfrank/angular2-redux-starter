import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';

import {
  UserService,
  User,
  users,
  selectedUser
} from '../users/service/user.service';
import { UtilsService } from '../services/utils.service';


export const appStore = {
  users: users,
  selectedUser: selectedUser,
};

export interface AppStore {
  users: User[];
  selectedUser: User;
}

@Injectable()
export class AppStoreService {
  users: UserService;

  constructor(
    private http: Http,
    private store: Store<AppStore>,
    private utils: UtilsService
  ) {
    this.users = new UserService(this.http, this.store, this.utils);
  }
}
