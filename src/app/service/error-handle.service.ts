import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandleService implements ErrorHandler {

  constructor() { }
  handleError(error: any): void {
    console.log('錯誤', error);
  }
}
