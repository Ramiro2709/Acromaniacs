import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAlumnosPage } from './ver-alumnos.page';

describe('VerAlumnosPage', () => {
  let component: VerAlumnosPage;
  let fixture: ComponentFixture<VerAlumnosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerAlumnosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAlumnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
