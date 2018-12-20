import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "yeah-share",
  templateUrl: "./share.component.html",
  styleUrls: ["./share.component.css"]
})
export class ShareComponent implements OnInit {
  code: any;
  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    this._route.params.subscribe(params => {
      console.log(params);
      this.code = params;
    });
  }
}
