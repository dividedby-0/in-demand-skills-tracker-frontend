import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// Angular Material imports
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";

import { RegistrationComponent } from "./registration.component";
import {LogoComponent} from "../../shared/logo/logo.component";

@NgModule({
  declarations: [RegistrationComponent],
    imports: [
        CommonModule,
        FormsModule,
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
export class RegistrationModule {}
