import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { createBody } from '../asyncServices/http/createBody';
import { createHeaders } from '../asyncServices/http/createHeaders';
import { createPath } from '../asyncServices/http/createPath';
import { createQuery } from '../asyncServices/http/createQuery';
import { HttpService } from './http.service';


export function methodBuilder(method) {
  return (url: string) => {
    return (target: HttpService, propertyKey: string, descriptor: any) => {

      const pPath = target[`${propertyKey}_Path_parameters`];
      const pQuery = target[`${propertyKey}_Query_parameters`];
      const pBody = target[`${propertyKey}_Body_parameters`];
      const pHeader = target[`${propertyKey}_Header_parameters`];

      descriptor.value = function (...args: any[]) {
        const body: string = createBody(pBody, descriptor, args);
        const resUrl: string = createPath(url, pPath, args);
        const search: URLSearchParams = createQuery(pQuery, args);
        const headers: Headers = createHeaders(pHeader, descriptor, this.getDefaultHeaders(), args);

        const req = new HttpRequest(
          method,
          resUrl,
          body,
        );

        // intercept the request
        this.requestInterceptor(req);

        // make the request and store the observable for later transformation

        let observable: Observable<Response> = this.http.request(req);

        // intercept the response
        observable = this.responseInterceptor(observable, descriptor.adapter);

        return observable;
      };

      return descriptor;
    };
  };
}
