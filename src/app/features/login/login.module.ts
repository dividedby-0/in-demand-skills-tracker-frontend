import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Angular Material imports
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";

import { LoginComponent } from "./login.component";
import {LogoComponent} from "../../shared/logo/logo.component";

import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Angular Material modules
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    RouterModule,
    LogoComponent,
  ],
})
export class LoginModule {}
