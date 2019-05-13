import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
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
  YeahTagListItemComponent,
  YeahDialogMoveComponent,
  YeahDialogEditTagComponent,
  YeahDialogDeleteTagComponent,
  YeahDuplicateUrlListItemComponent,
  YeahListComponent,
  YeahUrlSearchComponent,
  YeahInputComponent,
  YeahButtonComponent
} from "./components/index";

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
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
    YeahTagListItemComponent,
    YeahDialogMoveComponent,
    YeahDialogEditTagComponent,
    YeahDialogDeleteTagComponent,
    YeahDuplicateUrlListItemComponent,
    YeahListComponent,
    YeahUrlSearchComponent,
    YeahInputComponent,
    YeahButtonComponent
  ],
  exports: [
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
    YeahTagListItemComponent,
    YeahDialogMoveComponent,
    YeahDialogEditTagComponent,
    YeahDialogDeleteTagComponent,
    YeahDuplicateUrlListItemComponent,
    YeahListComponent,
    YeahUrlSearchComponent,
    YeahInputComponent,
    YeahButtonComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule {}
