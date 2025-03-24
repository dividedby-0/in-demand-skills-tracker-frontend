import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/auth.service";
import { Router } from "@angular/router";

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register(): void {
    this.authService
      .register(this.newUsername, this.newEmail, this.newPassword)
      .subscribe({
        next: (response) => {
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          this.registrationError = error.error.message;
        },
      });
  }
}
