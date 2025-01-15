import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {LoginViewComponent} from "../views/login-view/login-view.component";
import {TokenService} from "../services/token.service";
import {EmployeeService} from "../services/employee.service";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, LoginViewComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees$: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService) {
    this.employees$ = of([]);
  }

  ngOnInit(): void {
        this.employees$ = this.employeeService.getEmployees();
  }
}
