import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeahDialogImportComponent } from './yeah-dialog-import.component';

describe('YeahDialogImportComponent', () => {
  let component: YeahDialogImportComponent;
  let fixture: ComponentFixture<YeahDialogImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeahDialogImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeahDialogImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
