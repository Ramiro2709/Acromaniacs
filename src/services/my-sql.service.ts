import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MySQLService {
  ipCarpeta : string = "http://localhost/acromaniacs/";

  constructor(public http: HttpClient) { 

    //Para que ande el post
    const httpOptions = { 
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': ''
      })
    };

  }

  enviarBase(IdAlumno: number, Fecha: Date, MesAbonado: string, Recargo: boolean, Monto: number){

    var datosAlta = JSON.stringify({
      "IdAlumno": IdAlumno,     //Int
      "Fecha": Fecha,           //Date
      "MesAbonado": MesAbonado, //String
      "Recargo": Recargo,       //Bool
      "Monto" : Monto           //Int
    });
    var ipAltaDatos = this.ipCarpeta + "AltaDatos.php";

    this.http.post<string>(ipAltaDatos,datosAlta) //TODO: Hacer php que carge datos
    .subscribe((data : any) =>
    {
      //TODO: Mensaje de carga exitosa
    },
    (error : any) =>
    {
      //this.provider.error_conexion(); //TODO: Hacer error de conexion
    });

  }

  //TODO: Funcion que rebida datos y genere su PDF

  
}
