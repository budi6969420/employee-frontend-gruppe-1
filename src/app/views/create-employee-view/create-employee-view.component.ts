import {Component} from '@angular/core';
import {EmployeeInformationComponent} from "../../components/employee-information/employee-information.component";
import {Qualification} from "../../Qualification";
import {QualificationService} from "../../services/qualification.service";
import {Router} from "@angular/router";
import {EmployeeService} from "../../services/employee.service";
import {
  QualificationSelectionTableComponent
} from "../../components/qualification-selection-table/qualification-selection-table.component";
import {Employee} from "../../Employee";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-create-employee-view',
  standalone: true,
  imports: [
    EmployeeInformationComponent,
    QualificationSelectionTableComponent,
  ],
  templateUrl: './create-employee-view.component.html',
  styleUrl: './create-employee-view.component.css'
})
export class CreateEmployeeViewComponent {
  qualifications: Qualification[];
  selectedQualifications: Qualification[];

  constructor(private qualificationService: QualificationService,
              private employeeService: EmployeeService,
              private router: Router,
              private errorService: ErrorService) {
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.qualifications = [];
    this.selectedQualifications = [];
  }


  protected onDelete(qualificationId: number) : void {
    this.qualificationService.removeQualification(qualificationId);
  }

  protected onEdit(qualificationId: number) : void {
    this.router.navigate(['qualification', 'edit', String(qualificationId)]);
  }

  protected onAdd() : void {
    this.router.navigate(['qualification', 'create']);
  }

  onAddFunction() {
    this.router.navigate(['qualification', 'create']);
  }

  onSelectedQualificationChange($event: any[]): void {
    this.selectedQualifications = $event;
  }

  onInformationSubmit($event: Employee): void {
    let employee = new Employee(undefined, $event.lastName, $event.firstName, 'Mulberry Street', $event.postcode, $event.city, $event.phone, this.selectedQualifications.map(x => x.id).filter(x => x != undefined))

    this.employeeService.createEmployee(employee).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.errorService.setError("employee creation failed: " + err.message);
      }
    });
  }

}
