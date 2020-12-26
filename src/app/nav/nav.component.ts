import { Component, OnInit } from "@angular/core";
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
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {}

  login = () => {
    this.authService.login(this.model).subscribe(
      (result) => {
        this.alertify.success("Logged In Successfully ");
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  };

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem("token");
    this.alertify.message("Looged Out");
  }

  loggedIn = () => {
    return this.authService.loggedIn(); // Checks wether the token exists or not
  };
}
