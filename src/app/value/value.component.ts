import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-value",
  templateUrl: "./value.component.html",
  styleUrls: ["./value.component.scss"],
})
export class ValueComponent implements OnInit {
  values: any;

  constructor(private _http: HttpClient) {}

  ngOnInit() {
    this.getValues();
  }

  getValues = () => {
    this._http.get("https://localhost:44344/api/Values").subscribe((result) => {
      this.values = result;
    });
  };
}
