import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthguardService implements CanActivate {

  constructor (
    private _authService: AuthService,
    private _router: Router
  ) { }

  canActivate (): boolean {
    if (this._authService.isLoggedIn) return true;
    alert("The User id not logged in! Redirect to Login Page!");
    this._router.navigate(["/login"]);
    return false;
  }
}
