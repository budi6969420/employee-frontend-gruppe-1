import {Component, Input} from '@angular/core';
import {SearchBarComponent} from "../search-bar/search-bar.component";


@Component({
  selector: 'app-base-table',
  templateUrl: './table-with-editable-and-deleteable-components.component.html',
  standalone: true,
  imports: [
    SearchBarComponent
  ],
  styleUrls: ['./table-with-editable-and-deleteable-components.component.css']
})
export class TableWithEditableAndDeleteableComponentsComponent {
  @Input() data: any[] = [];
  @Input() tableName: string = "";
  @Input() showSearchbar: boolean = false;

  @Input() onEditFunction: ((data: any) => void) | null = null;
  @Input() onDeleteFunction: ((data: any) => void) | null = null;
  @Input() onAddFunction: ((data: any) => void) | null = null;

  filteredData: any[] = [];

  onSearch(term: string) {
    if (term) {
      this.filteredData = this.data.filter((member) =>
        member.name.toLowerCase().includes(term)
      );
    } else {
      this.filteredData = [...this.data];  // Alles anzeigen, wenn das Suchfeld leer ist
    }
  }

  protected readonly menubar = menubar;
}
