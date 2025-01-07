// Angular imports
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

// Core services
import { AuthService } from "./auth.service";
import { CustomSetService } from "./customSet.service";

// Guards and interceptors
import { AuthGuard } from "../guards/auth.guard";
import { TokenInterceptor } from "../interceptors/token.interceptor";

@NgModule({
  providers: [
    // Core services
    AuthService,
    CustomSetService,

    // Guards and interceptors
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
})
export class CoreModule {}
