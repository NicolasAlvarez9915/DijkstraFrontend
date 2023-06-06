import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearNodoComponent } from './modal-crear-nodo.component';

describe('ModalCrearNodoComponent', () => {
  let component: ModalCrearNodoComponent;
  let fixture: ComponentFixture<ModalCrearNodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCrearNodoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCrearNodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
