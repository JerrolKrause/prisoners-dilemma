import { AuthService, AuthState } from '$shared';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomService } from '@ntersol/services';

interface LoginForm {
  userName: FormControl<string>;
  password: FormControl<string>;
  remember: FormControl<boolean>;
}
// Localstorage key to store username
const savedUserName = 'savedUserName';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  public formMain = this.fb.group<LoginForm>({
    userName: new FormControl('juser', { validators: Validators.required, nonNullable: true }),
    password: new FormControl('password', { validators: Validators.required, nonNullable: true }),
    remember: new FormControl(false, { nonNullable: true }),
  });

  public state = signal({
    waiting: false,
    error: null,
    showErrorDetails: false,
    loggedout: false,
    showPassword: true,
  });

  public authState$ = this.authService.authState$;
  public authStateType = AuthState;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: NonNullableFormBuilder,
    private dom: DomService,
  ) {}

  public ngOnInit() {
    // Is there a saved username
    const remember = this.dom.localStorage?.getItem(savedUserName);
    // If so update the login form
    if (!!remember) {
      this.formMain.patchValue({
        userName: remember,
        remember: true,
      });
    }
    this.authService.logOutModal = null; // Get rid of logout modal if it persists
  }

  /**
   * Submit the form
   */
  public onLogin() {
    this.state.update(state => ({ ...state, waiting: true, error: null, showErrorDetails: false }));

    // If remember username is set, save to localstorage
    if (this.formMain && this.formMain.value.remember) {
      this.dom.localStorage?.setItem(savedUserName, this.formMain.value.userName || '');
    } else {
      this.dom.localStorage?.removeItem(savedUserName);
    }

    // Authenticate
    this.authService.logIn(this.formMain.value).subscribe(
      () => {
        // get return url from route parameters or default to '/'
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);

        this.state.update(state => ({ ...state, waiting: false }));
      },
      error => {
        error.errorMsg = 'Error logging in.';
        if ((error.statusText = 'Unauthorized')) {
          error.errorMsg = 'Invalid username or password, please try again.';
          this.state.update(state => ({ ...state, showErrorDetails: false }));
        }
        this.state.update(state => ({ ...state, error: error, waiting: false }));
      },
    );
  } // end onSubmit

  ngOnDestroy() {}
}
