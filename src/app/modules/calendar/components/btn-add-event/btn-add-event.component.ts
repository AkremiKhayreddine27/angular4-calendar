import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogAddEventComponent } from '../dialog-add-event/dialog-add-event.component';

@Component({
  selector: 'app-btn-add-event',
  templateUrl: './btn-add-event.component.html',
  styleUrls: ['./btn-add-event.component.css']
})
export class BtnAddEventComponent implements OnInit {


  @Output()
  newEvent: EventEmitter<{ form: FormGroup }> = new EventEmitter<{
    form: FormGroup
  }>();
  constructor(
    public dialog: MatDialog) { }

  ngOnInit() {

  }

  btnClicked() {
    const dialogRef = this.dialog.open(DialogAddEventComponent, {
      width: '60%',
      position: {top: '100px'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newEvent.emit({ form: result });
      }
    });
  }
}
