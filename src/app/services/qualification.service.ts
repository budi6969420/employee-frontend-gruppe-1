import {Injectable, OnInit} from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
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
      });
  }

  getQualification(id: number): Observable<Qualification | undefined> {
    return this.getQualifications().pipe(
      map(qualifications => qualifications.find(q => q.id === id))
    );
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

  createQualification(qualificationName: string) : Observable<Qualification | undefined> {
    const token = this.tokenService.getTokenFromMemory();

    if (!token) {
      return of(undefined);
    }

    const body = {
      skill: qualificationName,
    };

    return this.http
      .post<Qualification>('https://api.employee.budidev.de/qualifications',
        body,
        {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`),
      });
  }

  updateQualification(qualificationId: number, newSkill: string): Observable<Qualification | undefined> {
    const token = this.tokenService.getTokenFromMemory();

    if (!token) {
      return of(undefined);
    }

    const body = {
      skill: newSkill,
    };

    return this.http
      .put<Qualification>(`https://api.employee.budidev.de/qualifications/${qualificationId}`, body, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        catchError((error) => {
          console.error('Error updating qualification', error);
          return of(undefined);
        })
      );
  }

}
