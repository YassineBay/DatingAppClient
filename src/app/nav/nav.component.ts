import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login = () => {
    this.authService.login(this.model).subscribe({
      next(data) {
        console.log(data);
      },
      error(err) {
        console.log("errors already caught... will not run");
      },
    });
  };

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem("token");
  }

  loggedIn = () => {
    const token = localStorage.getItem("token");
    return token;
  };
}
