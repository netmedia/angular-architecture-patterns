import { Injectable } from '@angular/core';

import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

import { of } from 'rxjs';

import { sendRequest } from 'selenium-webdriver/http';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCache) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // // continue if not cachable.
    // if (!isCachable(req)) { return next.handle(req); }

    // const cachedResponse = this.cache.get(req);
    // return cachedResponse ?
    //   of(cachedResponse) : sendRequest(req, next, this.cache);

      return next.handle(req);
  }
}
