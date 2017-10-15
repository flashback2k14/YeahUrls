import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  YeahUrlListComponent, YeahUrlListSearchComponent, YeahUrlListItemComponent, YeahUrlListTagComponent,
  YeahDialogAddComponent, YeahDialogBaseComponent, YeahDialogImportComponent, YeahDialogEditComponent, YeahDialogDeleteComponent,
  YeahNotifyComponent
} from "./components/index";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    YeahUrlListComponent,
    YeahUrlListSearchComponent,
    YeahUrlListItemComponent,
    YeahUrlListTagComponent,
    YeahDialogAddComponent,
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
    YeahDialogAddComponent,
    YeahDialogBaseComponent,
    YeahDialogImportComponent,
    YeahDialogEditComponent,
    YeahDialogDeleteComponent,
    YeahNotifyComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
