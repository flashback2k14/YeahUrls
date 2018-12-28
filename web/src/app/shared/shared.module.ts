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
  YeahTabsComponent,
  YeahTagListComponent,
  YeahTagListItemComponent,
  YeahDialogMoveComponent
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
    YeahTabsComponent,
    YeahTagListComponent,
    YeahTagListItemComponent,
    YeahDialogMoveComponent
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
    YeahTagListComponent,
    YeahTagListItemComponent,
    YeahDialogMoveComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule {}
