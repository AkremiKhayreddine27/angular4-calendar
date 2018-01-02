import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-show-day-events',
  templateUrl: './dialog-show-day-events.component.html',
  styleUrls: ['./dialog-show-day-events.component.css']
})
export class DialogShowDayEventsComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogShowDayEventsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
