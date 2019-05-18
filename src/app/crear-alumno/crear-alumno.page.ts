import { Component, OnInit } from '@angular/core';

import {MySQLService} from '../../services/my-sql.service';
import {AlertService} from '../../services/alert.service';
import {GeneralServiceService} from '../../services/general-service.service';



@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.page.html',
  styleUrls: ['./crear-alumno.page.scss'],
})
export class CrearAlumnoPage implements OnInit {
  
  form = {
    name: null,
    apellido: null,
    horarioLunes: null,
    horarioMartes: null,
    horarioMiercoles: null,
    horarioJueves: null,
    horarioViernes: null,
    horarioSabado: null,
    horarioDomingo: null,
    editandoAlumnoID: null
  };

  radios = {
    lunes: "false",
    martes: "false",
    miercoles: "false",
    viernes: "false",
    jueves: "false",
    sabado: "false",
    domingo: "false"
  }

  horarioLunes={disabled:true};
  horarioMartes={disabled:true};
  horarioMiercoles={disabled:true};
  horarioJueves={disabled:true};
  horarioViernes={disabled:true};
  horarioSabado={disabled:true};
  horarioDomingo={disabled:true};

  //EditandoIdAlumno;

  constructor(
    private MySql: MySQLService,
    private alertService: AlertService,
    private generalService: GeneralServiceService
    ) {
    console.log("Crear Alumno Page");
    //console.log(this.generalService.EditandoAlumno);
    // TODO Si esta editando, que envie query de modificacion no de alta, vaciar objeto con alumno a editar despues
    //console.log(this.generalService.EditandoAlumno);
    if (this.generalService.EditandoAlumno){
      this.EditandoAlumno();
    }
    
   }

  ngOnInit() {
  }

  ShowValues(){
    
    console.log("..................................");
    console.log("nombre: "+this.form.name);
    console.log("apellido: "+this.form.apellido);
    console.log("lunes: "+this.radios.lunes);
    console.log("miercoles: "+this.radios.miercoles);
    console.log("martes: "+this.radios.martes);
    console.log("jueves: "+this.radios.jueves);
    console.log("sabado: "+this.radios.sabado);
    console.log("domingo: "+this.radios.domingo);
  }

  DisableClase(){
    if (this.radios.lunes == "true") {this.horarioLunes.disabled = false;} 
    else {
      this.horarioLunes.disabled = true;
      this.form.horarioLunes = null;
    }
    if (this.radios.martes == "true") {this.horarioMartes.disabled = false;} 
    else {
      this.horarioMartes.disabled = true;
      this.form.horarioMartes = null;
    }
    if (this.radios.miercoles == "true") {this.horarioMiercoles.disabled = false;} 
    else {
      this.horarioMiercoles.disabled = true;
      this.form.horarioMiercoles = null;
    }
    if (this.radios.jueves == "true") {this.horarioJueves.disabled = false;} 
    else {
      this.horarioJueves.disabled = true;
      this.form.horarioJueves = null;
    }
    if (this.radios.viernes == "true") {this.horarioViernes.disabled = false;} 
    else {
      this.horarioViernes.disabled = true;
      this.form.horarioViernes = null;
    }
    if (this.radios.sabado == "true") {this.horarioSabado.disabled = false;} 
    else {
      this.horarioSabado.disabled = true;
      this.form.horarioSabado = null;
    }
    if (this.radios.domingo == "true") {this.horarioDomingo.disabled = false;} 
    else {
      this.horarioDomingo.disabled = true;
      this.form.horarioDomingo = null;
    }

  }

  /*
  DisableClase(){
    console.log("DisableClase "+this.radios.lunes);
    if(this.radios.lunes == "true" || this.radios.miercoles == "true"){
      console.log("DisableClase::: true ");
      this.radioMartes.disabled = true;
      this.radioJueves.disabled = true;
    } else {
      this.radioMartes.disabled = false;
      this.radioJueves.disabled = false;
    }

    if(this.radios.martes == "true" || this.radios.jueves == "true"){
      this.radioLunes.disabled = true;
      this.radioMiercoles.disabled = true;
    } else {
      this.radioLunes.disabled = false;
      this.radioMiercoles.disabled = false;
    }
  }
  */

  EnviarAlumnoData(){
    if (this.form.name == null || this.form.apellido == null){
      this.alertService.CrearAlumnoError();
      return;
    }

    for (var i in this.form){
      //console.log("Key:" + i);
      //console.log("Value:" + this.form[i]);
      // Si queda algun campo vacio, le asigna "false"
      if (this.form[i] == null){
        this.form[i] = "false";
      }
    }
    console.log(this.form);

    if (!this.generalService.EditandoAlumno){
      this.MySql.AltaAlumno(this.form);
    } else {
      console.log(this.form);
      this.MySql.EditarAlumno(this.form);
      
    }
  }

  EditandoAlumno(){
    this.form.editandoAlumnoID = this.generalService.EditandoAlumno["idAlumno"];
    this.form.name = this.generalService.EditandoAlumno["nombre"];
      //console.log(this.form.name);
      this.form.apellido = this.generalService.EditandoAlumno["apellido"];
      if (this.generalService.EditandoAlumno["Clases"]["horarioLunes"] != "false"){
        this.radios.lunes = "true";
        this.horarioLunes={disabled:false};
        this.form.horarioLunes = this.generalService.EditandoAlumno["Clases"]["horarioLunes"];
      }
      if (this.generalService.EditandoAlumno["Clases"]["horarioMartes"] != "false"){
        this.radios.martes = "true";
        this.horarioMartes={disabled:false};
        this.form.horarioMartes = this.generalService.EditandoAlumno["Clases"]["horarioMartes"];
      }
      if (this.generalService.EditandoAlumno["Clases"]["horarioMiercoles"] != "false"){
        this.radios.miercoles = "true";
        this.horarioMiercoles={disabled:false};
        this.form.horarioMiercoles = this.generalService.EditandoAlumno["Clases"]["horarioMiercoles"];
      }
      if (this.generalService.EditandoAlumno["Clases"]["horarioJueves"] != "false"){
        this.radios.jueves = "true";
        this.horarioJueves={disabled:false};
        this.form.horarioJueves = this.generalService.EditandoAlumno["Clases"]["horarioJueves"];
      }
      if (this.generalService.EditandoAlumno["Clases"]["horarioViernes"] != "false"){
        this.radios.viernes = "true";
        this.horarioViernes={disabled:false};
        this.form.horarioViernes = this.generalService.EditandoAlumno["Clases"]["horarioViernes"];
      }
      if (this.generalService.EditandoAlumno["Clases"]["horarioSabado"] != "false"){
        this.radios.sabado = "true";
        this.horarioSabado={disabled:false};
        this.form.horarioSabado = this.generalService.EditandoAlumno["Clases"]["horarioSabado"];
      }
  }

  ionViewWillLeave(){
    console.log("Salio");
    this.generalService.EditandoAlumno = undefined;
    //console.log(this.generalService.EditandoAlumno);

  }

}
