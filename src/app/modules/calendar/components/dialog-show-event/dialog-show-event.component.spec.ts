import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowEventComponent } from './dialog-show-event.component';

describe('DialogShowEventComponent', () => {
  let component: DialogShowEventComponent;
  let fixture: ComponentFixture<DialogShowEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogShowEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShowEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
