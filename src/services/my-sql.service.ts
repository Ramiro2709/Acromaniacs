import { Injectable,Injector } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root',

})
export class MySQLService {
  ipCarpeta : string = "http://localhost/acromaniacs/";
  datosAlta;
  alertService : any;

  constructor(public http: HttpClient, public injector: Injector) { 
    this.alertService = injector.get(AlertService);
    
    //Para que ande el post
    const httpOptions = { 
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': ''
      })
    };

  }

  enviarBase(IdAlumno: number, Fecha: Date, MesAbonado: string, Recargo: boolean, Monto: number){
    //console.log(Recargo);
    this.datosAlta = JSON.stringify({
      "IdAlumno": IdAlumno,     //Int
      "Fecha": Fecha,           //Date
      "MesAbonado": MesAbonado, //String
      "Recargo": Recargo,       //Bool
      "Monto" : Monto           //Int
    });
    var ipAltaDatos = this.ipCarpeta + "AltaDatos.php";

    this.http.post<string>(ipAltaDatos,this.datosAlta) //TODO: Hacer php que carge datos
    .subscribe((data : any) =>
    {
      //TODO: Mensaje de carga exitosa
      //console.log("Llamada AltaExitosa");
      this.alertService.AltaExitosa(IdAlumno, Fecha, MesAbonado, Recargo, Monto);
    },
    (error : any) =>
    {
      //console.log("Error POST");
      this.alertService.AltaError(IdAlumno, Fecha, MesAbonado, Recargo, Monto);
    });
  }



  //TODO: Funcion que rebida datos y genere su PDF

  
}
