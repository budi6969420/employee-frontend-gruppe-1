import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Employee} from "../../Employee";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-employee-information',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './employee-information.component.html',
  styleUrl: './employee-information.component.css'
})
export class EmployeeInformationComponent implements OnInit {
  employee: Employee | undefined;

  @Output() submit = new EventEmitter<any>();

  ngOnInit(): void {
      this.employee = new Employee();
  }


  onSubmit(form: NgForm) {
    if (form.valid) {
      this.submit.emit(this.employee);
    } else {
      alert('Please fill all the required fields.');
    }
  }
}
