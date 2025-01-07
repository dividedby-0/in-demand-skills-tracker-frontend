import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgForm } from "@angular/forms";
import { CustomSetService } from "../../../core/customSet.service";

@Component({
  selector: "app-add-skill-dialog",
  templateUrl: "./add-skill-dialog.component.html",
  styleUrl: "./add-skill-dialog.component.css",
})
export class AddSkillDialogComponent implements OnInit {
  @Output() addSkillDialogClosed = new EventEmitter<void>();

  constructor(
    private dialogRef: MatDialogRef<AddSkillDialogComponent>,
    private customSetService: CustomSetService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogRef.afterClosed().subscribe(() => {
      this.addSkillDialogClosed.emit();
    });
  }

  ngOnInit(): void {}

  addSkill(skillForm: NgForm) {
    if (skillForm.valid) {
      const formData = skillForm.value;
      const customSetId = this.data.set._id;

      formData.votes = 1;

      this.customSetService.addSkill(customSetId, formData).subscribe({
        next: (response) => {
          console.log("Skill added successfully:", response);
          this.dialogRef.close();
        },
        error: (error) => {
          console.error("Error adding skill:", error);
        },
      });

      console.log("Adding skill:", formData.name);
      this.dialogRef.close(formData);
    }
  }
}
