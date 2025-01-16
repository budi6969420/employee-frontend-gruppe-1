import {Injectable, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Qualification} from "../Qualification";
import {TokenService} from "./token.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QualificationService{

  public qualifications: Qualification[] = [];
  constructor(private tokenService: TokenService, private http: HttpClient) {
  }

  removeQualification(qualificationId: number) {
    const token = this.tokenService.getTokenFromMemory();

    if (!token) {
      return of(undefined);
    }

    return this.http
      .delete<void>(`https://api.employee.budidev.de/qualifications/${qualificationId}`, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`),
      }).subscribe({
        next: ()=> {
          this.qualifications = this.qualifications.filter(qualification => qualification.id !== qualificationId);
        }
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

  createQualification(qualificationName: string) {
    const token = this.tokenService.getTokenFromMemory();

    if (!token) {
      return of([]);
    }

    const body = {
      skill: qualificationName,
    };

    return this.http
      .post('https://api.employee.budidev.de/qualifications',
        body,
        {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`),
      });
  }
}
