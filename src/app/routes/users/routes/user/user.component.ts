import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { mergeMap } from 'rxjs';
import { Models } from '../../../../shared/models';
import { ApiService } from '../../shared/stores/api-store.service';

@UntilDestroy()
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit, OnDestroy {
  public user$ = this.route.params.pipe(
    untilDestroyed(this),
    mergeMap(params => this.api.http.get<Models.User>('https://jsonplaceholder.typicode.com/users/' + params['userId'])),
  );

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
