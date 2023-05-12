import { environment } from '$env';
import { Component, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public isOpen = signal(false);
  public appName = environment.properties.appName;

  constructor(private router: Router) {
    // On route change, close nav window
    this.router.events.pipe(takeUntilDestroyed()).subscribe(() => this.isOpen.set(false));
  }

  public ngOnInit() {}
}
