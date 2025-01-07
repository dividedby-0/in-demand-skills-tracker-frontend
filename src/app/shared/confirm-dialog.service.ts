import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}

  confirm(title: string, message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "300px",
      data: { title, message },
    });

    return dialogRef.afterClosed();
  }
}
