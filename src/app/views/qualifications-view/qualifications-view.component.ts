import {Component, OnInit} from '@angular/core';
import {
  TableWithEditableAndDeleteableComponentsComponent
} from "../../components/table-with-editable-and-deleteable-components/table-with-editable-and-deleteable-components.component";
import {QualificationService} from "../../services/qualification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-qualifications-view',
  standalone: true,
  imports: [
    TableWithEditableAndDeleteableComponentsComponent
  ],
  templateUrl: './qualifications-view.component.html',
  styleUrl: './qualifications-view.component.css'
})
export class QualificationsViewComponent implements OnInit {

  constructor(protected qualificationService: QualificationService, private router: Router) {
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  ngOnInit(): void {
        this.qualificationService.loadQualifications();
    }

  protected onDelete(qualificationId: number) : void {
    this.qualificationService.removeQualification(qualificationId);
  }

  protected onAdd() : void {
    this.router.navigate(['qualification', 'create']);
  }

}
