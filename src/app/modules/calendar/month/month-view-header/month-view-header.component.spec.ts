import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthViewHeaderComponent } from './month-view-header.component';

describe('MonthViewHeaderComponent', () => {
  let component: MonthViewHeaderComponent;
  let fixture: ComponentFixture<MonthViewHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthViewHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthViewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
