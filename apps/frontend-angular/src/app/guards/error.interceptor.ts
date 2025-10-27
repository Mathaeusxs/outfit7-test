import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { MessageService } from "primeng/api";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        const message =
          typeof err.error?.message === "object"
            ? JSON.stringify(err.error?.message)
            : err.error?.message;

        this.messageService.add({
          severity: "error",
          summary: `Error ${err.status}`,
          detail: message || err.message,
        });
        return throwError(() => err);
      }),
    );
  }
}
