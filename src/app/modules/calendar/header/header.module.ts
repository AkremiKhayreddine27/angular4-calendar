import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';

import { CalendarNextViewDirective } from '../directives/calendar-next-view.directive';
import { CalendarPreviousViewDirective } from '../directives/calendar-previous.view.directive';
import { CalendarTodayDirective } from '../directives/calendar-today.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CalendarHeaderComponent,
    CalendarNextViewDirective,
    CalendarPreviousViewDirective,
    CalendarTodayDirective
  ],
  exports: [
    CalendarHeaderComponent,
    CalendarNextViewDirective,
    CalendarPreviousViewDirective,
    CalendarTodayDirective
  ]
})
export class HeaderModule { }
