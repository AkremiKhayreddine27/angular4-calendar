import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthViewComponent } from './month-view/month-view.component';
import { MonthCellComponent } from './month-cell/month-cell.component';
import { MonthViewHeaderComponent } from './month-view-header/month-view-header.component';
import { OpenDayEventsComponent } from './open-day-events/open-day-events.component';

import { ResizableModule } from 'angular-resizable-element';
import { DragAndDropModule } from 'angular-draggable-droppable';

@NgModule({
  imports: [
    CommonModule,
    ResizableModule,
    DragAndDropModule
  ],
  declarations: [
    MonthViewComponent,
    MonthCellComponent,
    MonthViewHeaderComponent,
    OpenDayEventsComponent
  ],
  exports: [
    MonthViewComponent
  ]
})
export class MonthModule { }
