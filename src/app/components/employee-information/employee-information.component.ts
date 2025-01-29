import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Input() data?: Employee;

  ngOnInit(): void {
    console.log(this.data);
    if(this.data)
      this.employee = this.data;
   else
      this.employee = new Employee();
  }

  onSubmit(form: NgForm, event: Event) {
    event.stopPropagation();

    if (form.valid) {
      this.submit.emit(this.employee);
    } else {
      alert('Please fill all the required fields.');
      return; // Vorgang abbrechen
    }
  }
}
