import { Component } from '@angular/core';
import { isBrowser } from '$shared';

@Component({
  selector: 'app-masterpage',
  templateUrl: './masterpage.component.html',
})
export class MasterpageComponent {
  public isBrowser = isBrowser;

  constructor() {}
}
