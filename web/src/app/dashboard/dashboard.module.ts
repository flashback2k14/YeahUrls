import { NgModule } from "@angular/core";
import { DashboardComponent } from "./component/dashboard.component";
import { DashboardRouterModule } from "./dashboard-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [SharedModule, DashboardRouterModule],
  declarations: [DashboardComponent],
})
export class DashboardModule { }
