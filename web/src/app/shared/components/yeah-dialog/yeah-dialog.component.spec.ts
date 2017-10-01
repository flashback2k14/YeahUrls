import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeahDialogComponent } from './yeah-dialog.component';

describe('YeahDialogComponent', () => {
  let component: YeahDialogComponent;
  let fixture: ComponentFixture<YeahDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeahDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeahDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
