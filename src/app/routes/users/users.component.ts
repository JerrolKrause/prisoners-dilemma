import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';
import { Models, ApiService, AppStorageService } from '$shared';

interface UserForm {
  address: FormControl<any>;
  company: FormControl<any>;
  email: FormControl<string>;
  id: FormControl<number>;
  name: FormControl<string>;
  phone: FormControl<string>;
  username: FormControl<string>;
  website: FormControl<string>;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit, OnDestroy {
  public user = this.appStorage.user;

  public token = this.appStorage.token;
  public token$ = this.appStorage.token$;

  public users = this.api.users;

  /** Form used to create/edit user */
  public userForm = this.fb.group<UserForm>({
    address: new FormControl(),
    company: new FormControl(),
    email: new FormControl(),
    id: new FormControl(),
    name: new FormControl(),
    phone: new FormControl(),
    username: new FormControl(),
    website: new FormControl(),
  });

  /** Create or edit a user */
  public isEdit = false;

  constructor(private api: ApiService, private fb: NonNullableFormBuilder, private appStorage: AppStorageService) {}

  ngOnInit() {}

  /**
   * Save a new user or update existing
   */
  public save() {
    // Get the user out of the form
    const user = this.userForm.getRawValue() as Models.User;
    // Determine if this is a create (POST) or an update (PUT)
    const apiCall = this.isEdit ? this.api.users.put(user) : this.api.users.post(user);
    // Perform api call
    apiCall.subscribe(() => {
      // Reset form and set edit to false
      this.userForm.reset();
      this.isEdit = false;
    });
  }

  /**
   * Edit existing user
   * @param u
   */
  public edit(u: Models.User) {
    this.userForm.patchValue(u);
    this.isEdit = true;
  }

  /**
   * Cancel edit mode
   */
  public editUndo() {
    this.userForm.reset();
    this.isEdit = false;
  }

  /**
   * Delete existing user
   * @param u
   */
  public delete(u: Models.User) {
    // Confirm before deleting
    const c = confirm(`Are you sure you want to delete ${u.name}?`);
    if (c) {
      this.api.users.delete(u).subscribe();
    }
  }

  /**
   * Refresh data in store
   */
  public refresh() {
    this.api.users.refresh().subscribe();
  }

  ngOnDestroy() {}

  public update(name: string) {
    this.appStorage.token = name;
  }
}
