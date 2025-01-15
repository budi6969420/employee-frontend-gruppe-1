import { Component } from '@angular/core';


@Component({
  selector: 'app-team-members',
  templateUrl: './table-with-editable-and-deleteable-components.component.html',
  standalone: true,
  styleUrls: ['./table-with-editable-and-deleteable-components.component.css']
})
export class TableWithEditableAndDeleteableComponentsComponent {
  searchTerm: string = '';
  teamMembers = [
    { name: 'Max Mustermann' },
    { name: 'Max Mustermann' },
    { name: 'Max Mustermann' },
    { name: 'Max Mustermann' },
    { name: 'Max Mustermann' },
    { name: 'Max Mustermann' },
  ];

  addMember() {
    console.log('Add member clicked');
  }

  editMember(member: any) {
    console.log('Edit member:', member);
  }

  deleteMember(member: any) {
    console.log('Delete member:', member);
  }
}
