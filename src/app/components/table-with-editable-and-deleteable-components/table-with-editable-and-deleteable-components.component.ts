import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'app-team-members',
  templateUrl: './table-with-editable-and-deleteable-components.component.html',
  standalone: true,
  styleUrls: ['./table-with-editable-and-deleteable-components.component.css']
})
export class TableWithEditableAndDeleteableComponentsComponent {

  @Input() data: any[] = [
    {name: 'Max Mustermann'},
  ];
  @Input() showEditButton: boolean = true;
  @Input() showDeleteButton: boolean = true;
  @Input() showAddButton: boolean = true;



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
