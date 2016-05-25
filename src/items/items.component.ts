import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/rx';

import { AppStoreService } from '../app/app.store';
import { Item } from './service/item.service';
import { UtilsService } from '../services/utils.service';


@Component({
  moduleId: module.id,
  selector: 'items',
  template: `
    <h3>Items</h3>
    <ul>
      <li *ngFor="let item of items$ | async" (click)="selectItem(item)">{{item.title}}
        <button (click)="deleteItem(item); $event.stopPropagation();">delete</button>
      </li>
    </ul>
    <h4>Make a new item..</h4>
    <form>
      <div>
        <label>Item title</label>
        <input [(ngModel)]="newItem.title" placeholder="Enter a title" type="text">
      </div>
      <div>
        <label>Item Description</label>
        <input [(ngModel)]="newItem.description" placeholder="Enter a description" type="text">
      </div>
      <button type="submit" (click)="createItem(newItem)">Create</button>
    </form>
    <div *ngIf="selectedItem">
      <h4>You selected {{selectedItem.title}}</h4>
      {{selectedItem.description}}
      <h5>Update {{selectedItem.title}}</h5>
      <form>
        <div>
          <label>Item title</label>
          <input [(ngModel)]="selectedItem.title" placeholder="Enter a title" type="text">
        </div>
        <div>
          <label>Item description</label>
          <input [(ngModel)]="selectedItem.description" placeholder="Enter a description" type="text">
        </div>
        <button type="submit" (click)="updateItem(selectedItem)">Save</button>
      </form>
    </div>
  `
})
export class ItemsComponent implements OnInit {
  items$: Observable<Item[]>;
  selectedItem: Item;
  newItem: Item;

  constructor(private appStore: AppStoreService, private utils: UtilsService) {
    this.items$ = this.appStore.items.items$;
    this.appStore.items.selectedItem$
      .subscribe((res) => this.selectedItem = res);

    this.items$.subscribe(res => {
      console.log('items', res);
    });
  }

  ngOnInit() {
    this.appStore.items.loadItems();
    this.newItem = {
      id: '',
      title: '',
      description: ''
    };
  }

  selectItem(item: Item) {
    this.appStore.items.selectItem(item);
  }

  createItem(item: Item) {
    item.id = this.utils.createUUID();
    this.appStore.items.createItem(item);
    this.newItem = {
      id: '',
      title: '',
      description: ''
    };
  }

  updateItem(item: Item) {
    this.appStore.items.updateItem(item);
  }

  deleteItem(item: Item) {
    this.appStore.items.deleteItem(item);
  }
}
