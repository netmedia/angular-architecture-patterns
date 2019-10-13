import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  private message: any;

  getAuthorizationToken() {
    return this.message;
  }

}
