import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQualificationViewComponent } from './create-qualification-view.component';

describe('CreateQualificationViewComponent', () => {
  let component: CreateQualificationViewComponent;
  let fixture: ComponentFixture<CreateQualificationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateQualificationViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateQualificationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
