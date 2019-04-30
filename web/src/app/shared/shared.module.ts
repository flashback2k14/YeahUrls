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
  YeahUrlSearchComponent
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
    YeahUrlSearchComponent
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
    CommonModule,
    FormsModule
  ]
})
export class SharedModule {}
