export class User {

  public email:      string;
  public isLoggedIn: boolean;

  constructor(user?: any) {
    this.email      = user ? user.email : '';
    this.isLoggedIn = this.email ? true : false;
  }

  /**
   * Saves user into local storage
   *
   * @param user
   */
  public save(): void {
    localStorage.setItem('currentUser', JSON.stringify(this));
  }

  /**
   * Saves user into local storage
   */
  public remove(): void {
    localStorage.setItem('currentUser', null);
  }
}