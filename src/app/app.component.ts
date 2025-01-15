import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {CreateEmployeeViewComponent} from "./views/create-employee-view/create-employee-view.component";
import {EditEmployeeViewComponent} from "./views/edit-employee-view/edit-employee-view.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterOutlet, CreateEmployeeViewComponent, EditEmployeeViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Employee Management Website';
  isLoginPage: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === '/login';
      }
    });
  }
}
