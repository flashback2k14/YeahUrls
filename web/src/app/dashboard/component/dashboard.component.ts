import { Component, OnInit, ViewChild } from '@angular/core';
import { Url } from '../../../models/url';
import { UrlService } from '../../core/services/url.service';
import { Helper } from '../../../helper/helper';
import { Tag } from '../../../models/tag';
import { YeahDialogDeleteComponent } from '../../shared/components/yeah-dialog-delete/yeah-dialog-delete.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild("yeahUrlDeleteDialog") yeahUrlDeleteDialog: YeahDialogDeleteComponent;

  private _urlList: Array<Url>;
  filteredUrlList: Array<Url>;
  showLoading: boolean;

  constructor (private _urlService: UrlService) {
    this.showLoading = true;
  }

  ngOnInit () {
    this._urlService.getUrlsByUser(Helper.getUserId())
      .then(result => {
        this._urlList = result;
        this.filteredUrlList = this._urlList;
        this.showLoading = false;
      })
      .catch(error => console.error(error));
  }

  handleSubmittedSearchRequest (requestedSearchTerm: string): void {
    if (!requestedSearchTerm) {
      this.filteredUrlList = this._urlList;
      return;
    }

    const filteredUrlsByNameList = this._urlList.filter((urlItem: Url) => {
      return urlItem.url.toLowerCase().includes(requestedSearchTerm.toLowerCase());
    });

    let filteredUrlsByTagList = new Array<any>();
    this._urlList.forEach(url => {
      url.tags.forEach(tag => {
        if (tag.name.toLowerCase().includes(requestedSearchTerm.toLowerCase())) {
          filteredUrlsByTagList.push(url);
        }
      })
    });

    this.filteredUrlList = Array.from(new Set([...filteredUrlsByNameList, ...filteredUrlsByTagList]));
  }

  handleSubmittedEditUrlItemRequest (requestedUrl: Url): void {
    alert("Open Dialog");
  }

  handleSubmittedDeleteUrlItemRequest (requestedUrl: Url): void {
    this.yeahUrlDeleteDialog.open(requestedUrl);
  }

  handleCompletedDeleteUrlItem (removedUrlId: string): void {
    const foundIndex = this._urlList.findIndex((url: Url) => url.id === removedUrlId);
    this._urlList.splice(foundIndex, 1);
    this.filteredUrlList = this._urlList;
  }

  handleSubmittedTagNameAsSearchRequest (requestedSearchTerm: string): void {
    alert(requestedSearchTerm)
  }
}
