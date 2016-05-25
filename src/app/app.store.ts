import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';

import {
  UserService,
  User,
  users,
  selectedUser
} from '../users/service/user.service';
import {
  Item,
  items,
  selectedItem,
  ItemService
} from '../items/service/item.service';
import { UtilsService } from '../services/utils.service';


export const appStore = {
  users: users,
  selectedUser: selectedUser,
  items: items,
  selectedItem: selectedItem
};

export interface AppStore {
  users: User[];
  selectedUser: User;
  items: Item[];
  selectedItem: Item;
}

@Injectable()
export class AppStoreService {
  users: UserService;
  items: ItemService;

  constructor(
    private http: Http,
    private store: Store<AppStore>,
    private utils: UtilsService
  ) {
    this.users = new UserService(this.http, this.store, this.utils);
    this.items = new ItemService(this.http, this.store);
  }
}
