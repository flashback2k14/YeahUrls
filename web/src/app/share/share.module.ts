import { NgModule } from "@angular/core";
import { ShareRouterModule } from "./share-routing.module";
import { ShareComponent } from "./component/share.component";

@NgModule({
  imports: [ShareRouterModule],
  declarations: [ShareComponent]
})
export class ShareModule {}
