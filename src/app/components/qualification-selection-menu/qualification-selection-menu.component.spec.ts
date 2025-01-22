import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationSelectionMenuComponent } from './qualification-selection-menu.component';

describe('QualificationSelectionMenuComponent', () => {
  let component: QualificationSelectionMenuComponent;
  let fixture: ComponentFixture<QualificationSelectionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationSelectionMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationSelectionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
