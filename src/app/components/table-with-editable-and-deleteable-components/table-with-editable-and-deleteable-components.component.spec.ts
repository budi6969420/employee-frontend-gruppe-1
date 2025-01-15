import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWithEditableAndDeleteableComponentsComponent } from './table-with-editable-and-deleteable-components.component';

describe('TableWithEditableAndDeleteableComponentsComponent', () => {
  let component: TableWithEditableAndDeleteableComponentsComponent;
  let fixture: ComponentFixture<TableWithEditableAndDeleteableComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableWithEditableAndDeleteableComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableWithEditableAndDeleteableComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
