import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';
import { Location } from '@angular/common';

import { HomeComponent } from '../home/home.component';
import { UsersComponent } from '../users/users.component';

@Routes([
  { path: '/', component: HomeComponent },
  { path: '/users', component: UsersComponent }
])
@Component({
  moduleId: module.id,
  selector: 'app',
  template: `
  <a [routerLink]="['/']">Home</a>
  <a [routerLink]="['/users']">Users</a>
  <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
    this.location.go('/');
  }

}
