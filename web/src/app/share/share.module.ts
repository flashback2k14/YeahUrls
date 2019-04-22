import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShareRouterModule } from "./share-routing.module";
import { ShareComponent } from "./component/share.component";

@NgModule({
  imports: [CommonModule, ShareRouterModule],
  declarations: [ShareComponent]
})
export class ShareModule {}
