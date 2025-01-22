import {Component, OnInit} from '@angular/core';
import {
  TableWithEditableAndDeleteableComponentsComponent
} from "../table-with-editable-and-deleteable-components/table-with-editable-and-deleteable-components.component";
import {QualificationService} from "../../services/qualification.service";
import {EmployeeService} from "../../services/employee.service";
import {Router} from "@angular/router";
import {Qualification} from "../../Qualification";
import {
  QualificationSelectionMenuComponent
} from "../qualification-selection-menu/qualification-selection-menu.component";

@Component({
  selector: 'app-qualification-selection-table',
  standalone: true,
  imports: [
    TableWithEditableAndDeleteableComponentsComponent,
    QualificationSelectionMenuComponent
  ],
  templateUrl: './qualification-selection-table.component.html',
  styleUrl: './qualification-selection-table.component.css'
})
export class QualificationSelectionTableComponent implements OnInit {
  protected qualifications: Qualification[];
  protected selectedQualifications: Qualification[];
  isPopupVisible: boolean = false;

  constructor(private qualificationService: QualificationService,
              private router: Router) {
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.qualifications = [];
    this.selectedQualifications = [];
  }

  ngOnInit(): void {
    this.qualificationService.getQualifications().subscribe(q => {
      this.qualifications = q.map(x => new Qualification(x.id, x.skill));
      console.log(this.qualifications);
    });

  }

  openPopup(): void {
    this.isPopupVisible = true
  }

  onPopupVisibilityChange(isVisible: boolean): void {
    this.isPopupVisible = isVisible;
  }

  protected onDelete(qualificationId: number) : void {
    this.qualificationService.removeQualification(qualificationId);
  }

  protected onEdit(qualificationId: number) : void {
    this.router.navigate(['qualification', 'edit', String(qualificationId)]);
  }

  protected onAdd() : void {
    this.openPopup();
  }
}
