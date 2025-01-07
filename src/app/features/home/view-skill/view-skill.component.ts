import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CustomSetService } from "../../../core/customSet.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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
    private customSetService: CustomSetService
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
    this.customSetService.updateVotes(skill, this.data.setId).subscribe({
      next: (response) => {
        console.log("Skill votes updated successfully:", response);
        // this.dialogRef.close();
      },
      error: (error) => {
        console.error("Error updating skill votes:", error);
      },
    });
  }

  decreaseSkillVotes(): void {
    let skill = this.data.skill;
    if (!skill.skillId) {
      skill.skillId = skill._id; // needed to avoid ambiguity in backend
      delete skill._id;
    }
    skill.votes--;
    this.customSetService.updateVotes(skill, this.data.setId).subscribe({
      next: (response) => {
        console.log("Skill votes updated successfully:", response);
        // this.dialogRef.close();
      },
      error: (error) => {
        console.error("Error updating skill votes:", error);
      },
    });
  }

  addNewTag() {
    const newTagValue = this.tagForm.get("newTag")?.value;
    if (newTagValue) {
      this.data.skill.tags.push(newTagValue);

      this.customSetService
        .updateSkillTags(
          this.data.setId,
          this.data.skill._id,
          this.data.skill.tags
        )
        .subscribe({
          next: (response) => {
            console.log("Tag added successfully:", response);
            this.tagForm.reset();
          },
          error: (error) => {
            console.error("Error adding tag:", error);
          },
        });
    }
  }

  deleteTag(tag: string) {
    this.data.skill.tags = this.data.skill.tags.filter(
      (t: string) => t !== tag
    );
    this.customSetService
      .updateSkillTags(
        this.data.setId,
        this.data.skill._id,
        this.data.skill.tags
      )
      .subscribe({
        next: (response) => {
          console.log("Tag deleted successfully:", response);
          this.tagForm.reset();
        },
        error: (error) => {
          console.error("Error deleting tag:", error);
        },
      });
  }
}
