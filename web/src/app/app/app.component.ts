import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { HeaderService } from '../core/services/header.service';
import { Keys } from '../../helper/keys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor (
    private _authService: AuthService,
    private _headerService: HeaderService,
    private _router: Router
  ) {}

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
}
