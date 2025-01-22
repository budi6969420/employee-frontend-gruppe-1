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
  QualificationSelectionMenuComponent
} from "../../components/qualification-selection-menu/qualification-selection-menu.component";

@Component({
  selector: 'app-create-employee-view',
  standalone: true,
  imports: [
    EmployeeInformationComponent,
    TableWithEditableAndDeleteableComponentsComponent,
    QualificationSelectionMenuComponent
  ],
  templateUrl: './create-employee-view.component.html',
  styleUrl: './create-employee-view.component.css'
})
export class CreateEmployeeViewComponent implements OnInit {
  qualifications: Qualification[];
  selectedQualifications: Qualification[];
  isPopupVisible: boolean = false;

  constructor(private qualificationService: QualificationService,
              private employeeService: EmployeeService,
              private router: Router) {
    this.qualifications = [];
    this.selectedQualifications = [];
  }

  ngOnInit(): void {
    this.qualificationService.loadQualifications();
    this.qualifications = this.qualificationService.qualifications;
  }

  openPopup(): void {
    this.isPopupVisible = true
  }


}
