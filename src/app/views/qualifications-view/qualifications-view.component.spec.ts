import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationsViewComponent } from './qualifications-view.component';

describe('QualificationsViewComponent', () => {
  let component: QualificationsViewComponent;
  let fixture: ComponentFixture<QualificationsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
