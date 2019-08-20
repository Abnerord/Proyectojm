import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitulounoComponent } from './capitulouno.component';

describe('CapitulounoComponent', () => {
  let component: CapitulounoComponent;
  let fixture: ComponentFixture<CapitulounoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapitulounoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitulounoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
