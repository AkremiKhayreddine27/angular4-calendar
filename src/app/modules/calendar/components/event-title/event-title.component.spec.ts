import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTitleComponent } from './event-title.component';

describe('EventTitleComponent', () => {
  let component: EventTitleComponent;
  let fixture: ComponentFixture<EventTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
