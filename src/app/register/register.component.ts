import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  model: any = {};
  
  @Output() cancelRegister = new EventEmitter();

  constructor(private authService:AuthService) {}

  ngOnInit(): void {

  }

  register = () => {
    this.authService.register(this.model).subscribe(()=>console.log("registration succesfull"),(error)=>{
      console.log("fail to register")
    })
  };

  cancel = () => {
    this.cancelRegister.emit(false);
  };
}
