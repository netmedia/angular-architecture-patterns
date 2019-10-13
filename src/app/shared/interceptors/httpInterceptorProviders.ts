//https://angular.io/guide/http#advanced-usage

/**
 * An interceptor that alters headers can be used for a number of different operations, including:

Authentication/authorization
Caching behavior; for example, If-Modified-Since
XSRF protection
 */
/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopInterceptor } from './noop-interceptor';
import { EnsureHttpsInterceptor } from './ensure-https-interceptor';
import { LoggingInterceptor } from './logging-interceptor';


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  /**
   * You could add this provider directly to the providers array of the AppModule. However, it's rather verbose and there's a good chance that you'll create more interceptors and provide them in the same way.
   * You must also pay close attention to the order in which you provide these interceptors.
   * ===== Interceptor order =====
   * Angular applies interceptors in the order that you provide them.
   * If you provide interceptors A, then B, then C, requests will flow in A->B->C and
   * responses will flow out C->B->A.
   * You cannot change the order or remove interceptors later. If you need to enable and disable an interceptor dynamically,
   * you'll have to build that capability into the interceptor itself.
   */
  // { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: EnsureHttpsInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
];
