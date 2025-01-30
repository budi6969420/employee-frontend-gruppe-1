import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from '../Employee';
import { TokenService } from "./token.service";
import {EmployeeGetDto} from "../dtos/EmployeeGetDto";

@Injectable({
  providedIn: 'root',
})
export class EmployeeService{
  public employees: Employee[] = [];

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getEmployees(): Observable<Employee[]> {
    const token = this.tokenService.getTokenFromMemory();

    if (!token) {
      return of([]);
    }

    return this.http
      .get<EmployeeGetDto[]>('https://api.employee.budidev.de/employees', {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        map((dtos) =>
          dtos.map((dto) =>
            new Employee(
              dto?.id,
              dto?.lastName,
              dto?.firstName,
              dto?.street,
              dto?.postcode,
              dto?.city,
              dto?.phone,
              dto?.skillSet
                ? dto.skillSet
                  .filter((x) => x.id != null)
                  .map((x) => x.id!)
                  .filter((id): id is number => id !== undefined)
                : []
            )
          )
        ),
        catchError((error) => {
          console.error('Error fetching employee', error);
          return of([]);
        })
      );

  }

  getEmployeeDto(id: number): Observable<EmployeeGetDto | undefined>{
    const token = this.tokenService.getTokenFromMemory();

    if (!token) {
      return of(undefined);
    }

    return this.http
      .get<EmployeeGetDto>(`https://api.employee.budidev.de/employees/${id}`, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        catchError((error) => {
          console.error('Error fetching employee', error);
          return of(undefined);
        })
      );
  }
  getEmployee(id: number): Observable<Employee | undefined> {
    return this.getEmployeeDto(id).pipe(map((dto) =>
      new Employee(
        dto?.id,
        dto?.lastName,
        dto?.firstName,
        dto?.street,
        dto?.postcode,
        dto?.city,
        dto?.phone,
        dto?.skillSet ? dto.skillSet.filter(x => x.id != null).map(x => x.id!).filter((id): id is number => id !== undefined) : []
      )));
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
