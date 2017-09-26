import { Component, OnInit } from '@angular/core';
import { Url } from '../../../models/url';
import { UrlService } from '../../core/services/url.service';
import { Helper } from '../../../helper/helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  urlList: Array<Url>;

  constructor (private _urlService: UrlService) { }

  ngOnInit () {
    this._urlService.getUrlsByUser(Helper.getUserId())
      .then(result => this.urlList = result)
      .catch(error => console.error(error));
  }

  handleSubmittedSearchRequest (requestedSearchTerm: string): void {
    if (requestedSearchTerm) {
      alert(requestedSearchTerm);
    }
  }

  handleSubmittedEditUrlItemRequest (requestedUrl: Url): void {
    alert(requestedUrl.url);
  }

  handleSubmittedDeleteUrlItemRequest (requestedUrl: Url): void {
    alert(requestedUrl.url);
  }

  handleSubmittedTagNameAsSearchRequest (requestedSearchTerm: string): void {
    alert(requestedSearchTerm)
  }
}
