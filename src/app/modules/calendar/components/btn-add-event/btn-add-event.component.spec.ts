import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAddEventComponent } from './btn-add-event.component';

describe('BtnAddEventComponent', () => {
  let component: BtnAddEventComponent;
  let fixture: ComponentFixture<BtnAddEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnAddEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnAddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
