import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/rx';
import { Store } from '@ngrx/store';

import { AppStore } from '../../app/app.store';
import { _items, _selectedItem, _itemEvents } from './item.reducers';

export interface Item {
  id: string;
  title: string;
  description: string;
}

export const itemEvents = _itemEvents;
export const items = _items;
export const selectedItem = _selectedItem;

const BASE_URL = 'src/items/service/items.json';

@Injectable()
export class ItemService {
  items$: Observable<Item[]>;
  selectedItem$: Observable<Item>;

  constructor(private http: Http, private store: Store<AppStore>) {
    this.items$ = this.store.select(res => res.items);
    this.selectedItem$ = this.store.select(res => res.selectedItem);
  }

  loadItems() {
    this.http.get(BASE_URL)
      .map(res => res.json())
      .map(payload => ({ type: itemEvents.ADD, payload}))
      .subscribe(action => this.store.dispatch(action));
  }

  selectItem(item: Item) {
    this.store.dispatch({type: itemEvents.SELECT, payload: item});
  }

  createItem(item: Item) {
    this.store.dispatch({type: itemEvents.CREATE, payload: item});
  }

  updateItem(item: Item) {
    this.store.dispatch({type: itemEvents.UPDATE, payload: item});
  }

  deleteItem(item: Item) {
    this.store.dispatch({type: itemEvents.DELETE, payload: item});
  }
}
