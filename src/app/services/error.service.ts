import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  public error: string = '';
  private errorTimeout: any;
  private errorTimeoutTime = 5000;

  public hasError() {
    return this.error !== '';
  }

  public removeError() {
    this.error = '';
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
    }
  }

  public setError(error: string) {
    this.error = error;
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
    }
    this.errorTimeout = setTimeout(() => {
      this.removeError();
    }, this.errorTimeoutTime);
  }
}
