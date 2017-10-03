import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  YeahUrlListComponent, YeahUrlListSearchComponent, YeahUrlListItemComponent, YeahUrlListTagComponent,
  YeahDialogBaseComponent, YeahDialogImportComponent, YeahDialogEditComponent, YeahDialogDeleteComponent,
  YeahNotifyComponent
} from "./components/index";

@NgModule({
  imports: [CommonModule],
  declarations: [
    YeahUrlListComponent,
    YeahUrlListSearchComponent,
    YeahUrlListItemComponent,
    YeahUrlListTagComponent,
    YeahDialogBaseComponent,
    YeahDialogImportComponent,
    YeahDialogEditComponent,
    YeahDialogDeleteComponent,
    YeahNotifyComponent
  ],
  exports: [
    YeahUrlListComponent,
    YeahUrlListSearchComponent,
    YeahUrlListItemComponent,
    YeahUrlListTagComponent,
    YeahDialogBaseComponent,
    YeahDialogImportComponent,
    YeahDialogEditComponent,
    YeahDialogDeleteComponent,
    YeahNotifyComponent,
    CommonModule
  ]
})
export class SharedModule { }
