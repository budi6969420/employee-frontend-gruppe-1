import {Component, OnInit} from '@angular/core';
import {
  TableWithEditableAndDeleteableComponentsComponent
} from "../../components/table-with-editable-and-deleteable-components/table-with-editable-and-deleteable-components.component";
import {EmployeeService} from "../../services/employee.service";
import {Router} from "@angular/router";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [
    TableWithEditableAndDeleteableComponentsComponent
  ],
  templateUrl: './employee-view.component.html',
  styleUrl: './employee-view.component.css'
})
export class EmployeeViewComponent implements OnInit {
  protected employeeService: EmployeeService;
  private router: Router;

  constructor(employeeService: EmployeeService, private errorService: ErrorService, router: Router) {
    this.employeeService = employeeService;
    this.router = router;

    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  ngOnInit(): void {
    this.employeeService.loadEmployees();
  }

  protected onEdit(employeeId: number): void {
    this.router.navigate(['employee', 'edit', employeeId]);
  }

  protected onDelete(employeeId: number) : void {
    this.employeeService.removeEmployee(employeeId).subscribe({
      next: () => {
        this.employeeService.employees = this.employeeService.employees.filter(employee => employee.id !== employeeId);
      },
      error: (err) => {
        this.errorService.setError("employee creation failed: " + err.message);
      }
    });
  }

  protected onAdd() : void {
    this.router.navigate(['employee', 'create']);
  }

}
