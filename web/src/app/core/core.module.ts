import { NgModule, Optional, SkipSelf } from "@angular/core";
import { AuthService, AuthguardService, UiService, UrlService, NotifyService } from "./services/index";

@NgModule({
  providers: [
    AuthService,
    AuthguardService,
    UiService,
    UrlService,
    NotifyService
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error("CoreModule is already loaded. Import it in the AppModule only!");
    }
  }
}