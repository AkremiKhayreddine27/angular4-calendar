import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DraggableHelper } from 'angular-draggable-droppable';

import { DayModule } from './day/day.module';
import { MonthModule } from './month/month.module';
import { WeekModule } from './week/week.module';
import { HeaderModule } from './header/header.module';

import {
   MatDialogModule,
   MatDatepickerModule,
   MatFormFieldModule,
   MatInputModule,
   MatAutocompleteModule,
   MatCheckboxModule
  } from '@angular/material';
  import { MatMomentDateModule } from '@angular/material-moment-adapter';


import { CalendarUtilsService } from './utils/calendar-utils.service';
import { BtnAddEventComponent } from './components/btn-add-event/btn-add-event.component';
import { DialogAddEventComponent } from './components/dialog-add-event/dialog-add-event.component';
import { DialogShowEventComponent } from './components/dialog-show-event/dialog-show-event.component';
import { DialogShowDayEventsComponent } from './components/dialog-show-day-events/dialog-show-day-events.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DayModule,
    MonthModule,
    WeekModule,
    HeaderModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatCheckboxModule
  ],
  exports: [
    DayModule,
    MonthModule,
    WeekModule,
    HeaderModule,
    BtnAddEventComponent,
    DialogAddEventComponent
  ],
  declarations: [
    BtnAddEventComponent,
    DialogAddEventComponent,
    DialogShowEventComponent,
    DialogShowDayEventsComponent
  ],
  entryComponents: [
    DialogAddEventComponent,
    DialogShowEventComponent,
    DialogShowDayEventsComponent
  ]

})
export class CalendarModule {
  static forRoot(config = {}): ModuleWithProviders {
    return {
      ngModule: CalendarModule,
      providers: [
        DraggableHelper,
        CalendarUtilsService
      ]
    };
  }
}
