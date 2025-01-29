import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FilterDialogComponent } from "../filter-dialog/filter-dialog.component";
import { NgIf } from "@angular/common";
import { Qualification } from "../../Qualification";
import { Employee } from "../../Employee";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    FilterDialogComponent,
    NgIf
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Input() filterDialogVisible: boolean = false;
  @Input() qualifications: Qualification[] = [];
  @Input() data: Employee[] = [];
  @Output() protected filteredData: EventEmitter<Employee[]> = new EventEmitter<Employee[]>();
  protected selectedQualifications: Qualification[] = [];

  onFilterChange(selectedFilters: Qualification[]) {
    this.selectedQualifications = selectedFilters;
    this.applyFilter();
  }

  applyFilter() {
    let resultData: Employee[] = [];

    if (this.selectedQualifications.length > 0) {
      resultData = this.data.filter((member) =>
        this.selectedQualifications.some((qualification) =>
          member.skillSet === qualification.id
        )
      );
    } else {
      resultData = [...this.data];
    }

    this.filteredData.emit(resultData);
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
