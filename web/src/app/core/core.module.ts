import { NgModule, Optional, SkipSelf } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { AuthguardService } from "./services/authguard.service";
import { HeaderService } from "./services/header.service";
import { UrlService } from "./services/url.service";

@NgModule({
  providers: [
    AuthService,
    AuthguardService,
    HeaderService,
    UrlService
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error("CoreModule is already loaded. Import it in the AppModule only!");
    }
  }
}