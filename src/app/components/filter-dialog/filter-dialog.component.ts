import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Qualification} from "../../Qualification";

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  templateUrl: './filter-dialog.component.html',
  imports: [NgForOf],
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {
  @Input() qualifications: Qualification[] = [];
  @Input() selectedQualifications: Qualification[] = [];
  @Output() filterChange = new EventEmitter<Qualification[]>();

  sortedQualifications: Qualification[] = [];

  ngOnInit() {
    this.sortQualifications();
  }

  sortQualifications() {
    const selected = this.selectedQualifications.sort((a, b) => a.skill.localeCompare(b.skill));
    const notSelected = this.qualifications
      .filter(q => !this.selectedQualifications.includes(q))
      .sort((a, b) => a.skill.localeCompare(b.skill));

    this.sortedQualifications = [...selected, ...notSelected];
  }

  toggleCheckbox(qualification: Qualification) {
    const index = this.selectedQualifications.findIndex(q => q.id === qualification.id);
    if (index > -1) {
      this.selectedQualifications.splice(index, 1);
    } else {
      this.selectedQualifications.push(qualification);
    }
    this.sortQualifications();
    this.filterChange.emit([...this.selectedQualifications]);
  }
}
