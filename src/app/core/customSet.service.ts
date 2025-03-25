import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CustomSetService {
  private endpoint = 'custom-set';
  private apiUrl = `${environment.apiUrl}/${this.endpoint}`;

  constructor(private http: HttpClient) {
  }

  getCustomSets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSetById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  addCustomSet(set: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, set);
  }

  updateCustomSet(id: string, set: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, set);
  }

  deleteCustomSet(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  addSkill(customSetId: string, skill: any): Observable<any> {
    const url = `${this.apiUrl}/${customSetId}/add-skill`;
    return this.http.put<any>(url, skill);
  }

  deleteSkill(setId: string, skillId: string): Observable<any> {
    const url = `${this.apiUrl}/${setId}/remove-skill/${skillId}`;
    return this.http.delete<any>(url);
  }

  updateVotes(setId: string, skillId: string, votes: number): Observable<any> {
    const url = `${this.apiUrl}/${setId}/update-votes/${skillId}`;
    return this.http.put<any>(url, { votes });
  }

  addSkillTag(setId: string, skillId: string, tag: string): Observable<any> {
    const url = `${this.apiUrl}/${setId}/add-tag/${skillId}`;
    return this.http.post<any>(url, { tag });
  }

  removeSkillTag(setId: string, skillId: string, tag: string): Observable<any> {
    const url = `${this.apiUrl}/${setId}/remove-tag/${skillId}/${tag}`;
    return this.http.delete<any>(url);
  }
}
