import {ChangeDetectionStrategy, Component, HostListener, Inject,} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cancelText: string;
      confirmText: string;
      message: string;
      title: string;
    },
    private mdDialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {
  }

  public cancel() {
    this.close(false);
  }

  public close(value) {
    this.mdDialogRef.close(value);
  }

  // tslint:disable-next-line:typedef
  public confirm() {
    this.close(true);
  }

  @HostListener('keydown.esc')
  // tslint:disable-next-line:typedef
  public onEsc() {
    this.close(false);
  }

  @HostListener('keydown.enter')
  // tslint:disable-next-line:typedef
  public onEnter() {
    this.close(true);
  }
}
