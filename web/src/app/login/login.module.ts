import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./component/login.component";
import { LoginRouterModule } from "./login-routing.module";

@NgModule({
  imports: [FormsModule, LoginRouterModule],
  declarations: [LoginComponent],
  exports: [FormsModule]
})
export class LoginModule { }
