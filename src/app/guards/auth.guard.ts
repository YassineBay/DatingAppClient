import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AlertifyService } from "../services/alertify.service";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertify.error("You need to be logged in to access this area");
    this.router.navigate(["/home"]);
    return false;
  }
}
