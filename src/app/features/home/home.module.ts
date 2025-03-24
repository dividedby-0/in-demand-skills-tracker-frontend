// Angular imports
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Angular Material imports
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatBadgeModule } from "@angular/material/badge";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";

// Component imports
import { HomeComponent } from "./home.component";
import { AddCustomSetDialogComponent } from "./add-set-dialog/add-set-dialog.component";
import { AddSkillDialogComponent } from "./add-skill-dialog/add-skill-dialog.component";
import { ViewSetComponent } from "./view-set/view-set.component";
import { ViewSkillComponent } from "./view-skill/view-skill.component";

// Animations
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Pipes
import { OrderByPipe } from "../../pipes/order-by.pipe";
import { FilterPipe } from "../../pipes/filter.pipe";
import {LogoComponent} from "../../shared/logo/logo.component";

@NgModule({
  declarations: [
    HomeComponent,
    AddCustomSetDialogComponent,
    AddSkillDialogComponent,
    ViewSetComponent,
    ViewSkillComponent,
    OrderByPipe,
    FilterPipe,
  ],
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
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatChipsModule,

    // Animations
    BrowserAnimationsModule,
    LogoComponent,
  ],
})
export class HomeModule {}
