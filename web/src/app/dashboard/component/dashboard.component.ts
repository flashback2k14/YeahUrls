import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  urlList: Array<any>

  constructor () { }
  ngOnInit () {
    // TODO: Create Objects for URL and TAG
    this.urlList = [
      {
        name: "https://www.google.de",
        tags: [
          "tag1",
          "tag2"
        ]
      },
      {
        name: "https://www.golem.de",
        tags: [
          "tag1"
        ]
      },
      {
        name: "https://www.github.com",
        tags: [
          "tag1",
          "tag2",
          "tag3"
        ]
      }
    ];
  }

  handleSubmittedSearchRequest (requestedSearchTerm: string): void {
    if (requestedSearchTerm) {
      alert(requestedSearchTerm);
    }
  }

  handleSubmittedEditUrlItemRequest (requestedUrl: any): void {
    alert(requestedUrl.name);
  }

  handleSubmittedDeleteUrlItemRequest (requestedUrl: any): void {
    alert(requestedUrl.name);
  }

  handleSubmittedTagNameAsSearchRequest (requestedSearchTerm: string): void {
    alert(requestedSearchTerm)
  }
}
