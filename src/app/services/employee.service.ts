import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Employee } from '../Employee'; 
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements OnInit {
  public employees: Employee[] = [];

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    const token = this.tokenService.getTokenFromMemory();

    if (!token) {
      this.employees = [];
      return;
    }

    this.getEmployees().subscribe((employees) => {
      this.employees = employees.map((employee: Employee) => new Employee(employee.id,
        employee.lastName,
        employee.firstName,
        employee.street,
        employee.postcode,
        employee.city,
        employee.phone,
        employee.skillSet));
    });
  }

  getEmployees(): Observable<Employee[]> {
    const token = this.tokenService.getTokenFromMemory();

    if (!token) {
      return of([]);
    }

    return this.http
      .get<Employee[]>('https://api.employee.budidev.de/employees', {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching employees', error);
          return of([]);
        })
      );
  }

  getQualification(id: number): Observable<Employee | undefined> {
    const token = this.tokenService.getTokenFromMemory();

    if (!token) {
      return of(undefined);
    }

    return this.http
      .get<Employee>(`https://api.employee.budidev.de/employees/${id}`, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching employees', error);
          return of(undefined);
        })
      );
  }

  createEmployee(employee: Employee): Observable<Employee | undefined>  {
    const token = this.tokenService.getTokenFromMemory();

    if (!token) {
      return of(undefined);
    }

    return this.http
      .post<Employee>('https://api.employee.budidev.de/employees', employee, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        catchError((error) => {
          console.error('Error creating employee', error);
          return of(undefined);
        })
      );
  }

  updateEmployee(employee: Employee): Observable<Employee | undefined> {
    const token = this.tokenService.getTokenFromMemory();

    if (!token) {
      return of(undefined);
    }

    return this.http
      .put<Employee>(`https://api.employee.budidev.de/employees/${employee.id}`, employee, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        catchError((error) => {
          console.error('Error updating employee', error);
          return of(undefined);
        })
      );
  }

  removeEmployee(employeeId: number): Observable<void> {
    const token = this.tokenService.getTokenFromMemory();

    if (!token) {
      return of(undefined);
    }

    return this.http
      .delete<void>(`https://api.employee.budidev.de/employees/${employeeId}`, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        catchError((error) => {
          console.error('Error deleting employee', error);
          return of(undefined);
        })
      );
  }
}