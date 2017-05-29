export class RegisterForm {
  public email:           string;
  public password:        string;
  public confirmPassword: string;

  constructor(registerForm: any) {
    this.email            = registerForm.email    || '';
    this.password         = registerForm.password || '';
    this.confirmPassword  = registerForm.confirmPassword || '';
  }
}