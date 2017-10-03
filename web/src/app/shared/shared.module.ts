import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { YeahUrlListComponent } from './components/yeah-url-list/yeah-url-list.component';
import { YeahUrlListSearchComponent } from './components/yeah-url-list-search/yeah-url-list-search.component';
import { YeahUrlListItemComponent } from './components/yeah-url-list-item/yeah-url-list-item.component';
import { YeahUrlListTagComponent } from './components/yeah-url-list-tag/yeah-url-list-tag.component';
import { YeahDialogComponent } from './components/yeah-dialog/yeah-dialog.component';
import { YeahDialogImportComponent } from './components/yeah-dialog-import/yeah-dialog-import.component';
import { YeahDialogEditComponent } from './components/yeah-dialog-edit/yeah-dialog-edit.component';
import { YeahDialogDeleteComponent } from './components/yeah-dialog-delete/yeah-dialog-delete.component';
import { YeahNotifyComponent } from './components/yeah-notify/yeah-notify.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    YeahUrlListComponent,
    YeahUrlListSearchComponent,
    YeahUrlListItemComponent,
    YeahUrlListTagComponent,
    YeahDialogComponent,
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
    YeahDialogComponent,
    YeahDialogImportComponent,
    YeahDialogEditComponent,
    YeahDialogDeleteComponent,
    YeahNotifyComponent,
    CommonModule
  ]
})
export class SharedModule { }