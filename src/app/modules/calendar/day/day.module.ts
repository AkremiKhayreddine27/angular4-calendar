import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResizableModule } from 'angular-resizable-element';
import { DragAndDropModule } from 'angular-draggable-droppable';

import { DayViewComponent } from './day-view/day-view.component';
import { DayViewAllDayEventComponent } from './day-view-all-day-event/day-view-all-day-event.component';
import { DayViewEventComponent } from './day-view-event/day-view-event.component';
import { DayViewHourSegmentComponent } from './day-view-hour-segment/day-view-hour-segment.component';
import { EventActionComponent } from './../components/event-action/event-action.component';
import { EventTitleComponent } from './../components/event-title/event-title.component';

@NgModule({
  imports: [
    CommonModule,
    ResizableModule,
    DragAndDropModule
  ],
  declarations: [
    DayViewComponent,
    DayViewAllDayEventComponent,
    DayViewEventComponent,
    DayViewHourSegmentComponent,
    EventActionComponent,
    EventTitleComponent
  ],
  exports: [
    DayViewComponent,
  ]
})
export class DayModule { }
