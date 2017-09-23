import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeahUrlListComponent } from './yeah-url-list.component';

describe('YeahUrlListComponent', () => {
  let component: YeahUrlListComponent;
  let fixture: ComponentFixture<YeahUrlListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeahUrlListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeahUrlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
