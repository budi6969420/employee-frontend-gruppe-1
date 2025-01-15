import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';  // OnInit importieren
import {SearchBarComponent} from "../search-bar/search-bar.component";

@Component({
  selector: 'app-team-members',
  templateUrl: './table-with-editable-and-deleteable-components.component.html',
  standalone: true,
  imports: [
    SearchBarComponent
  ],
  styleUrls: ['./table-with-editable-and-deleteable-components.component.css']
})
export class TableWithEditableAndDeleteableComponentsComponent {

  @Input() data: any[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
    { id: 4, name: 'Bob Brown' },
    { id: 5, name: 'Charlie Davis' },
    { id: 6, name: 'Dana Williams' },
    { id: 7, name: 'Eve Clark' },
    { id: 8, name: 'Frank Moore' },
    { id: 9, name: 'Grace Taylor' },
    { id: 10, name: 'Hank Wilson' }
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

  @Input() onEditFunction: ((data: any) => void) | null = null;
  @Input() onDeleteFunction: ((data: any) => void) | null = null;
  @Input() onAddFunction: ((data: any) => void) | null = null;



  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  onAdd() {
    // #Todo need the Add Page
  }

  onEdit(member: any) {
    this.edit.emit(member);  // Edit-Event auslösen
  }

  onDelete(member: any) {
    this.delete.emit(member);  // Delete-Event auslösen
  }

  protected readonly menubar = menubar;
}
