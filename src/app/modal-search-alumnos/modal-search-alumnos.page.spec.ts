import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSearchAlumnosPage } from './modal-search-alumnos.page';

describe('ModalSearchAlumnosPage', () => {
  let component: ModalSearchAlumnosPage;
  let fixture: ComponentFixture<ModalSearchAlumnosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSearchAlumnosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSearchAlumnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
