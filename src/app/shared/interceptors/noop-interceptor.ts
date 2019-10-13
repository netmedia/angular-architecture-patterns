import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


/**
 * // https://angular.io/guide/http#advanced-usage
 * Here is a do-nothing noop interceptor that simply passes the request through without touching it
 */
/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      console.log('Interceptor =>NoopInterceptor', );
      return next.handle(req);
  }
}
