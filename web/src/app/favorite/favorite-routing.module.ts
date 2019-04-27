import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FavoriteComponent } from "./component/favorite.component";
import { AuthguardService } from "../core/services";

const routes: Routes = [
  {
    path: "",
    component: FavoriteComponent,
    canActivate: [AuthguardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoriteRouterModule {}
