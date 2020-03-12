import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosDisplayComponent } from './todos-display.component';

describe('TodosDisplayComponent', () => {
  let component: TodosDisplayComponent;
  let fixture: ComponentFixture<TodosDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
