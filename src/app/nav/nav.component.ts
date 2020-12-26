import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertifyService } from "../services/alertify.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login = () => {
    this.authService.login(this.model).subscribe(
      (result) => {
        this.alertify.success("Logged In Successfully ");
      },
      (error) => {
        this.alertify.error("Failed to Login");
      },
      () => {
        this.router.navigate(["/members"]);
      }
    );
  };

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem("token");
    this.alertify.message("Looged Out");
    this.router.navigate(["/home"]);
  }

  loggedIn = () => {
    return this.authService.loggedIn(); // Checks wether the token exists or not
  };
}
