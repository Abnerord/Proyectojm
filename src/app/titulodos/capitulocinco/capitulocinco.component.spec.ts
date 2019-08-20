import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitulocincoComponent } from './capitulocinco.component';

describe('CapitulocincoComponent', () => {
  let component: CapitulocincoComponent;
  let fixture: ComponentFixture<CapitulocincoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapitulocincoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitulocincoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
