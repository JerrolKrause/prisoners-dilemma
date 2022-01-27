import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-route',
  templateUrl: './_route.component.html',
  styleUrls: ['./_route.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteComponent implements OnInit, OnDestroy {

  constructor(
  ) { }

  ngOnInit() { }

  ngOnDestroy() { }
}
