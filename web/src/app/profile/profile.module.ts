import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProfileRouterModule } from "./profile-routing.module";
import { ProfileComponent } from "./component/profile.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [CommonModule, FormsModule, SharedModule, ProfileRouterModule],
  declarations: [ProfileComponent]
})
export class ProfileModule {}
