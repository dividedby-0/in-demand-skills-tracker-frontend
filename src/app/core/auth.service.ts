// Angular imports
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

// RxJS imports
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = "http://localhost:3000/api/auth";
  private tokenKey = "authToken";

  constructor(private http: HttpClient) {
  }

  login(username: string | null, password: string | null): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {username, password}).pipe(
      // Store the token in localStorage after a successful login
      tap((response: any) => {
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey); // Remove the token from LocalStorage
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, {
      username,
      email,
      password,
    });
  }
}
