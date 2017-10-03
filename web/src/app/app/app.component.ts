import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Keys } from '../../helper/keys';
import { AuthService } from '../core/services/api/auth.service';
import { HeaderService } from '../core/services/ui/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showImportDialog: boolean;

  constructor (
    private _authService: AuthService,
    private _headerService: HeaderService,
    private _router: Router
  ) {
    this.showImportDialog = false;
  }

  ngOnInit(): void {
    if (this._authService.isLoggedIn) {
      this._router.navigate(["/dashboard"]);
      this._headerService.toggleUserArea();
      this._headerService.changeUsername(this._getUsername());
    } else {
      this._router.navigate(["/login"]);
    }
  }

  private _getUsername(): string {
    const userObj = JSON.parse(localStorage.getItem(Keys.USERINFO));
    if (userObj) return userObj.name;
    return "Unknown User";
  }

  handleSubmittedOpenImportRequest (): void {
    this.showImportDialog = true;
  }
}
