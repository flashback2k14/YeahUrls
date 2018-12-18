import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Helper } from "../../helper/index";
import { AuthService, UiService } from "../core/services/index";

@Component({
  selector: "yeah-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  showImportDialog: boolean;

  constructor (
    private _authService: AuthService,
    private _uiService: UiService,
    private _router: Router
  ) {
    this.showImportDialog = false;
  }

  ngOnInit(): void {
    if (this._authService.isLoggedIn) {
      this._router.navigate(["/dashboard"]);
      this._uiService.toggleHeaderAreaForUserinformation();
      this._uiService.changeUsernameAtHeaderArea(Helper.getUsername());
      this._uiService.toggleFooterAreaForImportFunction();
    } else {
      this._router.navigate(["/login"]);
    }
  }

  handleSubmittedOpenImportRequest (): void {
    this.showImportDialog = true;
  }

  handleSubmittedCloseImportRequest (e: boolean): void {
    this.showImportDialog = e;
  }
}
