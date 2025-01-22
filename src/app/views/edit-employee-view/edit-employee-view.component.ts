import {Component, inject, OnInit} from '@angular/core';
import {EmployeeInformationComponent} from "../../components/employee-information/employee-information.component";
import {
  TableWithEditableAndDeleteableComponentsComponent
} from "../../components/table-with-editable-and-deleteable-components/table-with-editable-and-deleteable-components.component";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../Employee";

@Component({
  selector: 'app-edit-employee-view',
  standalone: true,
  imports: [
    EmployeeInformationComponent,
    TableWithEditableAndDeleteableComponentsComponent
  ],
  templateUrl: './edit-employee-view.component.html',
  styleUrl: './edit-employee-view.component.css'
})
export class EditEmployeeViewComponent implements OnInit {
  employeeId: number | undefined;
  employee: Employee | undefined;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) {
    this.route.params
      .pipe(map((params) => params['id']))
      .subscribe((id) => {
        this.employeeId = Number(id);
        console.log('Employee ID:', this.employeeId);
      });
  }

  ngOnInit(): void {
    if (this.employeeId) {
      this.employeeService.getEmployee(this.employeeId).subscribe(e =>  { this.employee = e; console.log(e); });
      // add err wenn 404 dann Fehler Meldung + go Home!
    }

  }
}
