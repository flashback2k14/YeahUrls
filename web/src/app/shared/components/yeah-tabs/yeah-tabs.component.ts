import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "yeah-tabs",
  templateUrl: "./yeah-tabs.component.html",
  styleUrls: ["./yeah-tabs.component.css"]
})
export class YeahTabsComponent {
  @Output() tabSwitched: EventEmitter<string>;

  viewMode: string;

  constructor() {
    this.viewMode = "tabUser";
    this.tabSwitched = new EventEmitter<string>();
  }

  switchTab(tabName: string) {
    this.viewMode = tabName;
    this.tabSwitched.emit(tabName);
  }
}
