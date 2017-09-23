import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeahUrlListItemComponent } from './yeah-url-list-item.component';

describe('YeahUrlListItemComponent', () => {
  let component: YeahUrlListItemComponent;
  let fixture: ComponentFixture<YeahUrlListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeahUrlListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeahUrlListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
