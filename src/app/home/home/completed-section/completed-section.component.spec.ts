import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedSectionComponent } from './completed-section.component';

describe('CompletedSectionComponent', () => {
  let component: CompletedSectionComponent;
  let fixture: ComponentFixture<CompletedSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
