import { Component, ChangeDetectorRef } from '@angular/core';
import { AlertController,ModalController } from '@ionic/angular';

import { Platform } from '@ionic/angular';

import {MySQLService} from '../../services/my-sql.service';
import {AlertService} from '../../services/alert.service';
//import {PDFMakerService} from '../../services/pdfmaker.service';

//import { DebugContext } from '@angular/core/src/view';
import {ModalSearchAlumnosPage} from '../modal-search-alumnos/modal-search-alumnos.page';

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
    anioAbonado: null,
    recargo: null,
    monto: null
  }
  today = new Date();
  pdfObj = null;
  recargo;
 
  constructor(private plt: Platform,  private MySql: MySQLService, private changeDet: ChangeDetectorRef, private alertController: AlertController, private alertService: AlertService, private modalController: ModalController) {
    this.GetDate();
    this.form.recargo = "No";
    this.MySql.GetAlumnos();
  }
  ionViewDidLoad() {}

  //Obtiene fecha de hoy y lo pone como predeterminado
  GetDate(){
    var dd = this.today.getDate();
    var mm = this.today.getMonth()+1; //January is 0!
    var yyyy = this.today.getFullYear();
    var ddVar:any;
    var mmVar:any;
    if(dd<10) {
        ddVar = '0'+ dd.toString();
    } else{
      ddVar = dd;
    }

    if(mm<10) {
        mmVar = '0'+mm.toString();
    } else {
      mmVar = mm;
    }
    this.form.date = yyyy + "-" + mmVar + "-" +ddVar;
    console.log(this.form.date);
    this.form.anioAbonado = yyyy.toString();
  }

  subirDatos(){
    this.RecargoBool();
    this.ValidarYEnviar();
    //this.MySql.enviarBase(1,this.form.date, this.form.mes,this.recargo,this.form.monto);
    //this.createPdf(); 
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

  change(value){
    /*
    //manually launch change detection
    this.changeDet.detectChanges();
    //console.log(value);
    var valueString;
    valueString = value.toString();
    //valueString = valueString + ' ';
    var lastChar = valueString.substring(valueString.length - 1);
    //console.log(lastChar);
    //lastChar = lastChar.substring(lastChar.length() - 1); 
    //console.log(lastChar);

    if(value > 1000000){
      
      valueString = valueString.substring(0,7);
      this.form.monto = parseInt(valueString);
    }

    //this.form.monto = value.length > 8 ? value.substring(0,8) : value;
    */
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

    if(this.form.date == ""){
      //console.log("Fecha incorrecta");
      var fechaCorrecta = false;
    } else {
      var fechaCorrecta = true;
    }

    if (montoCorrecto && recargoCorrecto && mesCorrecto && fechaCorrecta){
      this.MySql.enviarBase(this.form.idAlumno,this.form.date, this.form.mes,this.form.anioAbonado,this.recargo,this.form.monto,this.form.name);
    } else{
      console.log("Error");
      this.alertService.ShowError(mesCorrecto, recargoCorrecto, montoCorrecto, fechaCorrecta);
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
      this.form.monto = data.monto;
    }
    
  }
}

