import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-dialog',
  templateUrl: 'booking-dialog.component.html',
    
})
export class BookingDialogComponent {
  constructor(private dialogRef: MatDialogRef<BookingDialogComponent>) {}

  

  closeDialog(): void {
    this.dialogRef.close();
  }
}

