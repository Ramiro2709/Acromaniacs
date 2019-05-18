import { Component, OnInit, Injector } from '@angular/core';

import {PDFMakerService} from '../../services/pdfmaker.service';
import {MySQLService} from '../../services/my-sql.service';
import {AlertService} from '../../services/alert.service'
import {AlertToMysqlServiceService} from '../../services/alert-to-mysql-service.service';
import {GeneralServiceService} from '../../services/general-service.service';

import {ModalController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-ver-datos-alumno',
  templateUrl: './ver-datos-alumno.page.html',
  styleUrls: ['./ver-datos-alumno.page.scss'],
})
export class VerDatosAlumnoPage implements OnInit {
  alumno;
  arrayClases;
  arrayClasesFiltrado;
  arrayComprobantes;

  lunesHidden;
  martesHidden;
  miercolesHidden;
  juevesHidden;
  viernesHidden;
  sabadoHidden;

  MySql; alerts2;

  constructor(private PDF: PDFMakerService, public injector: Injector, private modalController: ModalController, private generalService: GeneralServiceService) {
    this.MySql = this.injector.get(MySQLService);
    this.alerts2 = this.injector.get(AlertToMysqlServiceService);
    
   }

  ngOnInit() {
    this.MostrarClases();
    this.arrayComprobantes = this.objectToArray(this.alumno["Comprobante"]);
    this.arrayComprobantes.forEach(element => {
      if (element.Recargo == 0){
        element.Recargo = "No";
      } else if (element.Recargo == 1){
        element.Recargo = "Si";
      }
      
    });
    console.log(this.alumno);
    //this.martesHidden = true;
    //console.log(this.alumno["Comprobante"]);
    console.log(this.arrayComprobantes);
    //console.log(this.arrayClases);
  }

  //TODO: Editar y eliminar alumnos

  MostrarClases(){
    if (this.alumno["Clases"]["horarioLunes"] == "false"){this.lunesHidden = true}
    if (this.alumno["Clases"]["horarioMartes"] == "false"){this.martesHidden = true}
    if (this.alumno["Clases"]["horarioMiercoles"] == "false"){this.miercolesHidden = true}
    if (this.alumno["Clases"]["horarioJueves"] == "false"){this.juevesHidden = true}
    if (this.alumno["Clases"]["horarioViernes"] == "false"){this.viernesHidden = true}
    if (this.alumno["Clases"]["horarioSabado"] == "false"){this.sabadoHidden = true}


    /*
    this.arrayClasesFiltrado = new Array();
    this.arrayClases = this.objectToArray(this.alumno["Clases"]); // ** Convierte clases a array para poder ser mostradas con ngFor
    this.arrayClases.splice(0,1); // ** Quita primer elemento del array (id clase)
    //console.log(this.alumno["Clases"]);

    for (let i=0; i < this.alumno["Clases"].length;i++){
      //console.log(this.arrayClases[i]);
      if (this.arrayClases[i] != "false"){
        this.arrayClasesFiltrado.push(this.arrayClases[i]);
      }
    }

    // ** Filta clases false
    for (let i=0; i < this.arrayClases.length;i++){
      //console.log(this.arrayClases[i]);
      if (this.arrayClases[i] != "false"){
        this.arrayClasesFiltrado.push(this.arrayClases[i]);
      }
    }
    console.log(this.arrayClasesFiltrado);
    */
  }

  EliminarAlumno(){
    console.log(this.alumno.idAlumno);
    //this.MySql.EliminarAlumnoService(this.alumno.idAlumno);
    this.alerts2.EliminarAlumnoConfirmAlert(this.alumno.idAlumno);
    
    // TODO Alumno eliminado con exito o fallo, volver atras (cerrar modal)
    this.dismissModal();
  }

  EditarAlumno(){
    // TODO this.alumno al servicio
    //console.log(this.alumno);
    this.generalService.EditandoAlumno = this.alumno;
    //console.log(this.generalService.EditandoAlumno);

    this.dismissModal();
  }

  public dismissModal(){
    this.modalController.dismiss();
  }

  //TODO: Que salga alerta PDF generado exitosamente ?
  generarPDF(comp,idAlumno){
    //console.log(comp["Fecha"]);
    console.log(idAlumno);
    this.PDF.createPdf(idAlumno, comp["Fecha"],comp["MesAbonado"],comp["Recargo"],comp["Monto"],this.alumno.nombre + " " + this.alumno.apellido )
  }

  objectToArray = function(obj) {
    var arr =[];
    for(let o in obj) {
      if (obj.hasOwnProperty(o)) {
        arr.push(obj[o]);
      }
    }
    return arr;
  };

 

}


