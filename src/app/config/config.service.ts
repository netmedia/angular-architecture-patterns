import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


export interface Environment {
  env: string;
}

export interface EnvironmentConfig {
  api: object;
  paths: object;
  localization: object;
  notifications: object;
  debugging: boolean;
}


@Injectable()
export class ConfigService {

  private config: object;
  private env: any;
  private environmentUrl = 'config/env.json';
  private headers: Array<string>;
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
  constructor(private http: HttpClient) { }

  /**
   * Loads the environment config file first. Reads the environment variable from the file
   * and based on that loads the appropriate configuration file - development or production
   */
  load() {
    return new Promise((resolve, reject) => {
      this.getConfigResponse()
        // resp is of type `HttpResponse<Config>`
        .subscribe(resp => {
          // display its headers
          const keys = resp.headers.keys();
          this.headers = keys.map(key =>
            `${key}: ${resp.headers.get(key)}`);

          // access the body directly
          this.env = { ...resp.body };

          this.getEnvironmentConfigResponse()
            .subscribe(res => {
              this.config = { ...res.body };
              resolve(true);
            });
        });

    });
  }

  getConfigResponse(): Observable<HttpResponse<Environment>> {
    // httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return this.http.get<Environment>(
      this.environmentUrl,
      {
        observe: 'response',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        params: new HttpParams({ fromString: 'cache=false' }),
      }
    )
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }

  getEnvironmentConfigResponse(): Observable<HttpResponse<EnvironmentConfig>> {
    return this.http.get<EnvironmentConfig>(
      '/config/' + this.env.env + '.json',
      {
        observe: 'response',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Cache-control': 'private, max-age=0, no-cache'
        }),
        params: new HttpParams({ fromString: 'cache=false' }),
      })
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }

  /**
   * Returns environment variable based on given key
   *
   * @param key
   */
  getEnv(key: any) {
    return this.env[key];
  }

  /**
   * Returns configuration value based on given key
   *
   * @param key
   */
  get(key: any) {
    return this.config[key];
  }
}
