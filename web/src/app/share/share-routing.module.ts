import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShareComponent } from "./component/share.component";
import { AuthguardService } from "../core/services";

const routes: Routes = [
  {
    path: "",
    component: ShareComponent,
    canActivate: [AuthguardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShareRouterModule {}
