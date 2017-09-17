import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Keys } from '../../../helper/keys';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor (private _router: Router) { }

  logout (): void {
    localStorage.removeItem(Keys.USERTOKEN);
    localStorage.removeItem(Keys.USERINFO);
    this._router.navigate(["/login"]);
  }
}
