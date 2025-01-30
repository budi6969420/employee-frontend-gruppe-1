import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Input() qualificationIdsOfEmployee?: Qualification[];
  @Output() onSelectedQualificationsChanged = new EventEmitter<Qualification[]>();
  protected qualifications: Qualification[];
  protected selectedQualifications: Qualification[];
  isPopupVisible: boolean = false;

  constructor(private qualificationService: QualificationService,
              private router: Router) {
    this.onDelete = this.onDelete.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.qualifications = [];
    this.selectedQualifications = [];
  }

  ngOnInit(): void {
    this.qualificationService.getQualifications().subscribe(q => {
      this.qualifications = q.map(x => new Qualification(x.id, x.skill));
      if (this.qualificationIdsOfEmployee) {
        this.selectedQualifications = this.qualifications.filter(q => {
          return q.id !== undefined && this.qualificationIdsOfEmployee?.map(x => x.id)?.includes(q.id);
        });
      }
    });
  }

  protected openPopup(): void {
    this.isPopupVisible = true
  }

  onPopupVisibilityChange(isVisible: boolean): void {
    this.isPopupVisible = isVisible;
  }

  protected onDelete(qualificationId: number) : void {
    this.selectedQualifications = this.selectedQualifications.filter(sq => sq.id !== qualificationId)
  }

  protected onEdit(qualificationId: number) : void {
    this.router.navigate(['qualification', 'edit', String(qualificationId)]);
  }

  onSelectedQualificationsChange(qualifications: Qualification[]) {
    this.selectedQualifications = qualifications;
    this.onSelectedQualificationsChanged.emit(qualifications);
  }
}
