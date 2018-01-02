import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Component as IcsComponent, Property } from 'immutable-ics';
import { saveAs } from 'file-saver/FileSaver';
import ical from 'ical';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.css']
})
export class CalendarHeaderComponent implements OnInit {

  @Input() view: string;

  @Input() viewDate: Date;

  @Input() locale = 'fr';

  @Input() events: any[];

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  @Output()
  newImportedEvents: EventEmitter<{ events: any[] }> = new EventEmitter<{
    events: any[];
  }>();

  icsEvents =  [];

  constructor() { }

  ngOnInit() {
    this.icsEvents = this.events.map(event => {
      return new IcsComponent({
        name: 'VEVENT',
        properties: [
          new Property({
            name: 'DTSTART',
            value: event.start
          }),
          new Property({
            name: 'DTEND',
            value: event.end
          }),
          new Property({
            name: 'SUMMARY',
            value: event.title
          }),
        ]
      });
    });
  }

  export() {
    const calendar = new IcsComponent({
      name: 'VCALENDAR',
      properties: [
        new Property({ name: 'VERSION', value: 2 })
      ],
      components: this.icsEvents
    });
    const blob = new Blob([calendar.toString()], { type: 'text/plain' });
    saveAs(blob, 'calendar.ics');
  }

  import (event: any) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        reader.readAsText(file);
        reader.onload = () => {
          const data = ical.parseICS(reader.result);
          this.newImportedEvents.emit({events: data});
        };
      }
  }

}
