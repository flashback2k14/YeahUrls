import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../api/auth.service";
import { NotifyService } from "../ui/notify.service";

@Injectable()
export class AuthguardService implements CanActivate {

  constructor (
    private _authService: AuthService,
    private _notifyService: NotifyService,
    private _router: Router
  ) { }

  canActivate (): boolean {
    if (this._authService.isLoggedIn) {
      return true;
    }
    this._notifyService.onWarning("The User id not logged in! Redirect to Login Page!", true, true);
    this._router.navigate(["/login"]);
    return false;
  }
}
