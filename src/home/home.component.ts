import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'home',
  template: `
  <h3>Home</h3>
  <p>Welcome to the angular2 redux starter-kit.<br>
  I have included an example of a router setup using hashes.</p>
  <p>The user list is a CRUD example using a redux store.</p>
  `
})
export class HomeComponent {
  constructor() { }

}
