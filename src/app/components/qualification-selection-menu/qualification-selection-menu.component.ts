import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-qualification-selection-menu',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './qualification-selection-menu.component.html',
  styleUrl: './qualification-selection-menu.component.css'
})
export class QualificationSelectionMenuComponent {


  @Input() isVisible: boolean = false; // Steuert die Sichtbarkeit des Popups
  @Input() qualifications: any[] = []; // Liste von Qualifikationen
  @Output() selectedQualifications = new EventEmitter<any[]>(); // Gibt die ausgewählten Qualifikationen zurück
  @Output() isVisibleChange = new EventEmitter<boolean>(); // Gibt die Sichtbarkeitsänderung zurück

  private selected: any[] = []; // Interne Liste der ausgewählten Qualifikationen

  constructor(private router: Router) { }

  isSelected(qualification: any): boolean {
    return this.selected.some((q) => q.id === qualification.id); // Prüft, ob die Qualifikation ausgewählt ist
  }

  toggleSelection(qualification: any): void {
    if (this.isSelected(qualification)) {
      this.selected = this.selected.filter((q) => q.id !== qualification.id); // Entferne aus der Auswahl
    } else {
      this.selected.push(qualification); // Füge zur Auswahl hinzu
    }
  }

  confirmSelection(): void {
    this.selectedQualifications.emit(this.selected); // Sende die ausgewählten Qualifikationen zurück
    this.isVisibleChange.emit(false); // Schließe das Popup
  }

  closePopup(): void {
    this.isVisibleChange.emit(false); // Informiere die Parent-Komponente, dass das Popup geschlossen werden soll
  }

  onAddFunction() {
    this.router.navigate(['qualification', 'create']);
  }
}
