import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeahUrlListTagComponent } from './yeah-url-list-tag.component';

describe('YeahUrlListTagComponent', () => {
  let component: YeahUrlListTagComponent;
  let fixture: ComponentFixture<YeahUrlListTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeahUrlListTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeahUrlListTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
