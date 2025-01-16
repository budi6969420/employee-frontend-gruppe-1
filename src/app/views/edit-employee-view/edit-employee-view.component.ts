import { Component } from '@angular/core';
import {EmployeeInformationComponent} from "../../components/employee-information/employee-information.component";
import {
    TableWithEditableAndDeleteableComponentsComponent
} from "../../components/table-with-editable-and-deleteable-components/table-with-editable-and-deleteable-components.component";

@Component({
  selector: 'app-edit-employee-view',
  standalone: true,
    imports: [
        EmployeeInformationComponent,
        TableWithEditableAndDeleteableComponentsComponent
    ],
  templateUrl: './edit-employee-view.component.html',
  styleUrl: './edit-employee-view.component.css'
})
export class EditEmployeeViewComponent {

}
