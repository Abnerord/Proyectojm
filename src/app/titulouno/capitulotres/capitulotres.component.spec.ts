import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitulotresComponent } from './capitulotres.component';

describe('CapitulotresComponent', () => {
  let component: CapitulotresComponent;
  let fixture: ComponentFixture<CapitulotresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapitulotresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitulotresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
