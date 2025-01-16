import {Component, EventEmitter, Input, Output} from '@angular/core';


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

  @Input() data: any[] = [
  ];


  filteredData: any[] = [];


  ngOnInit() {
    this.filteredData = [...this.data];  // Initiale Daten setzen
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

  @Input() tableName: string = "";

  @Input() onEditFunction: ((data: any) => void) | null = null;
  @Input() onDeleteFunction: ((data: any) => void) | null = null;
  @Input() onAddFunction: ((data: any) => void) | null = null;



  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  protected readonly menubar = menubar;
}
