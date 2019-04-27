import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FavoriteRouterModule } from "./favorite-routing.module";
import { FavoriteComponent } from "./component/favorite.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [CommonModule, SharedModule, FavoriteRouterModule],
  declarations: [FavoriteComponent]
})
export class FavoriteModule {}
