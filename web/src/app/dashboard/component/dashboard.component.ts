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

  private _urlList: Array<Url>;
  filteredUrlList: Array<Url>;

  constructor (private _urlService: UrlService) { }

  ngOnInit () {

    // this.urlList = [
    //   {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   },
    //   {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   },
    //   {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }, {
    //     "id": "59be3e2cf5ae3a384349f702",
    //     "url": "http://www.google.com",
    //     "user": "59be2f6cd634c130224fe7d3",
    //     "tags": [
    //       {
    //         "id": "59be3e24f5ae3a384349f700",
    //         "name": "GOOGLE",
    //         "created": "2017-09-17T09:19:32.808Z",
    //         "updated": "2017-09-17T09:46:24.087Z"
    //       }
    //     ],
    //     "created": "2017-09-17T09:19:54.644Z",
    //     "updated": "2017-09-17T11:37:35.115Z"
    //   }
    // ];

    this._urlService.getUrlsByUser(Helper.getUserId())
      .then(result => {
        this._urlList = result;
        this.filteredUrlList = this._urlList;
      })
      .catch(error => console.error(error));
  }

  handleSubmittedSearchRequest (requestedSearchTerm: string): void {
    if (!requestedSearchTerm) {
      this.filteredUrlList = this._urlList;
      return;
    }
    this.filteredUrlList = this._urlList.filter((urlItem: Url) => {
      return urlItem.url.includes(requestedSearchTerm);
    });
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
