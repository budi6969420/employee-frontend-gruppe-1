import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {
  CreateQualificationViewComponent
} from "../../views/create-qualification-view/create-qualification-view.component";
import {QualificationService} from "../../services/qualification.service";
import {Qualification} from "../../Qualification";

@Component({
  selector: 'app-qualification-selection-menu',
  standalone: true,
  imports: [
    NgIf,
    CreateQualificationViewComponent,
    NgClass
  ],
  templateUrl: './qualification-selection-menu.component.html',
  styleUrl: './qualification-selection-menu.component.css'
})
export class QualificationSelectionMenuComponent implements OnInit{

  @Input() initiallySelectedQualifications: Qualification[] = [];
  @Output() onSelectedQualificationsChanged = new EventEmitter<Qualification[]>();
  @Output() onIsVisibleChanged = new EventEmitter<boolean>();

  protected qualifications: Qualification[] = [];
  private currentlySelectedQualifications: Qualification[] = [];
  isNewQualificationViewVisible: boolean = false;

  constructor(private qualificationService: QualificationService) {
    this.onQualificationCreated = this.onQualificationCreated.bind(this);
  }

  ngOnInit(): void {
    this.qualificationService.getQualifications().subscribe((qualifications) => {
      qualifications = qualifications.map(x => new Qualification(x.id, x.skill))
      this.qualifications = qualifications;
      this.currentlySelectedQualifications = [...this.initiallySelectedQualifications];
      this.sortQualification();
    })
  }

  // ngOnChanges(changes: SimpleChanges){
  //   if (changes['selectedQualificationsList']) {
  //     this.currentlySelectedQualifications = [...this.initiallySelectedQualifications];
  //   }
  // }

  isSelected(qualification: any): boolean {
    return this.currentlySelectedQualifications.some((q) => q.id === qualification.id);
  }

  toggleSelection(qualification: any): void {
    if (this.isSelected(qualification)) {
      this.currentlySelectedQualifications = this.currentlySelectedQualifications.filter((q) => q.id !== qualification.id);
    } else {
      this.currentlySelectedQualifications.push(qualification);
    }
    this.sortQualification();
  }

  confirmSelection(): void {
    this.onSelectedQualificationsChanged.emit(this.currentlySelectedQualifications);
    this.closeMenu();
  }

  onCancel(): void {
    this.currentlySelectedQualifications = [...this.initiallySelectedQualifications];
    this.closeMenu();
  }

  private closeMenu() {
    this.onIsVisibleChanged.emit(false);
  }

  onQualificationCreated(qualification : Qualification) {
    this.isNewQualificationViewVisible = false;
    qualification = new Qualification(qualification.id, qualification.skill)
    this.qualifications.push(qualification);
    this.currentlySelectedQualifications.push(qualification);
    this.sortQualification();
  }

  sortQualification(): void {
    const selectedIds = new Set(this.currentlySelectedQualifications.map(item => item.id));
    this.qualifications = this.qualifications.sort((a, b) => {
      const isASelected = selectedIds.has(a.id);
      const isBSelected = selectedIds.has(b.id);

      if (isASelected && !isBSelected) {
        return -1; // a kommt vor b
      }
      if (!isASelected && isBSelected) {
        return 1; // b kommt vor a
      }
      // Wenn beide im gleichen "Status" sind, alphabetisch sortieren
      return a.name.localeCompare(b.name);
    });
  }

  toggleNewQualificationViewVisibility() {
    this.isNewQualificationViewVisible = !this.isNewQualificationViewVisible;
  }
}
