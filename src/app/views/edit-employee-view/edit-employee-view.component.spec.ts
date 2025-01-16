import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeViewComponent } from './edit-employee-view.component';

describe('EditEmployeeViewComponent', () => {
  let component: EditEmployeeViewComponent;
  let fixture: ComponentFixture<EditEmployeeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEmployeeViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmployeeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
