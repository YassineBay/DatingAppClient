import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";

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
        catchError((err) => of([]))
      );
  }

  register(model:any){
    return this._http.post(this.baseUrl+"register",model,{headers : this.requestOptions()})
  }

  private requestOptions(){
    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return headers;
  }
}
