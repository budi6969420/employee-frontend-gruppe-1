import {Component, Input, TemplateRef} from '@angular/core';
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {NgTemplateOutlet} from "@angular/common";


@Component({
  selector: 'app-base-table',
  templateUrl: './table-with-editable-and-deleteable-components.component.html',
  standalone: true,
  imports: [
    SearchBarComponent,
    NgTemplateOutlet
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
  @Input() filterComponent: TemplateRef<any> | null = null;

  filteredData: any[] | null = null;

  // great name extra punkte pls
  useThisDataPls(): any[] {
    return this.filteredData == null ? this.data: this.filteredData
  }

  onSearch(term: string) {
    if (term) {
      this.filteredData = this.data.filter((member) =>
        member.name.toLowerCase().includes(term)
      );
    } else {
      this.filteredData = [...this.data];  // Alles anzeigen, wenn das Suchfeld leer ist
    }
  }
}
