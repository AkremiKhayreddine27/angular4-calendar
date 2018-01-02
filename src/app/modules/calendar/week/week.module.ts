import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekViewComponent } from './week-view/week-view.component';
import { WeekViewHeaderComponent } from './week-view-header/week-view-header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WeekViewComponent,
    WeekViewHeaderComponent
  ],
  exports: [
    WeekViewComponent
  ]
})
export class WeekModule { }
