import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-datos-alumno',
  templateUrl: './ver-datos-alumno.page.html',
  styleUrls: ['./ver-datos-alumno.page.scss'],
})
export class VerDatosAlumnoPage implements OnInit {
  alumno;
  constructor() { }

  ngOnInit() {
    console.log(this.alumno);
  }

  //TODO: Mostrar datos del alumno
  //TODO: Editar y eliminar alumnos

}
