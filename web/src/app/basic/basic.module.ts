import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main/main.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    HeaderComponent,
    MainComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    MainComponent,
    FooterComponent,
    CommonModule
  ]
})
export class BasicModule { }
