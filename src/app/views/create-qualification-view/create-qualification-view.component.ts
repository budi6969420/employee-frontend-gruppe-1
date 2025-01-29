import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QualificationService} from "../../services/qualification.service";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {ErrorService} from "../../services/error.service";

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
export class CreateQualificationViewComponent implements OnInit {
  @Input() hasToRedirect: boolean = true;
  // @Output() qualificationCreated: EventEmitter<void> | undefined = undefined;
  qualificationName: string = '';
  constructor(private qualificationService: QualificationService, private router: Router, private errorService: ErrorService) {
  }

  ngOnInit() {
    // if (!this.hasToRedirect) {
    //   this.qualificationCreated = new EventEmitter<void>();
    // }
  }

  protected createQualification() {
    if (this.qualificationName === '') return;
    this.qualificationService.createQualification(this.qualificationName).subscribe({
      next: () => {
        if(this.hasToRedirect)
          this.router.navigate(['/qualifications']);
        else{
          // this.qualificationCreated?.emit();
          alert("create qualification");
        }
      },
      error: (err) => {
        this.errorService.setError("qualification creation failed: qualification name already exists");
      }
    });
  }
}
