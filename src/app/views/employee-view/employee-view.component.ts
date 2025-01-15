import { Component } from '@angular/core';
import {
  TableWithEditableAndDeleteableComponentsComponent
} from "../../components/table-with-editable-and-deleteable-components/table-with-editable-and-deleteable-components.component";
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../Employee";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [
    TableWithEditableAndDeleteableComponentsComponent
  ],
  templateUrl: './employee-view.component.html',
  styleUrl: './employee-view.component.css'
})
export class EmployeeViewComponent {

  constructor(private employeeService: EmployeeService, private router: Router) {
  }

  protected onEdit(employeeId: number): void {
    this.router.navigate(['employee', 'edit', employeeId]);
  }

  protected onDelete(employeeId: number) : void {
    this.employeeService.removeEmployee(employeeId).subscribe({
      next: ()=> {
      }
    });
  }

  protected onAdd() : void {
    this.router.navigate(['employee', 'create']);
  }

}
