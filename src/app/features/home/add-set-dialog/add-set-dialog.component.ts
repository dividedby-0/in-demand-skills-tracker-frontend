import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgForm } from "@angular/forms";
import { CustomSetService } from "../../../core/customSet.service";

@Component({
  selector: "app-add-set-dialog",
  templateUrl: "./add-set-dialog.component.html",
  styleUrl: "./add-set-dialog.component.css",
})
export class AddCustomSetDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddCustomSetDialogComponent>,
    private customSetService: CustomSetService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  addCustomSet(setForm: NgForm): void {
    if (setForm.valid) {
      const formData = setForm.value;

      this.customSetService.addCustomSet(formData).subscribe({
        next: (response) => {
          console.log("Set added successfully:", response);
          this.dialogRef.close();
        },
        error: (error) => {
          console.error("Error adding set:", error);
        },
      });

      console.log("Adding set:", formData.name);
      this.dialogRef.close(formData);
    }
  }
}
