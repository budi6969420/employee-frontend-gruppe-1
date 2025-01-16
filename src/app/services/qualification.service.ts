import {Injectable, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Qualification} from "../Qualification";
import {TokenService} from "./token.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QualificationService implements OnInit{

  public qualifications: Qualification[] = [];
  constructor(private tokenService: TokenService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadQualifications();
  }

  removeQualification(qualificationId: number): Observable<void> {
    const token = this.tokenService.getTokenFromMemory();

    if (!token) {
      return of(undefined);
    }

    return this.http
      .delete<void>(`https://api.employee.budidev.de/qualifications/${qualificationId}`, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`),
      });
  }

  loadQualifications(): void {
    const token = this.tokenService.getTokenFromMemory();

    if (!token) {
      this.qualifications = [];
      return;
    }

    this.getQualifications().subscribe((qualifications) => {
      this.qualifications = qualifications.map((qualification: Qualification) => new Qualification(
        qualification.id,
        qualification.skill
      ));
    });
  }

  getQualifications(): Observable<Qualification[]> {
    const token = this.tokenService.getTokenFromMemory();

    if (!token) {
      return of([]);
    }

    return this.http
      .get<Qualification[]>('https://api.employee.budidev.de/qualifications', {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`),
      });
  }
}
