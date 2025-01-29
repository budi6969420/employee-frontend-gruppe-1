import {Component, inject, OnInit} from '@angular/core';
import {EmployeeInformationComponent} from "../../components/employee-information/employee-information.component";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../Employee";
import {NgIf} from "@angular/common";
import {
  QualificationSelectionTableComponent
} from "../../components/qualification-selection-table/qualification-selection-table.component";
import {Qualification} from "../../Qualification";

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

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) {
    this.route.params
      .pipe(map((params) => params['id']))
      .subscribe((id) => {
        this.employeeId = Number(id);
        console.log('Employee ID:', this.employeeId);
      });
    this.selectedQualifications = [];
  }

  ngOnInit(): void {
    if (this.employeeId) {
      this.employeeService.getEmployee(this.employeeId).subscribe({
        next: (e) => {
          this.employee = e;
          console.log('Employee loaded:', e);
        }
        // add err wenn 404 dann Fehler Meldung + go Home!
      });
    }
  }

  onSelectedQualificationChange($event: any[]): void {
    this.selectedQualifications = $event;
  }
}
