import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/auth.service";
import { Router } from "@angular/router";
import {SnackbarService} from "../../shared/snackbar.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent implements OnInit {
  newUsername: string = "";
  newEmail: string = "";
  newPassword: string = "";
  registrationError: string = "";

  constructor(private authService: AuthService, private router: Router, private snackbarService: SnackbarService) {}

  ngOnInit(): void {}

  register(): void {
    this.snackbarService.showSnackbar("Registering...");
    this.authService
      .register(this.newUsername, this.newEmail, this.newPassword)
      .subscribe({
        next: (response) => {
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          this.snackbarService.showSnackbar(error.error.message, 'Close');
        },
        complete: () => {
          this.snackbarService.hideSnackbar();
          this.snackbarService.showSnackbar("Registration successful. Please log in.", 'Close');
        },
      });
  }
}
