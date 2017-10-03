import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Helper } from '../../helper/helper';
import { Keys } from '../../helper/keys';
import { AuthService } from '../core/services/api/auth.service';
import { UiService } from '../core/services/ui/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
}
