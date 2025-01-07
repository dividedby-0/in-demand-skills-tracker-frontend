import { Injectable } from "@angular/core";
import { Router, CanActivateFn } from "@angular/router";
import { AuthService } from "../core/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = () => {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  };
}
