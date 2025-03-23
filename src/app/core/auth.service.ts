import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

import {environment} from "../../../environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private endpoint = "auth";
  private baseUrl = `${environment.apiUrl}/${this.endpoint}`;
  private tokenKey = "authToken";

  constructor(private http: HttpClient) {
    console.log(environment.apiUrl);
  }

  login(username: string | null, password: string | null): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {username, password}).pipe(
      tap((response: any) => {
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
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
