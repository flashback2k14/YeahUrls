import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./component/dashboard.component";
import { AuthguardService } from "../core/services/authguard.service";

const routes: Routes = [{
  path: "", component: DashboardComponent, canActivate: [AuthguardService]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRouterModule { }
