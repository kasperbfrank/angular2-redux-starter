import { Injectable } from '@angular/core';
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

@Injectable()
export class ItemService {
  items$: Observable<Item[]>;
  selectedItem$: Observable<Item>;

  constructor(private store: Store<AppStore>) {
    this.items$ = this.store.select(res => res.items);
    this.selectedItem$ = this.store.select(res => res.selectedItem);
  }

  loadItems() {
    let initialItems: Item[] = [
      {
        id: '0',
        title: 'test1',
        description: 'this is the description for test item 1'
      },
      {
        id: '1',
        title: 'test2',
        description: 'this is the description for test item 2'
      }
    ];
    this.store.dispatch({type: itemEvents.ADD, payload: initialItems});
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
