import {Component, OnInit} from '@angular/core';
import {
  TableWithEditableAndDeleteableComponentsComponent
} from "../../components/table-with-editable-and-deleteable-components/table-with-editable-and-deleteable-components.component";
import {EmployeeService} from "../../services/employee.service";
import {Router} from "@angular/router";
import {ErrorService} from "../../services/error.service";
import {Employee} from "../../Employee";
import {QualificationService} from "../../services/qualification.service";
import {FilterComponent} from "../../components/filter/filter.component";

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [
    TableWithEditableAndDeleteableComponentsComponent,
    FilterComponent
  ],
  templateUrl: './employee-view.component.html',
  styleUrl: './employee-view.component.css'
})
export class EmployeeViewComponent implements OnInit {
  protected employeeService: EmployeeService;
  private router: Router;
  protected filterDialogVisible: boolean = false;
  protected filteredData: Employee[] = [];
  protected qualificationService: QualificationService;

  constructor(employeeService: EmployeeService, private errorService: ErrorService, qualificationService: QualificationService, router: Router) {
    this.employeeService = employeeService;
    this.qualificationService = qualificationService;
    this.router = router;

    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.filteredData = employees.map((employee: Employee) => new Employee(employee.id,
        employee.lastName,
        employee.firstName,
        employee.street,
        employee.postcode,
        employee.city,
        employee.phone,
        employee.skillSet));
    });
    this.qualificationService.loadQualifications();
  }

  protected onEdit(employeeId: number): void {
    this.router.navigate(['employee', 'edit', employeeId]);
  }

  protected onDelete(employeeId: number): void {
    this.employeeService.removeEmployee(employeeId).subscribe({
      next: () => {
        this.filteredData = this.filteredData.filter(employee => employee.id !== employeeId);
      },
      error: (err) => {
        this.errorService.setError("employee creation failed: " + err.message);
      }
    });
  }

  protected onAdd(): void {
    this.router.navigate(['employee', 'create']);
  }

  onFilteredDataChanged(filteredData: Employee[]) {
    this.filteredData = filteredData;
  }

  searchFilterFunction(employee: Employee, term: string): Boolean {
    return employee.lastName!.toLowerCase().includes(term.toLowerCase()) ||
      employee.firstName!.toLowerCase().includes(term.toLowerCase()) ||
      employee.name!.toLowerCase().includes(term.toLowerCase()) ||
      (employee.firstName! + " " + employee.lastName!).toLowerCase().includes(term.toLowerCase()) ||
      (employee.lastName! + " " + employee.firstName!).toLowerCase().includes(term.toLowerCase());
  }
}
