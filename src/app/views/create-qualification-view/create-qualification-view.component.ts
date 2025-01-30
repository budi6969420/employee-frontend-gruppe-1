import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QualificationService} from "../../services/qualification.service";
import {FormsModule, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {ErrorService} from "../../services/error.service";
import {Qualification} from "../../Qualification";

@Component({
  selector: 'app-create-qualification-view',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './create-qualification-view.component.html',
  styleUrl: './create-qualification-view.component.css'
})
export class CreateQualificationViewComponent {
  @Input() onCreate: (qual: Qualification) => void;
  qualificationName: string = '';
  constructor(private qualificationService: QualificationService, private router: Router, private errorService: ErrorService) {
    this.onCreate = () => this.router.navigate(['/qualifications']);
  }


  protected createQualification(form: NgForm) {
    if (this.qualificationName.trim() === '') return;

    this.qualificationService.createQualification(this.qualificationName).subscribe({
      next: (qual) => {
        if (qual) {
          this.onCreate(qual);
          this.qualificationName = '';
          form.resetForm(); // ✅ Reset form & clear validation errors
        }
      },
      error: (err) => {
        this.errorService.setError(`Qualification creation failed: qualification with the same name already exists`);
      }
    });
  }
}
