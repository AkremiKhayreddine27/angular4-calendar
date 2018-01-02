import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from '../../utils/CalendarEvent';

@Component({
  selector: 'app-event-action',
  templateUrl: './event-action.component.html',
  styleUrls: ['./event-action.component.css']
})
export class EventActionComponent implements OnInit {

  @Input() event: CalendarEvent;
  constructor() { }

  ngOnInit() {
  }

}
