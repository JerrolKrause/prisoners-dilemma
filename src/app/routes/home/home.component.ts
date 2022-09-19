import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AppStorageService } from '$shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}
}
