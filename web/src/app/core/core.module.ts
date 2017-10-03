import { NgModule, Optional, SkipSelf } from "@angular/core";
import { AuthService } from "./services/api/auth.service";
import { AuthguardService } from "./services/ui/authguard.service";
import { UiService } from "./services/ui/ui.service";
import { UrlService } from "./services/api/url.service";
import { NotifyService } from "./services/ui/notify.service";

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