import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQualificationViewComponent } from './edit-qualification-view.component';

describe('CreateQualificationViewComponent', () => {
  let component: EditQualificationViewComponent;
  let fixture: ComponentFixture<EditQualificationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditQualificationViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQualificationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
