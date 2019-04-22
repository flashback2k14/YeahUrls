import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "yeah-share",
  templateUrl: "./share.component.html",
  styleUrls: ["./share.component.css"]
})
export class ShareComponent implements OnDestroy {
  private _queryParamsSubscription$: Subscription;
  textAsUrl: string;
  url: string;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.textAsUrl = params["text"];
      this.url = params["url"];
    });
  }

  ngOnDestroy(): void {
    this._queryParamsSubscription$.unsubscribe();
  }
}
