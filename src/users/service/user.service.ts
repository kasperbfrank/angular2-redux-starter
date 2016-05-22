import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { _userEvents, _users, _selectedUser  } from './user.reducers';
import { UtilsService } from '../../services/utils.service';


export interface User {
  id: string;
  name: string;
  email: string;
}

export const userEvents = _userEvents;
export const users = _users;
export const selectedUser = _selectedUser;

@Injectable()
export class UserService {
  users$: Observable<User[]>;
  selectedUser$: Observable<User>;

  constructor(private http: Http, private store: any, private utils: UtilsService) {
    this.users$ = this.store.select(res => res.users);
    this.selectedUser$ = this.store.select(res => res.selectedUser);
  }

  fetch() {
    return this.http.get('src/users/service/users.json')
      .map(res => { return res.json(); })
      .map(payload => ({ type: userEvents.ADD, payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  select(payload?: User) {
    this.store.dispatch({ type: userEvents.SELECT, payload: payload || null });
  }

  remove(payload: User) {
    this.store.dispatch({ type: userEvents.REMOVE, payload: payload });
  }

  save(payload: User) {
    (!payload.id) ? this.add(payload) : this.update(payload);
  }

  private add(payload: User) {
    payload.id = this.utils.createUUID();
    this.store.dispatch({ type: userEvents.CREATE, payload: payload });
  }

  private update(payload: User) {
    this.store.dispatch({ type: userEvents.UPDATE, payload: payload });
  }

}
