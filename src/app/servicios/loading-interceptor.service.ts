import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingHandlerService } from './loading-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor{

  constructor(public loadingHandler: LoadingHandlerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingHandler.handleRequest('plus');
    return next
      .handle(request)
      .pipe(
        finalize(this.finalize.bind(this))
      );
  }

  finalize = (): void => this.loadingHandler.handleRequest();
}