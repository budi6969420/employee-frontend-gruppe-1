import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {FilterDialogComponent} from "../filter-dialog/filter-dialog.component";
import {NgIf} from "@angular/common";
import {Qualification} from "../../Qualification";
import {Employee} from "../../Employee";

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

  constructor(private elRef: ElementRef) {
  }

  onFilterChange(selectedQualifications: Qualification[]) {
    this.selectedQualifications = [...selectedQualifications];
    this.applyFilter();
  }

  applyFilter() {
    let resultData: Employee[];

    if (this.selectedQualifications.length > 0) {
      resultData = this.data.filter((member) =>
        this.selectedQualifications.some((qualification) =>
          member.skillSet?.includes(qualification.id!)
        )
      );
      // Todo: fix matching between skillSet and selectedQualifications
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

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target) && this.filterDialogVisible) {
      this.toggleFilterDialog(event);
    }
  }
}
