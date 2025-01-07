// Angular imports
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Feature components
import { HomeComponent } from "./features/home/home.component";
import { LoginComponent } from "./features/login/login.component";
import { RegistrationComponent } from "./features/registration/registration.component";

// Guards
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  // Public routes
  { path: "login", component: LoginComponent },
  { path: "register", component: RegistrationComponent },

  // Protected route with AuthGuard
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },

  // Redirects
  { path: "", redirectTo: "/login", pathMatch: "full" }, // Redirect to login page if no route is specified
  { path: "**", redirectTo: "/login" }, // Redirect any unknown route to login page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
