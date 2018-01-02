import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import * as dateFns from 'date-fns';
import moment from 'moment/src/moment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

const HOURS_IN_DAY = 48;

const colors = [
  '#f4511e',
  '#0b8043',
  '#039be5',
  '#d50000',
  '#8e24aa',
  '#010101'
];

@Component({
  selector: 'app-dialog-add-event',
  templateUrl: './dialog-add-event.component.html',
  styleUrls: ['./dialog-add-event.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class DialogAddEventComponent implements OnInit {


  form: FormGroup;
  hours: string[] = [];
  colors = colors;

  constructor(
    public dialogRef: MatDialogRef<DialogAddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
   let startHour = dateFns.startOfDay(new Date());
   for (let i = 0; i < HOURS_IN_DAY; i++) {
    this.hours.push(moment(startHour).format('HH:mm'));
    startHour = dateFns.addMinutes(startHour, 30);
   }
    this.form = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(2)]],
      startTime: [moment(startHour).format('HH:mm'), Validators.required],
      endTime: [moment(startHour).format('HH:mm'), Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      color: ['#8e24aa', Validators.required],
      allDay: [false]
    });
  }

  setColor (color: string) {
    this.form.patchValue({color: color});
  }

  submit(form: any) {
    if (this.form.valid) {
      this.dialogRef.close({form: this.form});
    }
  }

  cancel () {
    this.dialogRef.close();
  }

  allDayChanged (checked: boolean) {
      const startDate: Date = this.form.value.startDate;
      const endDate: Date = this.form.value.endDate;
      if (checked && dateFns.isSameDay(startDate, endDate)) {
        this.form.patchValue({endTime: this.hours[this.hours.length - 1]});
      }
  }

  dateEndChanged ($event: any) {
    const startDate: Date = this.form.value.startDate;
    if ($event.value.diff(startDate, 'day') >= 1 || !$event.value.isSame(startDate, 'day')) {
      this.form.patchValue({allDay: true});
    } else {
      this.form.patchValue({allDay: false});
    }
  }

}
