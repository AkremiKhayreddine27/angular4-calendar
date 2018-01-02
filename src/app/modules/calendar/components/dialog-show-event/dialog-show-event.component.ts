import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-show-event',
  templateUrl: './dialog-show-event.component.html',
  styleUrls: ['./dialog-show-event.component.css']
})
export class DialogShowEventComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogShowEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
