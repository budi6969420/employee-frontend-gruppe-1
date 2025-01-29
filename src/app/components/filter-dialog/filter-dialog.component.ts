import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Qualification } from "../../Qualification";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  templateUrl: './filter-dialog.component.html',
  imports: [NgForOf],
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {
  @Input() qualifications: Qualification[] = [];
  @Output() filterChange = new EventEmitter<Qualification[]>();

  selectedQualifications: Qualification[] = [];
  sortedQualifications: Qualification[] = [];

  ngOnInit() {
    this.sortQualifications();
  }

  sortQualifications() {
    const selected = this.selectedQualifications.sort((a, b) => a.skill.localeCompare(b.skill)); // Sorting by skill
    const notSelected = this.qualifications
      .filter(q => !this.selectedQualifications.includes(q))
      .sort((a, b) => a.skill.localeCompare(b.skill)); // Sorting by skill

    this.sortedQualifications = [...selected, ...notSelected];
  }

  toggleCheckbox(qualification: Qualification) {
    const index = this.selectedQualifications.indexOf(qualification);
    if (index > -1) {
      this.selectedQualifications.splice(index, 1);
    } else {
      this.selectedQualifications.push(qualification);
    }
    this.sortQualifications();
    this.filterChange.emit(this.selectedQualifications);
  }
}
