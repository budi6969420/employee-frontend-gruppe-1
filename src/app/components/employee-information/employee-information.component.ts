import { Component } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-employee-information',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './employee-information.component.html',
  styleUrl: './employee-information.component.css'
})
export class EmployeeInformationComponent {

  onSubmit(myForm: NgForm) {

  }
}
