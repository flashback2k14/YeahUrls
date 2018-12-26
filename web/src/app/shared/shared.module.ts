import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  YeahUrlListComponent,
  YeahUrlListSearchComponent,
  YeahUrlListItemComponent,
  YeahUrlListTagComponent,
  YeahDialogAddComponent,
  YeahDialogBaseComponent,
  YeahDialogImportComponent,
  YeahDialogEditComponent,
  YeahDialogDeleteComponent,
  YeahAutocompleteComponent,
  YeahNotifyComponent,
  YeahTabsComponent
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
    YeahAutocompleteComponent,
    YeahNotifyComponent,
    YeahTabsComponent
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
    YeahAutocompleteComponent,
    YeahNotifyComponent,
    YeahTabsComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule {}
