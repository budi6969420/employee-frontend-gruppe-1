import { Component } from '@angular/core';
import {QualificationService} from "../../services/qualification.service";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-qualification-view',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './create-qualification-view.component.html',
  styleUrl: './create-qualification-view.component.css'
})
export class CreateQualificationViewComponent {

  qualificationName: string = '';
  constructor(private qualificationService: QualificationService, private router: Router) {
  }

  protected createQualification() {
    if (this.qualificationName === '') return;
    this.qualificationService.createQualification(this.qualificationName).subscribe({
      next: () => {
        this.router.navigate(['/qualifications']);
      },
      error: (err) => {
        console.error('Error creating qualification:', err);
      }
    });
  }
}
