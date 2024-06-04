import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

interface ResultButton {
  text: string;
  result: boolean;
}

export interface DialogData {
  title: string;
  description: string;
  buttons: ResultButton[];
}

@Component({
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmation.dialog.html',
})
export class ConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if (!data) {
      this.data = {
        title: 'No title',
        description: 'No description',
        buttons: [],
      };
    }
  }

  get buttons() {
    return this.data.buttons;
  }
}
