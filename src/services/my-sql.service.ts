import { Injectable,Injector } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import {AlertService} from './alert.service';
//import {ModalSearchAlumnosPage} from '../app/modal-search-alumnos/modal-search-alumnos.page';

import { Observable, of, throwError } from 'rxjs';
import { forkJoin } from 'rxjs';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root',

})
export class MySQLService {
  ipCarpeta : string = "http://localhost/acromaniacs/"; //Direccion local
  //ipCarpeta : string = "http://192.168.0.7/acromaniacs/"; //WIFI local
  datosAlta;
  alertService : any;
  AlumnosArray;
  AlumnosReceibed = false;
  modal;
  boolEliminarAlumno = false;

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
      this.GetAlumnos(); //Actualiza alumnos
      
    },
    (error : any) =>
    {
      //console.log("Error POST");
      this.alertService.dismiss();
      this.alertService.AltaError(IdAlumno, Fecha, MesAbonado, Recargo, Monto,NombreApellido);
    });
  }

  AltaAlumno(form){
    form = JSON.stringify(form);
    var ipAltaDatos = this.ipCarpeta + "altaAlumnos.php";
    this.alertService.present();

    this.http.post<string>(ipAltaDatos,form)
    .subscribe((data : any) =>
    {
      //console.log("Subscribe Post");
      this.GetAlumnos();
      this.alertService.dismiss();
      this.alertService.AltaAlumnoExitosa();
    },
    (error : any) =>
    {
      //console.log("Error POST");
      this.GetAlumnos();
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
    this.http.get(ipAltaDatos)
    .subscribe((data : any) =>
    {
      //console.log("Subscribe Post");
      var AlumnosObtenidos = data;

      //var lenght = AlumnosObtenidos['lenght'];
      //console.log(lenght);
      //Agregar comprobantes
      this.AlumnosArray = AlumnosObtenidos;
      //console.log(AlumnosObtenidos)

      /*
      for(let i=0;i<lenght;i++){
        this.AlumnosArray.push({
          nombre: AlumnosObtenidos[i]['nombre'],
          apellido: AlumnosObtenidos[i]['apellido'],
          idAlumno: AlumnosObtenidos[i]['idAlumno'],
          IdClaseAlumno : AlumnosObtenidos[i]['IdClaseAlumno'],
          horarioLunes: AlumnosObtenidos[i]["horarioLunes"],
          horarioMartes: AlumnosObtenidos[i]["horarioMartes"],
          horarioMiercoles: AlumnosObtenidos[i]["horarioMiercoles"],
          horarioJueves: AlumnosObtenidos[i]["horarioJueves"],
          horarioViernes: AlumnosObtenidos[i]["horarioViernes"],
          horarioSabado: AlumnosObtenidos[i]["horarioSabado"],
        });
      }
      */
      
      //this.modal.startModal();
      this.AlumnosArray = this.objectToArray(this.AlumnosArray)
      console.log(this.AlumnosArray);
      
    },
    (error : any) =>
    {
      //console.log("Error POST");
      console.log(error);
    });

  }

  objectToArray = function(obj) {
    var arr =[];
    for(let o in obj) {
      //console.log(o);
      if (obj.hasOwnProperty(o)) {
        arr.push(obj[o]);
      }
    }
    return arr;
  };

  
  public BoolEliminarAlumno(){
    this.boolEliminarAlumno = true;
  }

  EliminarAlumnoService(idAlumno){
    //TODO Eliminar alumno seleccionado
    var ipEliminarAlumno = this.ipCarpeta + "eliminarAlumno.php";
    this.http.post<string>(ipEliminarAlumno,idAlumno)
    .subscribe((data : any) =>
    {
      //console.log("Subscribe Post");
      this.GetAlumnos(); //Actualiza alumnos
      //this.alertService.dismiss();
      //this.alertService.AltaAlumnoExitosa();
    },
    (error : any) =>
    {
      //console.log("Error POST");
      this.GetAlumnos();
      //console.log(error);
      //this.alertService.dismiss();
      //this.alertService.AltaAlumnoError();
      
    });
    
  }
  
  
}
