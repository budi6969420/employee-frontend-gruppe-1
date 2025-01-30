import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationSelectionTableComponent } from './qualification-selection-table.component';

describe('QualificationSelectionTableComponent', () => {
  let component: QualificationSelectionTableComponent;
  let fixture: ComponentFixture<QualificationSelectionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationSelectionTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationSelectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
