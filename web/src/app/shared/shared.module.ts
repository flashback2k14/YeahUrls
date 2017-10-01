import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { YeahUrlListComponent } from './components/yeah-url-list/yeah-url-list.component';
import { YeahUrlListSearchComponent } from './components/yeah-url-list-search/yeah-url-list-search.component';
import { YeahUrlListItemComponent } from './components/yeah-url-list-item/yeah-url-list-item.component';
import { YeahUrlListTagComponent } from './components/yeah-url-list-tag/yeah-url-list-tag.component';
import { YeahDialogComponent } from './components/yeah-dialog/yeah-dialog.component';
import { YeahDialogImportComponent } from './components/yeah-dialog-import/yeah-dialog-import.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    YeahUrlListComponent,
    YeahUrlListSearchComponent,
    YeahUrlListItemComponent,
    YeahUrlListTagComponent,
    YeahDialogComponent,
    YeahDialogImportComponent
  ],
  exports: [
    YeahUrlListComponent,
    YeahUrlListSearchComponent,
    YeahUrlListItemComponent,
    YeahUrlListTagComponent,
    YeahDialogComponent,
    YeahDialogImportComponent,
    CommonModule
  ]
})
export class SharedModule { }