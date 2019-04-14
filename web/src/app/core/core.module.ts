import { NgModule, Optional, SkipSelf } from "@angular/core";
import {
  AuthService,
  AuthguardService,
  CachingService,
  UiService,
  SocketService,
  TagService,
  UrlService,
  NotifyService,
  UserService
} from "./services/index";

@NgModule({
  providers: [
    AuthService,
    AuthguardService,
    CachingService,
    SocketService,
    TagService,
    UiService,
    UrlService,
    NotifyService,
    UserService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error("CoreModule is already loaded. Import it in the AppModule only!");
    }
  }
}
