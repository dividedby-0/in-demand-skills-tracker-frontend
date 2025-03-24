import {Component, OnInit, Inject} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NgForm} from "@angular/forms";
import {CustomSetService} from "../../../core/customSet.service";
import {SnackbarService} from "../../../shared/snackbar.service";

@Component({
  selector: "app-add-set-dialog",
  templateUrl: "./add-set-dialog.component.html",
  styleUrl: "./add-set-dialog.component.css",
})
export class AddCustomSetDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddCustomSetDialogComponent>,
    private customSetService: CustomSetService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbarService: SnackbarService
  ) {
  }

  ngOnInit(): void {
  }

  addCustomSet(setForm: NgForm): void {
    if (setForm.valid) {
      this.snackbarService.showSnackbar("Adding set...", 'Close');
      const formData = setForm.value;

      this.customSetService.addCustomSet(formData).subscribe({
        next: (response) => {
          this.dialogRef.close();
        },
        error: (error) => {
          this.snackbarService.showSnackbar(error.error.message, 'Close');
        },
        complete: () => {
          this.snackbarService.hideSnackbar();
          this.snackbarService.showSnackbar("Set added successfully.", 'Close');
        }
      });

      this.dialogRef.close(formData);
    }
  }
}
