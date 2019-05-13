import { Component, Input } from "@angular/core";

@Component({
  selector: "yeah-button",
  templateUrl: "./yeah-button.component.html",
  styleUrls: ["./yeah-button.component.css"]
})
export class YeahButtonComponent {
  @Input() buttonTabIndex: string;
}
