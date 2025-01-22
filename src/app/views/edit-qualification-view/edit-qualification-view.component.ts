import { Component } from '@angular/core';
import { QualificationService } from "../../services/qualification.service";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgIf } from "@angular/common";
import { ErrorService } from "../../services/error.service";
import { map } from 'rxjs';
import { Qualification } from '../../Qualification';

@Component({
  selector: 'app-edit-qualification-view',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './edit-qualification-view.component.html',
  styleUrls: ['./edit-qualification-view.component.css']
})
export class EditQualificationViewComponent {

  qualification: Qualification;
  isLoading = true;

  constructor(private route: ActivatedRoute, private qualificationService: QualificationService, private router: Router, private errorService: ErrorService) {
    this.qualification = new Qualification(undefined, '');
    this.route.params
      .pipe(map((params) => params['id']))
      .subscribe((id) => {
        this.qualificationService.getQualification(Number(id)).subscribe((qualification) => {
          if (!qualification) {
            this.router.navigate(['/qualifications']);
            return;
          }
          this.qualification = qualification;
          this.isLoading = false;
        });
      });
  }

  protected editQualification() {
    if (!this.qualification || this.qualification.skill === '' || !this.qualification.id) return;
    this.qualificationService.updateQualification(this.qualification.id, this.qualification.skill).subscribe({
      next: () => {
        this.router.navigate(['/qualifications']);
      },
      error: (err) => {
        this.errorService.setError("qualification edit failed: qualification name already exists");
      }
    });
  }
}