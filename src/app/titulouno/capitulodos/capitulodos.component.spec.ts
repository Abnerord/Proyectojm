import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitulodosComponent } from './capitulodos.component';

describe('CapitulodosComponent', () => {
  let component: CapitulodosComponent;
  let fixture: ComponentFixture<CapitulodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapitulodosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitulodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
