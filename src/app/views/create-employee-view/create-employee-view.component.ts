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
  newEmployee: Employee;

  constructor(private qualificationService: QualificationService,
              private employeeService: EmployeeService,
              private router: Router) {
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.qualifications = [];
    this.selectedQualifications = [];
    this.newEmployee = new Employee();
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
    this.newEmployee.skillSet = $event.map(skill => skill.id);
    console.log('quali ' + this.newEmployee);
  }

  onInformationSubmit($event: Employee): void {
    this.newEmployee = $event;
    console.log('info ');
    console.log(this.newEmployee);
  }

}
