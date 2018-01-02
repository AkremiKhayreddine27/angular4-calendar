import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthCellComponent } from './month-cell.component';

describe('MonthCellComponent', () => {
  let component: MonthCellComponent;
  let fixture: ComponentFixture<MonthCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
