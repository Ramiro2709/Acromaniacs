import { Injectable,Injector } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import {AlertService} from './alert.service';
//import {ModalSearchAlumnosPage} from '../app/modal-search-alumnos/modal-search-alumnos.page';

@Injectable({
  providedIn: 'root',

})
export class MySQLService {
  ipCarpeta : string = "http://localhost/acromaniacs/"; //Direccion local
  //ipCarpeta : string = "http://192.168.0.102/acromaniacs/"; //WIFI local
  datosAlta;
  alertService : any;
  AlumnosArray;
  AlumnosReceibed = false;
  modal;

  constructor(public http: HttpClient, public injector: Injector) { 
    this.alertService = injector.get(AlertService);

    this.AlumnosArray = [];

    //Para que ande el post
    const httpOptions = { 
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': ''
      })
    };

  }

  enviarBase(IdAlumno: number, Fecha: Date, MesAbonado: string,anioAbonado, Recargo: boolean, Monto: number, NombreApellido: string){
    //console.log(Recargo);
    this.datosAlta = JSON.stringify({
      "IdAlumno": IdAlumno,     //Int
      "Fecha": Fecha,           //Date
      "MesAbonado": MesAbonado, //String
      "anioAbonado": anioAbonado, 
      "Recargo": Recargo,       //Bool
      "Monto" : Monto           //Int
    });
    var ipAltaDatos = this.ipCarpeta + "altaDatos.php";
    
    //this.alertService.ShowLoader();
    this.alertService.present();
    this.http.post<string>(ipAltaDatos,this.datosAlta)
    .subscribe((data : any) =>
    {
      //console.log("Subscribe Post");
      this.alertService.dismiss();
      this.alertService.AltaExitosa(IdAlumno, Fecha, MesAbonado, Recargo, Monto,NombreApellido);
    },
    (error : any) =>
    {
      //console.log("Error POST");
      this.alertService.dismiss();
      this.alertService.AltaError(IdAlumno, Fecha, MesAbonado, Recargo, Monto,NombreApellido);
    });
  }

  AltaAlumno(form){
    //TODO: Alta de cursos a los que pertecene el alumno
    form = JSON.stringify(form);
    var ipAltaDatos = this.ipCarpeta + "altaAlumnos.php";
    this.alertService.present();

    this.http.post<string>(ipAltaDatos,form)
    .subscribe((data : any) =>
    {
      //console.log("Subscribe Post");
      this.alertService.dismiss();
      this.alertService.AltaAlumnoExitosa();
    },
    (error : any) =>
    {
      //console.log("Error POST");
      console.log(error);
      this.alertService.dismiss();
      this.alertService.AltaAlumnoError();
    });
  }
  /*
  var lenght = data['lenght'];
      for(let i=0;i<lenght;i++){
        this.AlumnosArray.push({
          nombre: data[i]['nombre'],
          apellido: data[i]['apellido'],
          idAlumno: data[i]['idAlumno']
        })
  */
  
  GetAlumnos(){
    this.AlumnosReceibed = false;
    var ipAltaDatos = this.ipCarpeta + "getAlumnos.php";
    this.AlumnosArray = [];
    //TODO: poner alert de no hay conexion con el servidor
    this.http.get(ipAltaDatos)
    .subscribe((data : any) =>
    {
      //console.log("Subscribe Post");
      var lenght = data['lenght'];
      for(let i=0;i<lenght;i++){
        this.AlumnosArray.push({
          nombre: data[i]['nombre'],
          apellido: data[i]['apellido'],
          idAlumno: data[i]['idAlumno']
        });
      }
      
      //this.modal.startModal();

      console.log(this.AlumnosArray);
    },
    (error : any) =>
    {
      //console.log("Error POST");
      console.log(error);
    });

  }


  
}
