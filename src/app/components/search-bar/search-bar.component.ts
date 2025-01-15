import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',  // Verlinke die HTML-Datei hier
  styleUrls: ['./search-bar.component.css'],
  standalone: true
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.search.emit(searchTerm);
  }
}
