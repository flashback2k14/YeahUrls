import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./component/profile.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRouterModule {}
