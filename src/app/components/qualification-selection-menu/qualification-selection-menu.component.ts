import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {
  CreateQualificationViewComponent
} from "../../views/create-qualification-view/create-qualification-view.component";
import {QualificationService} from "../../services/qualification.service";

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

  @Input() isVisible: boolean = false;
  @Input() qualifications: any[] = [];
  @Output() selectedQualifications = new EventEmitter<any[]>();
  @Output() isVisibleChange = new EventEmitter<boolean>();

  @Input() selectedQualificationsList: any[] = [];
  private selected: any[] = [];
  protected isNewQualificationVisible: boolean = false;

  constructor(private qualificationService: QualificationService,) {
  }

  ngOnInit(): void {
    this.sortQualification();
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes['selectedQualificationsList']) {
      this.selected = [...this.selectedQualificationsList];
    }
  }

  isSelected(qualification: any): boolean {
    return this.selected.some((q) => q.id === qualification.id);
  }

  toggleSelection(qualification: any): void {
    if (this.isSelected(qualification)) {
      this.selected = this.selected.filter((q) => q.id !== qualification.id);
    } else {
      this.selected.push(qualification);
    }
    this.sortQualification();
  }

  confirmSelection(): void {
    this.selectedQualifications.emit(this.selected);
    this.isVisibleChange.emit(false);
  }

  closePopup(): void {
    this.selected = [...this.selectedQualificationsList];
    this.isNewQualificationVisible = false;
    this.isVisibleChange.emit(false);
  }

  toggleNewQualification(): void {
    this.isNewQualificationVisible = !this.isNewQualificationVisible;
  }

  onQualificationCreated() {
    alert('yo');
    console.log("Qualification created");
    this.isNewQualificationVisible = false;
    this.qualificationService.getQualifications().subscribe(x => x);
  }

  sortQualification(): void {
    const selectedIds = new Set(this.selected.map(item => item.id));
    const sortedItems = this.qualifications.sort((a, b) => {
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
}
