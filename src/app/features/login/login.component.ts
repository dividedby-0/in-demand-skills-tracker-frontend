import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../core/auth.service";
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";
import {SnackbarService} from "../../shared/snackbar.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  loginError: string = "";

  // validators
  usernameFormControl = new FormControl("", [Validators.required]);
  passwordFormControl = new FormControl("", [Validators.required]);

  constructor(private authService: AuthService, private router: Router, private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.snackbarService.showSnackbar("Logging in...");
    const username: string | null = this.usernameFormControl.value;
    const password: string | null = this.passwordFormControl.value;

    this.authService.login(username, password).subscribe({
      next: (response) => {
        this.router.navigate(["/home"]);
      },
      error: (error) => {
        this.snackbarService.showSnackbar(error.error.message, 'Close');
      },
      complete: () => {
        this.snackbarService.hideSnackbar();
        this.snackbarService.showSnackbar("Login successful.", 'Close');
      },
    });
  }
}
