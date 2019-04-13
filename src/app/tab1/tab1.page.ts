import { Component, ChangeDetectorRef } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';

import { Platform } from '@ionic/angular';

import {MySQLService} from '../../services/my-sql.service';
import {AlertService} from '../../services/alert.service';
//import {PDFMakerService} from '../../services/pdfmaker.service';

//import { DebugContext } from '@angular/core/src/view';
import {ModalSearchAlumnosPage} from '../modal-search-alumnos/modal-search-alumnos.page';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  
  //Datos del formulario
  form = {
    date: null,
    name: null,
    idAlumno: null,
    mes: null,
    mesNumero : null,
    anioAbonado: null,
    recargo: null,
    monto: null
  }
  today = new Date();
  pdfObj = null;
  recargo;
  valorRecargo;
  mesNumToSting;
  mesFormToNum;
  // Podria ponerse en un obj
  mm : number; yyyy : number;
 
  constructor(private plt: Platform,  private MySql: MySQLService, private changeDet: ChangeDetectorRef, private alertController: AlertController, private alertService: AlertService, private modalController: ModalController) {
    this.GetDate();
    this.form.recargo = "No";
    this.MySql.GetAlumnos();
    this.valorRecargo = 100;
  }
  ionViewDidLoad() {
    //TODO: Cambiar color de meses abonado o no abonados de cada alumno
  }

  //Obtiene fecha de hoy y lo pone como predeterminado
  GetDate(){
    var dd = this.today.getDate();
    this.mm = this.today.getMonth()+1; //January is 0!
    this.yyyy = this.today.getFullYear();
    var ddVar:any;
    var mmVar:any;
    if(dd<10) {
        ddVar = '0'+ dd.toString();
    } else{
      ddVar = dd;
    }

    if(this.mm<10) {
        mmVar = '0'+this.mm.toString();
    } else {
      mmVar = this.mm;
    }
    this.form.date = this.yyyy + "-" + mmVar + "-" +ddVar;
    //console.log(this.form.date);
    this.form.anioAbonado = this.yyyy.toString();
    this.SetMesAbonado(this.mm);
  }

  subirDatos(){
    this.RecargoBool();
    this.ValidarYEnviar();
  }
  
  RecargoBool(){
    //console.log(this.form.recargo);
    if (this.form.recargo == "Si"){
      this.recargo = true;
    } else if (this.form.recargo == "No"){
      this.recargo = false;
    }
    //console.log(this.recargo);
  }

  ValidarYEnviar(){
    if (!(this.form.mes == "Enero" || this.form.mes == "Febrero" || this.form.mes == "Marzo" || this.form.mes == "Abril" || this.form.mes == "Mayo" || this.form.mes == "Junio" || this.form.mes == "Julio" || this.form.mes == "Agosto" || this.form.mes == "Septiembre" || this.form.mes == "Octubre" || this.form.mes == "Noviembre" || this.form.mes == "Diciembre")){
      //console.log("Mes Incorrecto");
      var mesCorrecto = false;
    } else {
      var mesCorrecto = true;
    }

    if (!(this.form.recargo == "No" || this.form.recargo == "Si" || this.form.recargo == "NO" || this.form.recargo == "SI")){
      var recargoCorrecto = false;
    } else {
      var recargoCorrecto = true;
    }

    if(this.form.monto > 1000000 || this.form.monto == null){
      //console.log("Monto Incorrecto, ");
      var montoCorrecto = false;
    } else {
      var montoCorrecto = true;
    }

    // *** Check Date
    if(this.form.date == ""){
      //console.log("Fecha incorrecta");
      var fechaCorrecta = false;
    } else {
      var fechaCorrecta = true;
    }

    // **** Check Comprobante
    var abonadoCorrecto = true;
    // ++ Revisa el array de alumnos
    //console.log(Object.keys(this.MySql.AlumnosArray).length);
    for (let i=0;i < (Object.keys(this.MySql.AlumnosArray).length - 1) ;i++){
      //console.log(this.MySql.AlumnosArray[i]['idAlumno']);
      // ++ Si el id del alumno es igual al del formulario
      if (this.MySql.AlumnosArray[i]['idAlumno'] == this.form.idAlumno){
        //console.log(this.MySql.AlumnosArray[i]['idAlumno']);
        // ++ Si no tiene comprobantes break
        if (!this.MySql.AlumnosArray[i]['Comprobante']){
          break;
        }
        // ++ Revisa todos sus comprobantes
        console.log((Object.keys(this.MySql.AlumnosArray[i]['Comprobante']).length));
        for (let y=0; y < (Object.keys(this.MySql.AlumnosArray[i]['Comprobante']).length); y++){
          //console.log(this.MySql.AlumnosArray[i]['Comprobante']);
          // ++ Si alguno es del mismo mes y año que el form
          //console.log(this.MySql.AlumnosArray[i]['Comprobante'][y]['MesAbonado']+ " == "+ this.form.mes +" ; "+ this.MySql.AlumnosArray[i]['Comprobante'][y]['AnioAbonado'] + " == "+ this.form.anioAbonado);
          if (this.MySql.AlumnosArray[i]['Comprobante'][y]['MesAbonado'] == this.form.mes && this.MySql.AlumnosArray[i]['Comprobante'][y]['AnioAbonado'] == this.form.anioAbonado){
            abonadoCorrecto = false;
            //return;
          }
        }
        break;
      }
    }


    if (montoCorrecto && recargoCorrecto && mesCorrecto && fechaCorrecta && abonadoCorrecto){
      this.MySql.enviarBase(this.form.idAlumno,this.form.date, this.form.mes,this.form.anioAbonado,this.recargo,this.form.monto,this.form.name);
    } else{
      console.log("Error");
      this.alertService.ShowError(mesCorrecto, recargoCorrecto, montoCorrecto, fechaCorrecta, abonadoCorrecto);
    }
  }

  

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalSearchAlumnosPage,
      componentProps: { value: 123 }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
    if (data != null){
      this.form.name = data.name;
      this.form.idAlumno = data.idAlumno;
      // NOTE: Suma el recargo al monto si es true
      var recargo = 0;
      if (this.form.recargo == "Si"){recargo = this.valorRecargo} // Cantidad de recargo
      this.form.monto = data.monto + recargo;
    }
  }

  CambioRecargo(){
    // NOTE: Cuando el select "recargo" es cambiado cambia el monto
    //console.log("CambioRecargo");
    if (this.form.recargo == "Si") {this.form.monto += this.valorRecargo}
    else {this.form.monto -= this.valorRecargo}
  }

  CambioMesAbonado(){
    // NOTE: Si el mes seleccionado, es mayor al mes actual, y el año es mayor o igual, se aplica recargo
    this.MesStringToNumber();
    if (this.mesFormToNum > this.mm && Number(this.form.anioAbonado) == this.yyyy || Number(this.form.anioAbonado) > this.yyyy){
      //console.log("Se aplica recargo");
      this.form.recargo = "Si";
    } else {
      this.form.recargo = "No";
    }
  }

  SetMesAbonado(mm){
    //TODO: Mes predeterminado sea el ultimo sin pagar
    //console.log(mm);
    //var predfMes;
    this.form.mesNumero = mm;
    switch(mm) { 
      case 1: { this.mesNumToSting = "Enero";  this.form.mes = this.mesNumToSting; break; } 
      case 2: { this.mesNumToSting = "Febrero"; this.form.mes = this.mesNumToSting; break; } 
      case 3: { this.mesNumToSting = "Marzo"; this.form.mes = this.mesNumToSting; break; } 
      case 4: { this.mesNumToSting = "Abril"; this.form.mes = this.mesNumToSting; break; } 
      case 5: { this.mesNumToSting = "Mayo"; this.form.mes = this.mesNumToSting; break; }
      case 6: { this.mesNumToSting = "Junio"; this.form.mes = this.mesNumToSting; break; } 
      case 7: { this.mesNumToSting = "Julio"; this.form.mes = this.mesNumToSting; break; } 
      case 8: { this.mesNumToSting = "Agosto"; this.form.mes = this.mesNumToSting; break; } 
      case 9: { this.mesNumToSting = "Septiembre"; this.form.mes = this.mesNumToSting; break; } 
      case 10: { this.mesNumToSting = "Octubre"; this.form.mes = this.mesNumToSting; break; } 
      case 11: { this.mesNumToSting = "Noviembre"; this.form.mes = this.mesNumToSting; break; } 
      case 12: { this.mesNumToSting = "Diciembre"; this.form.mes = this.mesNumToSting; break; } 
      default: { this.mesNumToSting = "error"; break; } 
    }
    //this.form.mes == 
  }

  MesStringToNumber(){
    switch(this.form.mes) { 
      case "Enero": { this.mesFormToNum = 1; break; } 
      case "Febrero": { this.mesFormToNum = 2; break; } 
      case "Marzo": { this.mesFormToNum = 3; break; } 
      case "Abril": { this.mesFormToNum = 4; break; } 
      case "Mayo": { this.mesFormToNum = 5; break; }
      case "Junio": { this.mesFormToNum = 6; break; } 
      case "Julio": { this.mesFormToNum = 7; break; } 
      case "Agosto": { this.mesFormToNum = 8; break; } 
      case "Septiembre": { this.mesFormToNum = 9; break; } 
      case "Octubre": { this.mesFormToNum = 10; break; } 
      case "Noviembre": { this.mesFormToNum = 11; break; } 
      case "Diciembre": { this.mesFormToNum = 12; break; } 
      default: {  this.mesFormToNum = 0; break; } 
    }
  }
}

