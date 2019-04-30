import { Component, OnInit } from "@angular/core";
import { CachingService } from "../../core/services";
import { Url, Tag } from "../../../models";
import { Helper } from "../../../helper";

@Component({
  selector: "yeah-favorite",
  templateUrl: "./favorite.component.html",
  styleUrls: ["./favorite.component.css"]
})
export class FavoriteComponent implements OnInit {
  showLoading: boolean;
  filteredUrlList: Array<Url>;
  private _urlList: Array<Url>;
  private readonly FAVORITE_TAG_NAME = "P1";

  constructor(private _cachingService: CachingService) {
    this.showLoading = true;
    this._urlList = new Array<Url>();
    this.filteredUrlList = new Array<Url>();
  }

  async ngOnInit(): Promise<void> {
    const urls = await this._cachingService.fetchUrls(Helper.getUserId());
    this._urlList = urls.filter((url: Url) => url.tags.map((tag: Tag) => tag.name).includes(this.FAVORITE_TAG_NAME));
    this.filteredUrlList = [...this._urlList];
    this.showLoading = false;
  }

  handleSubmittedSearchRequest(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredUrlList = [...this._urlList];
      return;
    }

    this.filteredUrlList = Helper.performFiltering(this._urlList, searchTerm);
  }
}
