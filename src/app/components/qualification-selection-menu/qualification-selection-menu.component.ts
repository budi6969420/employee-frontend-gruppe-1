import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-qualification-selection-menu',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './qualification-selection-menu.component.html',
  styleUrl: './qualification-selection-menu.component.css'
})
export class QualificationSelectionMenuComponent {


  @Input() isVisible: boolean = false; // Steuert die Sichtbarkeit des Popups
  @Input() qualifications: any[] = []; // Liste von Qualifikationen
  @Output() selectedQualifications = new EventEmitter<any[]>(); // Gibt die ausgewählten Qualifikationen zurück
  @Output() isVisibleChange = new EventEmitter<boolean>(); // Gibt die Sichtbarkeitsänderung zurück

  @Input() selectedQualificationsList: any[] = [];
  private selected: any[] = []; // Interne Liste der ausgewählten Qualifikationen

  ngOnChanges(changes: SimpleChanges){
    if (changes['selectedQualificationsList']) {
      this.selected = [...this.selectedQualificationsList]; // Parent Selektion übernehmen
    }
  }

  isSelected(qualification: any): boolean {
    return this.selected.some((q) => q.id === qualification.id); // Prüft, ob die Qualifikation ausgewählt ist
  }

  toggleSelection(qualification: any): void {
    if (this.isSelected(qualification)) {
      this.selected = this.selected.filter((q) => q.id !== qualification.id); // Entferne aus der Auswahl
    } else {
      this.selected.push(qualification); // Füge zur Auswahl hinzu
    }
    this.sortQualification();
  }

  confirmSelection(): void {
    this.selectedQualifications.emit(this.selected); // Sende die ausgewählten Qualifikationen zurück
    this.isVisibleChange.emit(false); // Schließe das Popup
  }

  closePopup(): void {
    this.isVisibleChange.emit(false); // Informiere die Parent-Komponente, dass das Popup geschlossen werden soll
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
