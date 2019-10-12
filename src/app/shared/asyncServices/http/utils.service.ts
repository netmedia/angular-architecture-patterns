import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';

export function methodBuilder(method: number) {
  return function (url: string) {
    return function (target: HttpService, propertyKey: string, descriptor: any) {

      const pPath = target[`${propertyKey}_Path_parameters`];
      const pQuery = target[`${propertyKey}_Query_parameters`];
      const pBody = target[`${propertyKey}_Body_parameters`];
      const pHeader = target[`${propertyKey}_Header_parameters`];

      descriptor.value = function (...args: any[]) {
        const body: string = createBody(pBody, descriptor, args);
        const resUrl: string = createPath(url, pPath, args);
        const search: URLSearchParams = createQuery(pQuery, args);
        const headers: Headers = createHeaders(pHeader, descriptor, this.getDefaultHeaders(), args);

        // Request options
        const options = new RequestOptions({
          method,
          url: this.getBaseUrl() + resUrl,
          headers,
          body,
          search
        });

        const req = new Request(options);

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

export function paramBuilder(paramName: string) {
  return function (key: string) {
    return function (target: HttpService, propertyKey: string | symbol, parameterIndex: number) {
      const metadataKey = `${propertyKey.toString()}_${paramName}_parameters`;
      const paramObj: any = {
        key,
        parameterIndex
      };

      if (Array.isArray(target[metadataKey])) { target[metadataKey].push(paramObj); } else { target[metadataKey] = [paramObj]; }
    };
  };
}

function createBody(pBody: Array<any>, descriptor: any, args: Array<any>): string {
  if (descriptor.isFormData) { return args[0]; }
  return pBody ? JSON.stringify(args[pBody[0].parameterIndex]) : null;
}

function createPath(url: string, pPath: Array<any>, args: Array<any>): string {
  let resUrl: string = url;

  if (pPath) {
    for (const k in pPath) {
      if (pPath.hasOwnProperty(k)) {
        resUrl = resUrl.replace('{' + pPath[k].key + '}', args[pPath[k].parameterIndex]);
      }
    }
  }

  return resUrl;
}

function createQuery(pQuery: any, args: Array<any>): URLSearchParams {
  const search = new URLSearchParams();

  if (pQuery) {
    pQuery
      .filter(p => args[p.parameterIndex]) // filter out optional parameters
      .forEach(p => {
        const key = p.key;
        let value = args[p.parameterIndex];
        // if the value is a instance of Object, we stringify it
        if (value instanceof Object) {
          value = JSON.stringify(value);
        }
        search.set(encodeURIComponent(key), encodeURIComponent(value));
      });
  }

  return search;
}

function createHeaders(pHeader: any, descriptor: any, defaultHeaders: any, args: Array<any>): Headers {
  const headers = new Headers(defaultHeaders);

  // set method specific headers
  for (const k in descriptor.headers) {
    if (descriptor.headers.hasOwnProperty(k)) {
      if (headers.has(k)) { headers.delete(k); }
      headers.append(k, descriptor.headers[k]);
    }
  }

  // set parameter specific headers
  if (pHeader) {
    for (const k in pHeader) {
      if (pHeader.hasOwnProperty(k)) {
        if (headers.has(k)) { headers.delete(k); }
        headers.append(pHeader[k].key, args[pHeader[k].parameterIndex]);
      }
    }
  }

  return headers;
}
