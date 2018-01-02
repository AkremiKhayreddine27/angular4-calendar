import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { CalendarEvent } from './../../utils/CalendarEvent';

@Component({
  selector: 'app-event-title',
  templateUrl: './event-title.component.html',
  styleUrls: ['./event-title.component.css']
})
export class EventTitleComponent implements OnInit {

  @Input() event: CalendarEvent;

  @Input() customTemplate: TemplateRef<any>;

  @Input() view: string;

  constructor() { }

  ngOnInit() {
  }

}
