import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekViewHeaderComponent } from './week-view-header.component';

describe('WeekViewHeaderComponent', () => {
  let component: WeekViewHeaderComponent;
  let fixture: ComponentFixture<WeekViewHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekViewHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekViewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
