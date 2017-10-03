import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeahNotifyComponent } from './yeah-notify.component';

describe('YeahNotifyComponent', () => {
  let component: YeahNotifyComponent;
  let fixture: ComponentFixture<YeahNotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeahNotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeahNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
