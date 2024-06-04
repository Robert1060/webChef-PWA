import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  attemptToBlockUser,
  blockUser,
  submtiEditUserState,
} from './user.actions';
import { filter, map, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmationDialogComponent,
  DialogData,
} from '../../componnts/dialog/confirmation.dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { notNull } from '../../componnts/helpers/helpers';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  attemptToBlockUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(attemptToBlockUser),
      switchMap((a) => {
        const ref = this.dialog.open<ConfirmationDialogComponent, DialogData>(
          ConfirmationDialogComponent,
          {
            restoreFocus: false,
            data: {
              title: 'Warning',
              description: 'Are you sure you want to block this account?',
              buttons: [
                {
                  text: 'Cancel',
                  result: false,
                },
                {
                  text: 'Yes',
                  result: true,
                },
              ],
            },
          }
        );
        return ref.afterClosed().pipe(
          map((res: boolean) => {
            if (res) return blockUser({ id: a.id });
            return null;
          }),
          filter(notNull)
        );
      })
    )
  );

  blockUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(blockUser),
        map(({ id }) => {
          // some http call to block user
        })
      ),
    { dispatch: false }
  );

  triggerSnackbarOnUserEditStateSave$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(submtiEditUserState),
        tap(() => this.snackbar.open('User saved', 'Close', { duration: 5000 }))
      ),
    { dispatch: false }
  );
}
