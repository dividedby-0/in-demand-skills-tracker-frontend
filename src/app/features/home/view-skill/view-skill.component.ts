import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomSetService} from "../../../core/customSet.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SnackbarService} from "../../../shared/snackbar.service";
import {ConfirmDialogService} from "../../../shared/confirm-dialog.service";

@Component({
  selector: "app-view-skill",
  templateUrl: "./view-skill.component.html",
  styleUrl: "./view-skill.component.css",
})
export class ViewSkillComponent {
  tagForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ViewSkillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customSetService: CustomSetService,
    private snackbarService: SnackbarService,
    private confirmDialogService: ConfirmDialogService
  ) {
    this.tagForm = this.fb.group({
      newTag: ["", Validators.required],
    });
  }

  increaseSkillVotes(): void {
    let skill = this.data.skill;
    if (!skill.skillId) {
      skill.skillId = skill._id; // needed to avoid ambiguity in backend
      delete skill._id;
    }
    skill.votes++;
    this.customSetService.updateVotes(this.data.setId, skill.skillId, skill.votes).subscribe({
      next: (response) => {
        // this.dialogRef.close();
      },
      error: (error) => {
        this.snackbarService.showSnackbar(error.error.message, 'Close');
      },
    });
  }

  decreaseSkillVotes(): void {
    let skill = this.data.skill;
    if (!skill.skillId) {
      skill.skillId = skill._id; // needed to avoid ambiguity in backend
      delete skill._id;
    }

    if (skill.votes === 1) {
      this.snackbarService.showSnackbar("Mentions cannot be less than 1. Delete skill instead", 'Close');
      return;
    }

    skill.votes--;
    this.customSetService.updateVotes(this.data.setId, skill.skillId, skill.votes).subscribe({
      next: (response) => {
        // this.dialogRef.close();
      },
      error: (error) => {
        this.snackbarService.showSnackbar(error.error.message, 'Close');
      },
    });
  }

  deleteSkill(): void {
    this.confirmDialogService.confirm('Confirm Delete', 'Are you sure you want to delete this skill?').subscribe((result) => {
      if (result) {
        this.customSetService
          .deleteSkill(this.data.setId, this.data.skill.skillId || this.data.skill._id)
          .subscribe({
            next: (response) => {
              this.dialogRef.close();
            },
            error: (error) => {
              this.snackbarService.showSnackbar(error.error.message, 'Close');
            },
          });
      }
    });
  }

  addNewTag() {
    const newTagValue = this.tagForm.get("newTag")?.value;
    if (newTagValue) {
      this.customSetService
        .addSkillTag(
          this.data.setId,
          this.data.skill._id,
          newTagValue
        )
        .subscribe({
          next: (response) => {
            this.tagForm.reset();
          },
          error: (error) => {
            this.snackbarService.showSnackbar(error.error.message, 'Close');
          },
          complete: () => {
            this.data.skill.tags.push(newTagValue);
          }
        });
    }
  }

  deleteTag(tag: string) {
    this.customSetService
      .removeSkillTag(this.data.setId, this.data.skill._id, tag)
      .subscribe({
        next: (response) => {
          this.tagForm.reset();
        },
        error: (error) => {
          this.snackbarService.showSnackbar(error.error.message, 'Close');
        },
        complete: () => {
          this.data.skill.tags.splice(this.data.skill.tags.indexOf(tag), 1);
          this.snackbarService.showSnackbar("Tag deleted successfully.", 'Close');
        }
      });
  }
}
