import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/common';
import { Store } from '@ngrx/store';

import { AppStoreService, AppStore } from '../app/app.store';
import { User } from './service/user.service';


@Component({
  moduleId: module.id,
  selector: 'user-form',
  template: `
  <form *ngIf="model" (ngSubmit)="onSubmit()">
    <input type="text" class="form-control" placeholder="Type in name..."
      [(ngModel)]="model.name" ngControl="name" required />

    <br>
    <input type="email" class="form-control" placeholder="Type in email..."
      [(ngModel)]="model.email" ngControle="email" required />

    <br><br>
    <button type="submit">Save</button>
    <button type="button" (click)="resetModel()">Cancel</button>
  </form>
  `,
  directives: [NgForm]
})
export class UserFormComponent {
  @Input() user: User;

  model: User;
  submitted: boolean;

  constructor(private appStore: AppStoreService, private store: Store<AppStore>) {
    this.model = null;
    this.submitted = false;
  }

  ngOnChanges(changes: any) {
    let values = changes.user.currentValue;
    this.setModel(values);
  }

  setModel(model?: any) {
    let newModel = !model || model.length === 0;

    this.model = {
      id: newModel ? undefined : model.id,
      name: newModel ? undefined : model.name,
      email: newModel ? undefined : model.email
    };
  }

  onSubmit() {
    this.appStore.users.save(this.model);
    this.submitted = true;
    this.resetModel();
  }

  resetModel() {
    this.appStore.users.select(null);
    this.setModel(null);
  }

}
