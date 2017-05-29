import {
  Component,
  OnInit
}                       from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
}                       from '@angular/forms';
import {
  moveIn,
  fallIn
}                       from '../../shared/animations';
import { AuthSandbox }  from '../auth.sandbox';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class RegisterComponent {
  public submitted:       boolean = false;
  public email:           AbstractControl;
  public password:        AbstractControl;
  public confirmPassword: AbstractControl;
  public registerForm:    FormGroup;
  private validators;

  constructor(
    private fb: FormBuilder,
    public authSandbox: AuthSandbox
  ) {
    this.validators = authSandbox.validationService;
  }

  ngOnInit() {
    this.initRegisterForm();
  }

  /**
   * Builds a form instance (using FormBuilder) with corresponding validation rules 
   */
  public initRegisterForm(): void {
    this.registerForm = this.fb.group(
      {
        email:            ['', [Validators.required, this.validators.validateEmail]],
        password:         ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword:  ['', [Validators.required, Validators.minLength(6)]]
      },
      { validator: this.validators.matchingPasswords('password', 'confirmPassword') }
    );

    this.email            = this.registerForm.controls['email'];
    this.password         = this.registerForm.controls['password'];
    this.confirmPassword  = this.registerForm.controls['confirmPassword'];
  }

  /**
   * Handles form 'submit' event. Calls sandbox register function if form is valid.
   *
   * @param event
   * @param form
   */
  public onSubmit(event: Event, form: any): void {
    event.stopPropagation();
    this.submitted = true;
    
    if (this.registerForm.valid) this.authSandbox.register(form);
  }
}