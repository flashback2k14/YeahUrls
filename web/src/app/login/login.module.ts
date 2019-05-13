import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./component/login.component";
import { LoginRouterModule } from "./login-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [FormsModule, LoginRouterModule, SharedModule],
  declarations: [LoginComponent],
  exports: [FormsModule]
})
export class LoginModule {}
