import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddEventComponent } from './dialog-add-event.component';

describe('DialogAddEventComponent', () => {
  let component: DialogAddEventComponent;
  let fixture: ComponentFixture<DialogAddEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
