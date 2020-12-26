import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AlertifyService } from "../services/alertify.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  model: any = {};

  @Output() cancelRegister = new EventEmitter();

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {}

  register = () => {
    this.authService.register(this.model).subscribe(
      () => this.alertify.success("registration succesfull"),
      (error) => {
        this.alertify.error(error);
      }
    );
  };

  cancel = () => {
    this.cancelRegister.emit(false);
  };
}
