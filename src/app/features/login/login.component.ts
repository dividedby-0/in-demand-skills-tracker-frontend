import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../core/auth.service";
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

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

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login(): void {
    const username: string | null = this.usernameFormControl.value;
    const password: string | null = this.passwordFormControl.value;

    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log(response); // Handle successful login response
        this.router.navigate(["/home"]);
      },
      error: (error) => {
        this.loginError = error.error.message; // Set login error message
        console.error(error); // Log error
      },
    });
  }
}
