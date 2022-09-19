import { Component } from '@angular/core';

@Component({
  selector: 'app-no-content',
  template: `
    <app-masterpage>
      <div class="container mt-3">
        <h1>404: page missing</h1>
        <p><a routerLink="/">Click here to go to the homepage.</a></p>
      </div>
    </app-masterpage>
  `,
})
export class NoContentComponent {}
