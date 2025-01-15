import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Employee } from '../Employee';
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees: Employee[] = [];

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getEmployees(): Observable<Employee[]> {
    const token = this.tokenService.getTokenFromMemory();

    if (!token) {
      return of([]); // Return an empty array if there's no token
    }

    return this.http
      .get<Employee[]>('https://api.employee.budidev.de/employees', {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        switchMap((employees) => {
          this.employees = employees;
          return of(this.employees);
        }),
        catchError((error) => {
          console.error('Error fetching employees', error);
          return of([]);
        })
      );
  }

  getStoredEmployees(): Employee[] {
    return this.employees;
  }
}
