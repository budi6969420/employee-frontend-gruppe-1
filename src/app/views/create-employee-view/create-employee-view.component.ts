import {Component, OnInit} from '@angular/core';
import {EmployeeInformationComponent} from "../../components/employee-information/employee-information.component";
import {
  TableWithEditableAndDeleteableComponentsComponent
} from "../../components/table-with-editable-and-deleteable-components/table-with-editable-and-deleteable-components.component";
import {Qualification} from "../../Qualification";
import {QualificationService} from "../../services/qualification.service";
import {Router} from "@angular/router";
import {EmployeeService} from "../../services/employee.service";
import {
  QualificationSelectionTableComponent
} from "../../components/qualification-selection-table/qualification-selection-table.component";

@Component({
  selector: 'app-create-employee-view',
  standalone: true,
  imports: [
    EmployeeInformationComponent,
    TableWithEditableAndDeleteableComponentsComponent,
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
              private router: Router) {
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

}
