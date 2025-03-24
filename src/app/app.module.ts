// Angular Core Modules
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

// Angular HTTP Modules
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// Angular Material Modules
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

// Routing Module
import { AppRoutingModule } from "./app-routing.module";

// Components
import { AppComponent } from "./app.component";

// Shared Components
import { ConfirmDialogComponent } from "./shared/confirm-dialog/confirm-dialog.component";
import { ConfirmDialogService } from "./shared/confirm-dialog.service";

// HTTP Interceptor
import { TokenInterceptor } from "./interceptors/token.interceptor";

// Feature Modules
import { CoreModule } from "./core/core.module";
import { HomeModule } from "./features/home/home.module";
import { LoginModule } from "./features/login/login.module";
import { RegistrationModule } from "./features/registration/registration.module";
import { LogoComponent } from './shared/logo/logo.component';

@NgModule({
  declarations: [AppComponent, ConfirmDialogComponent],
  imports: [
    // Angular modules
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // Angular Material modules
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatAutocompleteModule,

    // Feature modules
    RegistrationModule,
    LoginModule,
    HomeModule,
    CoreModule,
    LogoComponent,

    // Routing module
    AppRoutingModule,
  ],
  providers: [
    ConfirmDialogService,
    // HTTP Interceptor
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
