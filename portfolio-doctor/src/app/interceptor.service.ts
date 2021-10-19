import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpParams,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';

import { map } from 'rxjs/operators';
import 'rxjs/Rx';

import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private api: ApiService, public router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req,"Checking intercept request");
    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json'), body: {data:this.api.encryptData(req.body)} });
    return next.handle(req);
  }
}