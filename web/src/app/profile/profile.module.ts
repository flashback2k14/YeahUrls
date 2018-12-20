import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProfileRouterModule } from "./profile-routing.module";
import { ProfileComponent } from "./component/profile.component";

@NgModule({
  imports: [FormsModule, ProfileRouterModule],
  declarations: [ProfileComponent]
})
export class ProfileModule {}
