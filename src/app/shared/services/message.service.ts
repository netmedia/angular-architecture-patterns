import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  private message: any;

  setMessage(message: any) {
    return this.message;
  }
  getMessage(message: any) {
    return this.message;
  }
}
