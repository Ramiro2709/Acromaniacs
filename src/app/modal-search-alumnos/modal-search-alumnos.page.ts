import { Component, OnInit, Injector } from '@angular/core';
import { NavParams } from '@ionic/angular';
import {ModalController, AlertController } from '@ionic/angular';

import {MySQLService} from '../../services/my-sql.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-modal-search-alumnos',
  templateUrl: './modal-search-alumnos.page.html',
  styleUrls: ['./modal-search-alumnos.page.scss'],
})
export class ModalSearchAlumnosPage implements OnInit {
  // "value" passed in componentProps
  searchQuery: string = '';
  alumnos: string[];
  TodosAlumnos: any[];
  MySql;
  Alert;
  error;

  constructor(navParams: NavParams, private alertController: AlertController, private modalController: ModalController, public injector: Injector) { 
    this.MySql = injector.get(MySQLService);
    this.Alert = injector.get(AlertService);
    //this.TodosAlumnos = this.MySql.AlumnosArray;
    
  }

  ngOnInit() {
    
    //console.log("Init;");
    this.startModal();
    
  }

  startModal(){
    //this.MySql.GetAlumnos();
    this.error = false;
    this.TodosAlumnos = new Array();
    if(this.MySql.AlumnosArray.length == 0){
      let alert1 = this.Alert.GetAlumnosError();
      //alert1.present();
      console.log("asd"); 
    }
    this.crearAlumnos();
    this.initializeAlumnos();
  }

  ionModalDidPresent(){
    /*
    this.TodosAlumnos = new Array();
    this.crearAlumnos();
    this.initializeAlumnos();
    */
  }

  
  crearAlumnos(){
    
    this.TodosAlumnos = this.MySql.AlumnosArray;

    //console.log(Object.keys(this.MySql.AlumnosArray).length);
    //TODO: lengh ?
    for(let i=0;i<(Object.keys(this.MySql.AlumnosArray).length - 1);i++){
      //console.log(this.MySql.AlumnosArray[i]['nombre']);
      var mysqlNombre:any;
      var mysqlApellido:any;
      if (this.MySql.AlumnosArray[i]['nombre'] == null){mysqlNombre = "null";}
      else {mysqlNombre = this.MySql.AlumnosArray[i]['nombre'];}
      if (this.MySql.AlumnosArray[i]['apellido'] == null){mysqlApellido = "null";}
      else {mysqlApellido = this.MySql.AlumnosArray[i]['apellido'];}
      //console.log(mysqlNombre);
      //console.log(mysqlApellido);
      //console.log(this.TodosAlumnos +" "+i);


      this.TodosAlumnos[i]['NombreApellido'] = mysqlNombre + " " + mysqlApellido;
      //this.TodosAlumnos[i]['idAlumno'] = this.MySql.AlumnosArray[i]['idAlumno'];
      var monto = this.ObtenerMonto(i);
      this.TodosAlumnos[i]['monto'] = monto;

      /*
      this.TodosAlumnos.push({
        nombreApellido: mysqlNombre + " " + mysqlApellido,
        idAlumno: this.MySql.AlumnosArray[i]['idAlumno'],
        IdClaseAlumno : this.MySql.AlumnosArray[i]['IdClaseAlumno'],
        horarioLunes:this.MySql.AlumnosArray[i]["horarioLunes"],
        horarioMartes: this.MySql.AlumnosArray[i]["horarioMartes"],
        horarioMiercoles: this.MySql.AlumnosArray[i]["horarioMiercoles"],
        horarioJueves: this.MySql.AlumnosArray[i]["horarioJueves"],
        horarioViernes: this.MySql.AlumnosArray[i]["horarioViernes"],
        horarioSabado: this.MySql.AlumnosArray[i]["horarioSabado"],
        monto: monto,
      });
      */
      
    }
    //console.log("TodosAlumnos"+this.TodosAlumnos[26]['IdClaseAlumno']);
    
  }

  initializeAlumnos(){
    /*
    this.alumnos = [
      'Alumno1',
      'Alumno2',
      'Alumno3',
      'Alumno4',
      'Alumno5',
      'Alumno6',
      'Alumno7',
      'Alumno8',
    ];
    */
    this.alumnos = this.TodosAlumnos;
    //this.alumnos = this.MySql.AlumnosArray;
    //console.log(this.alumnos);
    //console.log(this.alumnos[1]['nombre']);
    
  }

  
  getAlumnos(ev: any) {
    // Reset items back to all of the items
    //this.crearAlumnos()
    this.initializeAlumnos();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.alumnos = this.alumnos.filter((item) => {
        //console.log(item['idAlumno']);
        return (item['nombreApellido'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  
  setAlumno(alumno){
    //console.log("Nombre: "+alumno.NombreApellido+" ; idAlumno: "+alumno.idAlumno+" ; IdClase: "+alumno.monto);
    this.modalController.dismiss({
      'name': alumno.NombreApellido,
      'idAlumno' : alumno.idAlumno,
      'monto' : alumno.monto
    });
  }
  
  public dismissModal(){
    this.modalController.dismiss();
  }

  ObtenerMonto(i){
    var CantClases = 0;
    var Monto
    if (this.MySql.AlumnosArray[i]["Clases"]["horarioLunes"] != "false"){ CantClases++;}
    if (this.MySql.AlumnosArray[i]["Clases"]["horarioMartes"] != "false"){CantClases++;}
    if (this.MySql.AlumnosArray[i]["Clases"]["horarioMiercoles"] != "false"){CantClases++;}
    if (this.MySql.AlumnosArray[i]["Clases"]["horarioJueves"] != "false"){CantClases++;}
    if (this.MySql.AlumnosArray[i]["Clases"]["horarioViernes"] != "false"){CantClases++;}
    if (this.MySql.AlumnosArray[i]["Clases"]["horarioSabado"] != "false"){CantClases++;}
    //console.log(this.MySql.AlumnosArray[i] + " " +CantClases);

    switch(CantClases) { 
      case 1: { 
         Monto = 600;
         break; 
      } 
      case 2: { 
         Monto = 1000;
         break; 
      } 
      case 3: { 
        Monto = 1300;
        break; 
      }
      case 4: { 
        Monto = 1600;
        break; 
      }
      case 5: { 
        Monto = 1900;
        break; 
      }
      case 6: {
        Monto = 2200;
        break; 
      }
      default: { 
         Monto = 0;
         break; 
      } 
   } 

   return Monto;

  }

}
