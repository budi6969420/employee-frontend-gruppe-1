import {Component, inject, OnInit} from '@angular/core';
import {EmployeeInformationComponent} from "../../components/employee-information/employee-information.component";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../Employee";
import {NgIf} from "@angular/common";
import {
  QualificationSelectionTableComponent
} from "../../components/qualification-selection-table/qualification-selection-table.component";
import {Qualification} from "../../Qualification";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-edit-employee-view',
  standalone: true,
  imports: [
    EmployeeInformationComponent,
    NgIf,
    QualificationSelectionTableComponent
  ],
  templateUrl: './edit-employee-view.component.html',
  styleUrl: './edit-employee-view.component.css'
})
export class EditEmployeeViewComponent implements OnInit {
  employeeId: number | undefined;
  employee: Employee | undefined;
  selectedQualifications: Qualification[];

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private errorService: ErrorService, private router: Router) {
    this.route.params
      .pipe(map((params) => params['id']))
      .subscribe((id) => {
        this.employeeId = Number(id);
      });
    this.selectedQualifications = [];
  }

  ngOnInit(): void {
    if (this.employeeId) {
      this.employeeService.getEmployeeDto(this.employeeId).subscribe({
        next: (e) => {
          if (e) {
            this.employee = new Employee(e.id, e.lastName, e.firstName, e.street, e.postcode, e.city, e.phone);
            this.selectedQualifications = e.skillSet;
          }
        },
        error: (err) => {
        if (err.status === 404) {
          this.errorService.setError("Employee not found!");
          this.router.navigate(['/employees']);
        } else {
          this.errorService.setError("An error occurred while loading the employee.");
        }
      }
      });
    }
  }

  onSelectedQualificationChange($event: any[]): void {
    this.selectedQualifications = $event;
  }

  onInformationSubmit($event: Employee) {
    let employee = new Employee(this.employeeId, $event.lastName, $event.firstName, $event.street, $event.postcode, $event.city, $event.phone, this.selectedQualifications.map(x => x.id).filter(x => x != undefined))

    this.employeeService.updateEmployee(employee).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.errorService.setError("employee edit failed: " + err.message);
      }
    });
  }
}
