import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'app-base-table',
  templateUrl: './table-with-editable-and-deleteable-components.component.html',
  standalone: true,
  styleUrls: ['./table-with-editable-and-deleteable-components.component.css']
})
export class TableWithEditableAndDeleteableComponentsComponent {

  @Input() data: any[] = [
  ];

  @Input() onEditFunction: ((data: any) => void) | null = null;
  @Input() onDeleteFunction: ((data: any) => void) | null = null;
  @Input() onAddFunction: ((data: any) => void) | null = null;



  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  protected readonly menubar = menubar;
}
