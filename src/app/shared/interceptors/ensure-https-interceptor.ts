import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


/**
 * // https://angular.io/guide/http#advanced-usage
 * Here is a do-nothing noop interceptor that simply passes the request through without touching it
 */
/** Pass untouched request through to the next request handler. */
@Injectable()
export class EnsureHttpsInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    /**
     * // Typescript disallows the following assignment because req.url is readonly
     * req.url = req.url.replace('http://', 'https://');
     */
    // clone request and replace 'http://' with 'https://' at the same time

    // This will replace full URL with https
    const secureReq = req.clone({
      url: req.url.replace('http://', 'https://')
    });
    // console.log('Interceptor =>EnsureHttpsInterceptor',secureReq );
    // send the cloned, "secure" request to the next handler.
    return next.handle(secureReq);

    //     // copy the body and trim whitespace from the name property
    //     const newBody = { ...body, name: body.name.trim() };
    // // clone request and set its body
    //     const newReq = req.clone({ body: newBody });
    // // send the cloned request to the next handler.
    //     return next.handle(newReq);
    // newReq = req.clone({ ... }); // body not mentioned => preserve original body
    // newReq = req.clone({ body: undefined }); // preserve original body
    // newReq = req.clone({ body: null }); // clear the body

  }
}



