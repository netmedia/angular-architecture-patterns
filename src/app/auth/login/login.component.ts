import {
  Component,
  ChangeDetectionStrategy
}                          from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
}                          from '@angular/forms';
import { moveIn }          from '../../shared/animations';
import { AuthSandbox }     from '../auth.sandbox';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  public submitted:  boolean = false;
  public email:      AbstractControl;
  public password:   AbstractControl;
  public loginForm:  FormGroup;

  constructor(
    private fb: FormBuilder,
    public authSandbox: AuthSandbox
  ) {}

  ngOnInit() {
    this.initLoginForm();
  }

  /**
   * Builds a form instance (using FormBuilder) with corresponding validation rules 
   */
  public initLoginForm(): void {
    this.loginForm = this.fb.group({
      email:      ['', [Validators.required, this.authSandbox.validationService.validateEmail]],
      password:   ['', Validators.required]
    });

    this.email     = this.loginForm.controls['email'];
    this.password  = this.loginForm.controls['password'];
  }

  /**
   * Handles form 'submit' event. Calls sandbox login function if form is valid.
   *
   * @param event
   * @param form
   */
  public onSubmit(event: Event, form: any): void {
    event.stopPropagation();
    this.submitted = true;

    if (this.loginForm.valid) this.authSandbox.login(form);
  }
}