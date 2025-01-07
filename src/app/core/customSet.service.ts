import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CustomSetService {
  private apiUrl = "https://in-demand-skills-tracker-backend-production.up.railway.app/api/custom-set";

  constructor(private http: HttpClient) {}

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

  updateVotes(skill: any, setId: string): Observable<any> {
    const url = `${this.apiUrl}/${setId}/update-votes`;
    return this.http.put<any>(url, skill);
  }

  // Used for both updating/deleting
  updateSkillTags(
    setId: string,
    skillId: string,
    tags: string[]
  ): Observable<any> {
    const url = `${this.apiUrl}/${setId}/update-skill-tags/${skillId}`;
    return this.http.put<any>(url, { tags });
  }
}
