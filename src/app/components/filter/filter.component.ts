import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
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
  @Input() inputtedData: Employee[] = [];
  data: Employee[] | undefined;
  @Output() protected filteredData: EventEmitter<Employee[]> = new EventEmitter<Employee[]>();
  protected selectedQualifications: Qualification[] = [];

  constructor(private elRef: ElementRef) {
  }

  onFilterChange(selectedQualifications: Qualification[]) {
    this.applyFilter();
  }

  applyFilter() {
    let resultData: Employee[];
    if (!this.data) this.data = [...this.inputtedData];

    if (this.selectedQualifications.length > 0) {
      resultData = this.data.filter((member) =>
        this.selectedQualifications.every((qualification) =>
          member.skillSet!.includes(qualification.id!)
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

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target) && this.filterDialogVisible) {
      this.toggleFilterDialog(event);
    }
  }
}
