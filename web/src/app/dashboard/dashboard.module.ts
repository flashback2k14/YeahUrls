import { NgModule } from "@angular/core";
import { DashboardComponent } from "./component/dashboard.component";
import { DashboardRouterModule } from "./dashboard-routing.module";

@NgModule({
  imports: [DashboardRouterModule],
  declarations: [DashboardComponent],
})
export class DashboardModule { }
