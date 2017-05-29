import { Injectable }           from '@angular/core';
import { TranslateService }     from 'ng2-translate';
import { NotificationsService } from 'angular2-notifications';
import { ConfigService }        from '../../../app-config.service';
import { Router }               from '@angular/router';
import { Observable }           from 'rxjs/Observable';

@Injectable()
export class HttpResponseHandler {
	constructor(
		private router: Router,
    private translateService: TranslateService,
    private notificationsService: NotificationsService,
    private configService: ConfigService
  ) {}

  /**
   * Global http error handler.
   *
   * @param error
   * @param source
   * @returns {ErrorObservable}
   */
  public onCatch(response: any, source: Observable<any>): Observable<any> {
    switch (response.status) {
      case 400:
        this.handleBadRequest(response);
        break;

      case 401:
        this.handleUnauthorized(response);
        break;

      case 403:
        this.handleForbidden();
        break;

      case 404:
        this.handleNotFound(response);
        break;

      case 500:
        this.handleServerError();
        break;

      default:
        break;
    }

    return Observable.throw(response);
  }

  /**
   * Shows notification errors when server response status is 401
   *
   * @param error
   */
  private handleBadRequest(responseBody: any): void {
    if (responseBody._body) {
      try {
        var bodyParsed = responseBody.json();
        this.handleErrorMessages(bodyParsed);
      } catch (error) {
        this.handleServerError();
      }
    }
    else this.handleServerError();
  }

  /**
   * Shows notification errors when server response status is 401 and redirects user to login page
   *
   * @param responseBody
   */
  private handleUnauthorized(responseBody: any): void {
    // Read configuration in order to see if we need to display 401 notification message
    let unauthorizedEndpoints: Array<string> = this.configService.get('notifications').unauthorizedEndpoints;

    unauthorizedEndpoints = unauthorizedEndpoints.filter(endpoint => this.getRelativeUrl(responseBody.url) === endpoint);
    this.router.navigate(['/login']);

    if (unauthorizedEndpoints.length) {
      this.notificationsService.info('Info', this.translateService.instant('ServerError401'), this.configService.get('notifications').options);
    }
  }

  /**
   * Shows notification errors when server response status is 403
   */
  private handleForbidden(): void {
    this.notificationsService.error('error', this.translateService.instant('ServerError403'), this.configService.get('notifications').options);
    this.router.navigate(['/login']);
  }

  /**
   * Shows notification errors when server response status is 404
   *
   * @param responseBody
   */
  private handleNotFound(responseBody: any): void {
    // Read configuration in order to see if we need to display 401 notification message
    let notFoundEndpoints: Array<string> = this.configService.get('notifications').notFoundEndpoints;
    notFoundEndpoints = notFoundEndpoints.filter(endpoint => this.getRelativeUrl(responseBody.url) === endpoint);

    if (notFoundEndpoints.length) {
      let message = this.translateService.instant('ServerError404'),
          title   = this.translateService.instant('ErrorNotificationTitle');

      this.showNotificationError(title, message);
    }
  }

  /**
   * Shows notification errors when server response status is 500
   */
  private handleServerError(): void {
    let message = this.translateService.instant('ServerError500'),
        title   = this.translateService.instant('ErrorNotificationTitle');

    this.showNotificationError(title, message);
  }

  /**
   * Parses server response and shows notification errors with translated messages
   *
   * @param response
   */
  private handleErrorMessages(response: any): void {
    if (!response) return;

    for (const key of Object.keys(response)) {
      if (Array.isArray(response[key])) {
        response[key].forEach((value) => this.showNotificationError('Error', this.getTranslatedValue(value)));
      }
      else this.showNotificationError('Error', this.getTranslatedValue(response[key]));
    }
  }

  /**
   * Extracts and returns translated value from server response
   *
   * @param value
   * @returns {string}
   */
  private getTranslatedValue(value: string): string {
    if (value.indexOf('[') > -1) {
      let key = value.substring(value.lastIndexOf("[")+1,value.lastIndexOf("]"));
      value = this.translateService.instant(key);
    }

    return value;
  }

  /**
   * Returns relative url from the absolute path
   *
   * @param responseBody
   * @returns {string}
   */
  private getRelativeUrl(url: string): string {
    return url.toLowerCase().replace(/^(?:\/\/|[^\/]+)*\//, "");
  }

  /**
   * Shows error notification with given title and message
   *
   * @param title
   * @param message
   */
  private showNotificationError(title: string, message: string): void {
    this.notificationsService.error(title, message, this.configService.get('notifications').options);
  }
}