import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { LoginResult } from '../../models/login-result';
import { Router } from '@angular/router';
import { Keys } from '../../helper/keys';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor (
    private _authService: AuthService,
    private _router: Router
  ) { }

  async login (value: any): Promise<void> {
    try {
      const result: LoginResult = await this._authService.signIn(value.username, value.password);
      localStorage.setItem(Keys.USERTOKEN, result.token);
      localStorage.setItem(Keys.USERINFO, JSON.stringify(result.user));
      this._router.navigate(["/dashboard"]);
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  }
}
