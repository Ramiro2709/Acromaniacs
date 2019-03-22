import { Component, OnInit, Injector } from '@angular/core';
import { NavParams } from '@ionic/angular';
import {ModalController } from '@ionic/angular';

import {MySQLService} from '../../services/my-sql.service';

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

  constructor(navParams: NavParams, private modalController: ModalController, public injector: Injector) { 
    this.MySql = injector.get(MySQLService);
    //this.TodosAlumnos = this.MySql.AlumnosArray;
    
  }

  ngOnInit() {
    //this.TodosAlumnos = this.MySql.AlumnosArray;
    // TODO: Arreglar, crearAlumnos se ejecuta antes que alla respuesta del servidor
    console.log("Init;");
    this.MySql.GetAlumnos();
    
  }

  startModal(){
    this.TodosAlumnos = new Array();
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
    
    for(let i=0;i<this.MySql.AlumnosArray.length;i++){
      var mysqlNombre:any;
      var mysqlApellido:any;
      if (this.MySql.AlumnosArray[i]['nombre'] == null){mysqlNombre = "null";}
      else {mysqlNombre = this.MySql.AlumnosArray[i]['nombre'];}
      if (this.MySql.AlumnosArray[i]['apellido'] == null){mysqlApellido = "null";}
      else {mysqlApellido = this.MySql.AlumnosArray[i]['apellido'];}
      //console.log(mysqlNombre);
      //console.log(mysqlApellido);
      //console.log(this.TodosAlumnos);

      //TODO: arreglar esto

      //this.TodosAlumnos[i]['NombreApellido'] = mysqlNombre + " " + mysqlApellido;
      //this.TodosAlumnos[i]['idAlumno'] = this.MySql.AlumnosArray[i]['idAlumno'];
      this.TodosAlumnos.push({
        nombreApellido: mysqlNombre + " " + mysqlApellido,
        idAlumno: this.MySql.AlumnosArray[i]['idAlumno']
      });
      console.log("TodosAlumnos"+this.TodosAlumnos);

    }
    
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
    console.log(this.alumnos);
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
  
  setAlumno(nombreApellido,idAlumno){
    console.log("Nombre: "+nombreApellido+" ; idAlumno: "+idAlumno);
    this.modalController.dismiss({
      'name': nombreApellido,
      'idAlumno' : idAlumno
    });
  }
  
  dismissModal(){
    
  }

}
