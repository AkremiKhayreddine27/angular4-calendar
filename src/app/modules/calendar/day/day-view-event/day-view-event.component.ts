import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { DayViewEvent } from '../../utils/day/DayViewEvent';

@Component({
  selector: 'app-day-view-event',
  templateUrl: './day-view-event.component.html',
  styleUrls: ['./day-view-event.component.css']
})
export class DayViewEventComponent {

  @Input() dayEvent: DayViewEvent;

  @Input() tooltipPlacement: string;

  @Input() tooltipAppendToBody: boolean;

  @Input() customTemplate: TemplateRef<any>;

  @Input() eventTitleTemplate: TemplateRef<any>;

  @Input() tooltipTemplate: TemplateRef<any>;

  @Output() eventClicked: EventEmitter<any> = new EventEmitter();

}
