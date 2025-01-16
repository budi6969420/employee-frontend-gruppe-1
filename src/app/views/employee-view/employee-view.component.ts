import {Component, OnInit} from '@angular/core';
import {
  TableWithEditableAndDeleteableComponentsComponent
} from "../../components/table-with-editable-and-deleteable-components/table-with-editable-and-deleteable-components.component";
import {EmployeeService} from "../../services/employee.service";
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
export class EmployeeViewComponent implements OnInit {
  protected employeeService: EmployeeService;
  private router: Router;

  constructor(employeeService: EmployeeService, router: Router) {
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
      next: ()=> {
      }
    });
  }

  protected onAdd() : void {
    this.router.navigate(['employee', 'create']);
  }

}
