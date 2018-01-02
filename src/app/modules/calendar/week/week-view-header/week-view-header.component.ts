import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { CalendarEvent } from './../../utils/CalendarEvent';
import { WeekDay } from '../../utils/week-day';
@Component({
  selector: 'app-week-view-header',
  templateUrl: './week-view-header.component.html',
  styleUrls: ['./week-view-header.component.css']
})
export class WeekViewHeaderComponent {

  @Input() days: WeekDay[];

  @Input() allDayEvents;

  @Input() locale: string;

  @Input() customTemplate: TemplateRef<any>;

  /**
   * Called when the event title is clicked
  */
  @Output()
  eventClicked: EventEmitter<{ event: CalendarEvent }> = new EventEmitter<{
    event: CalendarEvent;
  }>();

  @Output()
  dayHeaderClicked: EventEmitter<{ day: WeekDay }> = new EventEmitter<{
    day: WeekDay;
  }>();

  @Output()
  eventDropped: EventEmitter<{
      event: CalendarEvent;
      newStart: Date;
    }> = new EventEmitter<{ event: CalendarEvent; newStart: Date }>();

}
