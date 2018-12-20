import { NgModule } from "@angular/core";
import { VirtualScrollerModule } from "ngx-virtual-scroller";
import { DashboardComponent } from "./component/dashboard.component";
import { DashboardRouterModule } from "./dashboard-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [DashboardRouterModule, SharedModule, VirtualScrollerModule],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
