import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./component/profile.component";
import { NgModule } from "@angular/core";
import { AuthguardService } from "../core/services";

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
    canActivate: [AuthguardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRouterModule {}
