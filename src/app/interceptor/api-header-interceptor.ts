import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class ApiHeaderInterceptor implements HttpInterceptor {
  constructor() { }
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      const newRequest = req.clone({ setHeaders: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
      return next.handle(newRequest);
    }
    return next.handle(req);
  }
}
