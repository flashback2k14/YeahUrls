import { Component, Output, EventEmitter } from "@angular/core";
import { TabType } from "../../../../models";

@Component({
  selector: "yeah-tabs",
  templateUrl: "./yeah-tabs.component.html",
  styleUrls: ["./yeah-tabs.component.css"]
})
export class YeahTabsComponent {
  @Output() tabSwitched: EventEmitter<TabType>;

  viewMode: string;

  constructor() {
    this.viewMode = "tabUser";
    this.tabSwitched = new EventEmitter<TabType>();
  }

  switchTab(tabName: string) {
    this.viewMode = tabName;
    this.tabSwitched.emit(tabName === "tabUser" ? TabType.User : tabName === "tabTags" ? TabType.Tags : TabType.Urls);
  }
}
