import { NgModule } from "@angular/core";
import { ProfileRouterModule } from "./profile-routing.module";
import { ProfileComponent } from "./component/profile.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [FormsModule, ProfileRouterModule],
  declarations: [ProfileComponent]
})
export class ProfileModule {}
