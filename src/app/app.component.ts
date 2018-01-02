import { Component } from '@angular/core';
import * as dateFns from 'date-fns';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { DialogShowEventComponent } from './modules/calendar/components/dialog-show-event/dialog-show-event.component';
import { DialogShowDayEventsComponent } from './modules/calendar/components/dialog-show-day-events/dialog-show-day-events.component';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  viewDate = new Date();
  view = 'month';
  refresh: Subject<any> = new Subject();
  events = [
    {
      title: 'Lorem ipsum dolor sit amet',
      start: dateFns.setHours(dateFns.setMinutes(new Date(), 0), 22),
      end: dateFns.setHours(dateFns.setMinutes(new Date(), 0), 23),
      color: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
      },
      allDay: false
    },
    {
      title: 'event 2',
      start: dateFns.setHours(dateFns.setMinutes(new Date(), 0), 22),
      end: dateFns.addDays(dateFns.setHours(dateFns.setMinutes(new Date(), 0), 2), 1),
      color: {
        primary: '#d50000',
        secondary: '#D1E8FF'
      },
      allDay: false
    },
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      start: dateFns.addDays(dateFns.setHours(dateFns.setMinutes(new Date(), 0), 20), 1),
      end: dateFns.addDays(dateFns.setHours(dateFns.setMinutes(new Date(), 0), 20), 8),
      color: {
        primary: '#0b8043',
        secondary: '#D1E8FF'
      },
      allDay: true
    },
    {
      title: 'event 8',
      start: dateFns.addDays(dateFns.setHours(dateFns.setMinutes(new Date(), 0), 20), 1),
      end: dateFns.addDays(dateFns.setHours(dateFns.setMinutes(new Date(), 0), 22), 1),
      color: {
        primary: '#575962',
        secondary: '#D1E8FF'
      },
      allDay: false
    },
    {
      title: 'event 4',
      start: dateFns.addDays(dateFns.setHours(dateFns.setMinutes(new Date(), 0), 20), 2),
      end: dateFns.addDays(dateFns.setHours(dateFns.setMinutes(new Date(), 0), 20), 6),
      color: {
        primary: '#f4511e',
        secondary: '#D1E8FF'
      },
      allDay: true
    },
    {
      title: 'event 5',
      start: dateFns.addDays(dateFns.setHours(dateFns.setMinutes(new Date(), 0), 20), 2),
      end: dateFns.addDays(dateFns.setHours(dateFns.setMinutes(new Date(), 0), 20), 4),
      color: {
        primary: '#716aca',
        secondary: '#D1E8FF'
      },
      allDay: true
    }
  ];

  constructor(public dialog: MatDialog) {

  }

  dayClicked($event) {
    if ($event.day.events.length > 0) {
      const dialogRef = this.dialog.open(DialogShowDayEventsComponent, {
        width: '350px',
        data: {
          day: $event.day
        }
      });
    }
  }

  eventClicked($event) {
    const dialogRef = this.dialog.open(DialogShowEventComponent, {
      width: '350px',
      data: {
        event: $event.event
      }
    });
  }

  addEvent(form) {
    this.events.push({
      title: form.form.value.title,
      start: moment(form.form.value.startDate)
      .hours(moment(form.form.value.startTime, 'HH:mm').hours())
      .minutes(moment(form.form.value.startTime, 'HH:mm').minutes()).toDate(),
      end: moment(form.form.value.endDate)
      .hours(moment(form.form.value.endTime, 'HH:mm').hours())
      .minutes(moment(form.form.value.endTime, 'HH:mm').minutes()).toDate(),
      color: {
        primary: form.form.value.color,
        secondary: form.form.value.color
      },
      allDay: form.form.value.allDay
    });
    this.refresh.next();
  }

  import (events) {
    for (const k in events) {
      if (events.hasOwnProperty(k)) {
        const event = events[k];
        let allDay = false;
        if (dateFns.differenceInDays(event.end, event.start) > 1) {
          allDay = true;
        }
        let title;
        if (event.summary === '') {
          title = 'No Title';
        }else {
          title = event.summary;
        }
        this.events.push(    {
          title: title,
          start: event.start,
          end: event.end,
          color: {
            primary: '#716aca',
            secondary: '#D1E8FF'
          },
          allDay: allDay
        });
      }
    }
    this.refresh.next();
  }
}
