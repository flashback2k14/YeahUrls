import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeahDialogEditComponent } from './yeah-dialog-edit.component';

describe('YeahDialogEditComponent', () => {
  let component: YeahDialogEditComponent;
  let fixture: ComponentFixture<YeahDialogEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeahDialogEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeahDialogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
