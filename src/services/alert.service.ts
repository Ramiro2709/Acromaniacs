import { Injectable } from '@angular/core';

import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

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

  async AltaExitosa(){
    //console.log("AltaExitosa");
    const alert = await this.alertController.create({
      header: 'Exito',
      message: 'Datos cargados exitosamente',
      buttons: ['OK']
    });
    await alert.present();
  }

  async AltaError(){
    //console.log("AltaError");
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Error al cargar datos. No hay conexion con el servidor',
      buttons: ['OK']
    });
    await alert.present();
  }


}
