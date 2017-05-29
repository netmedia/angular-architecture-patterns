import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  Http,
  Headers,
  RequestOptions
}                     from '@angular/http';

@Injectable()
export class ConfigService {

  private config: Object
  private env: Object

  constructor(private http: Http) {}

  /**
   * Loads the environment config file first. Reads the environment variable from the file
   * and based on that loads the appropriate configuration file - development or production
   */
  load() {
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'DataType': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this.http.get('/config/env.json')
      .map(res => res.json())
      .subscribe((env_data) => {
        this.env = env_data;

        this.http.get('/config/' + env_data.env + '.json')
          .map(res => res.json())
          .catch((error: any) => {
            return Observable.throw(error.json().error || 'Server error');
          })
          .subscribe((data) => {
            this.config = data;
            resolve(true);
          });
      });

    });
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