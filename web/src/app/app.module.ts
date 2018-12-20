import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, APP_INITIALIZER } from "@angular/core";

import { ConfigService } from "./core/services/index";
import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { BasicModule } from "./basic/basic.module";
import { SharedModule } from "./shared/shared.module";

import { AppComponent } from "./app/app.component";
import { ServiceWorkerModule } from "@angular/service-worker";

export function ConfigLoader(configService: ConfigService) {
  return () => configService.load(environment.configFile);
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    BasicModule,
    SharedModule,
    ServiceWorkerModule.register("./ngsw-worker.js", {
      enabled: !environment.production
    })
  ],
  declarations: [AppComponent],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
