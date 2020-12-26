import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl = "https://localhost:44344/api/Auth/";
  userToken: any;

  constructor(private _http: HttpClient) {}

  login(model: any) {
    return this._http
      .post(this.baseUrl + "login", model, { headers: this.requestOptions() })
      .pipe(
        map((res: any) => {
          // We are mapping this method because we need to add the token to localstorage
          if (res.tokenString) {
            localStorage.setItem("token", res.tokenString);
            this.userToken = res.tokenString;
          }
        }),
        catchError(this.HandlerError)
      );
  }

  register(model: any) {
    return this._http
      .post(this.baseUrl + "register", model, {
        headers: this.requestOptions(),
      })
      .pipe(catchError(this.HandlerError));
  }

  private requestOptions() {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return headers;
  }

  private HandlerError(response: HttpErrorResponse) {
    const applicationError = response.headers.get("Application-Error");
    if (applicationError) {
      return throwError(applicationError);
    }
    const serverError = response.error.errors;
    let modelState = "";
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelState += serverError[key] + "\n";
        }
      }
    }
    return throwError(modelState || "server Error");
  }
}
