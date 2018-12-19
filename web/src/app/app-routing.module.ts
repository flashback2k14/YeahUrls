import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: "app/login/login.module#LoginModule"
  },
  {
    path: "dashboard",
    loadChildren: "app/dashboard/dashboard.module#DashboardModule"
  },
  {
    path: "profile",
    loadChildren: "app/profile/profile.module#ProfileModule"
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
