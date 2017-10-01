import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeahDialogDeleteComponent } from './yeah-dialog-delete.component';

describe('YeahDialogDeleteComponent', () => {
  let component: YeahDialogDeleteComponent;
  let fixture: ComponentFixture<YeahDialogDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeahDialogDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeahDialogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
