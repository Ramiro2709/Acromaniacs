import { Injectable,Injector } from '@angular/core';

import { AlertController } from '@ionic/angular';

import {PDFMakerService} from './pdfmaker.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  pDFMakerService : any;
  constructor(private alertController: AlertController, public injector: Injector) { 
    this.pDFMakerService = injector.get(PDFMakerService);
  }

  //Muestra error cuando algun input es incorrecto
  async ShowError(mesCorrecto, recargoCorrecto, montoCorrecto, fechaCorrecta){
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

    const alert = await this.alertController.create({
      header: 'Error',
      message: errorMesagge,
      buttons: ['OK']
    });
    await alert.present();
  }

  async AltaExitosa(IdAlumno: number, Fecha: Date, MesAbonado: string, Recargo: boolean, Monto: number){
    //console.log("AltaExitosa");
    const alert = await this.alertController.create({
      header: 'Exito',
      message: 'Datos cargados exitosamente',
      buttons: [
        'OK',
        {
          text: 'Generar PDF',
          handler: () => {
            this.pDFMakerService.createPdf(IdAlumno, Fecha, MesAbonado, Recargo, Monto);
          }
        }
      ]
    });
    await alert.present();
  }

  async AltaError(IdAlumno: number, Fecha: Date, MesAbonado: string, Recargo: boolean, Monto: number){
    //console.log("AltaError");
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Error al cargar datos. No hay conexion con el servidor',
      buttons: [
        'OK',
        {
          text: 'Generar PDF',
          handler: () => {
            this.pDFMakerService.createPdf(IdAlumno, Fecha, MesAbonado, Recargo, Monto);
          }
        }
      ]
    });
    await alert.present();
  }


}
