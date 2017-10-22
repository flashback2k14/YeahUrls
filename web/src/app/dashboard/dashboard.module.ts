import { NgModule } from "@angular/core";
import { VirtualScrollModule } from "angular2-virtual-scroll";
import { DashboardComponent } from "./component/dashboard.component";
import { DashboardRouterModule } from "./dashboard-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [DashboardRouterModule, SharedModule, VirtualScrollModule],
  declarations: [DashboardComponent],
})
export class DashboardModule { }
