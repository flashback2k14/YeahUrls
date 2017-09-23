import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeahUrlListSearchComponent } from './yeah-url-list-search.component';

describe('YeahUrlListSearchComponent', () => {
  let component: YeahUrlListSearchComponent;
  let fixture: ComponentFixture<YeahUrlListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeahUrlListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeahUrlListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
