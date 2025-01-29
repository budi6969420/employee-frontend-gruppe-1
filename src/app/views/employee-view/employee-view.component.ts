import {Component, OnInit} from '@angular/core';
import {
  TableWithEditableAndDeleteableComponentsComponent
} from "../../components/table-with-editable-and-deleteable-components/table-with-editable-and-deleteable-components.component";
import {EmployeeService} from "../../services/employee.service";
import {Router} from "@angular/router";
import {FilterDialogComponent} from "../../components/filter-dialog/filter-dialog.component";
import {Qualification} from "../../Qualification";
import {Employee} from "../../Employee";
import {NgIf} from "@angular/common";
import {QualificationService} from "../../services/qualification.service";

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [
    TableWithEditableAndDeleteableComponentsComponent,
    FilterDialogComponent,
    NgIf
  ],
  templateUrl: './employee-view.component.html',
  styleUrl: './employee-view.component.css'
})
export class EmployeeViewComponent implements OnInit {
  protected employeeService: EmployeeService;
  private router: Router;
  protected filterDialogVisible: boolean = false;
  protected selectedQualifications: Qualification[] = [];
  protected filteredData: Employee[] = [];
  protected qualificationService: QualificationService;

  constructor(employeeService: EmployeeService, qualificationService: QualificationService, router: Router) {
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
    this.employeeService.removeEmployee(employeeId);
  }

  protected onAdd(): void {
    this.router.navigate(['employee', 'create']);
  }

  onFilterChange(selectedFilters: Qualification[]) {
    this.selectedQualifications = selectedFilters;
    this.applyFilter();
  }

  applyFilter() {
    if (this.selectedQualifications.length > 0) {
      this.filteredData = this.employeeService.employees.filter((member) =>
        this.selectedQualifications.some((qualification) =>
          member.skillSet === qualification.id
        )
      );
    } else {
      this.filteredData = [...this.employeeService.employees];
    }
  }

  toggleFilterDialog(event: Event) {
    event.preventDefault();
    this.filterDialogVisible = !this.filterDialogVisible;
  }

  removeFiltering(event: Event) {
    event.preventDefault();
    this.selectedQualifications = [];
    this.applyFilter();
    this.filterDialogVisible = false;
  }
}
