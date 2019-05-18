import { Injectable,Injector } from '@angular/core';

import { AlertController,LoadingController, ModalController} from '@ionic/angular';

import {MySQLService} from './my-sql.service';
import {PDFMakerService} from './pdfmaker.service';
import { CrearAlumnoPage } from 'src/app/crear-alumno/crear-alumno.page';
import { ModalSearchAlumnosPage } from 'src/app/modal-search-alumnos/modal-search-alumnos.page';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  pDFMakerService : any;
  mySQL : any;
  constructor(private alertController: AlertController, public injector: Injector, public loadingCtrl:LoadingController, public modalCtrl: ModalController,
    private router: Router) { 
    
    this.IniciarInjectores();
  }
  IniciarInjectores(){
    this.pDFMakerService = this.injector.get(PDFMakerService);
    this.mySQL = this.injector.get(MySQLService);
  }

  //Muestra error cuando algun input es incorrecto
  async ShowError(mesCorrecto, recargoCorrecto, montoCorrecto, fechaCorrecta, abonadoCorrecto){
    var errorMesagge = "";
    if (!fechaCorrecta){
      errorMesagge += 'Fecha incorrecta <br/>';
    }
    if (!mesCorrecto){
      errorMesagge += 'Mes incorrecto <br/>';
    }
    if (!recargoCorrecto){
      errorMesagge += 'Recargo incorrecto <br/>';
    }
    if (!montoCorrecto){
      errorMesagge += "Monto incorrecto \n";
    }
    if (!abonadoCorrecto){
      errorMesagge += "Ese mes ya a sido abonado \n";
    }

    const alert = await this.alertController.create({
      header: 'Error',
      message: errorMesagge,
      buttons: ['OK']
    });
    await alert.present();
  }

  async AltaExitosa(IdAlumno: number, Fecha: Date, MesAbonado: string, Recargo: boolean, Monto: number, NombreApellido:string){
    //console.log("AltaExitosa");
    const alert = await this.alertController.create({
      header: 'Exito',
      message: 'Datos cargados exitosamente',
      buttons: [
        'OK',
        {
          text: 'Generar PDF',
          handler: () => {
            this.pDFMakerService.createPdf(IdAlumno, Fecha, MesAbonado, Recargo, Monto,NombreApellido);
          }
        }
      ]
    });
    await alert.present();
  }

  async AltaError(IdAlumno: number, Fecha: Date, MesAbonado: string, Recargo: boolean, Monto: number, NombreApellido:string){
    //console.log("AltaError");
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Error al cargar datos. No hay conexion con el servidor',
      buttons: [
        'OK',
        {
          text: 'Generar PDF',
          handler: () => {
            this.pDFMakerService.createPdf(IdAlumno, Fecha, MesAbonado, Recargo, Monto,NombreApellido);
          }
        }
      ]
    });
    await alert.present();
  }

  async AltaAlumnoExitosa(){
    const alert = await this.alertController.create({
      header: 'Exito',
      message: 'Alumno cargado exitosamente',
      buttons: [
        'OK',
      ]
    });
    await alert.present();
  }

  async AltaAlumnoError(){
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Error al cargar datos. No hay conexion con el servidor',
      buttons: [
        'OK',
      ]
    });
    await alert.present();
  }

  async EditarAlumno(exito){
    if (exito){
      var header = 'Exito';
      var message = 'Alumno editado exitosamente';
    } else if (!exito){
      var header = 'ERROR';
      var message = 'Error al editar datos. No hay conexion con el servidor';
    }
    
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/tabs/tab2/ver-alumnos']);
          }
        }
      ]
    });
    await alert.present();
    
  }

  async GetAlumnosError(){
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Error al cargar alumnos. No hay conexion con el servidor o no hay datos',
       
    });
    return await alert.present();
  }

  async CrearAlumnoError(){
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Ingrese nombre y apellido',
      buttons: [
        {
          text: 'OK',
          handler: () => {
          }
        }
      ] 
    });
    return await alert.present();
  }

  isLoading = false;

  

  BoolEliminarAlumno(){
    this.mySQL.BoolEliminarAlumno();
  }

  async present() {
    this.isLoading = true; //Asigna bool de que empezo a cargar
    return await this.loadingCtrl.create({ //(con await) crea loading
      duration: 5000,
    }).then(a => {
      a.present().then(() => { //Lo presenta, generalmente tarda
        //console.log('presented');
        if (!this.isLoading) { //Si dismiss() ya fue llamado, (es mas rapido que present())
          a.dismiss().then(() => console.log('abort presenting')); //dismiss loading
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false; //Asigna bool false, por si es llamado antes que el present, este se aborte
    return await this.loadingCtrl.dismiss().then(() => 
    console.log('dismissed')
    );
  }

  //TODO?: Agregar mas campos a los alumnos No anda?
  async CrearAlumnoPrompt() {
    const alert = await this.alertController.create({
      header: 'Crear Alumno',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'apellido',
          type: 'text',
          id: 'apellido-id',
          placeholder: 'Apellido'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          //cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Crear Alumno',
          handler: data => { //data: inputs
            //this.mySQL.AltaAlumno(data.nombre,data.apellido);
          }
        }
      ]
    });
    await alert.present();
  } // Fin CrearAlumnoPrompt

} // Fin Class AlertService

