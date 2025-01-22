import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Input() isVisible: boolean = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  closePopup(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible); // Informiere die Parent-Komponente
  }
}
