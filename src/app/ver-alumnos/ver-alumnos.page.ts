import { Component, OnInit, Injector } from '@angular/core';
import {ModalController } from '@ionic/angular';

import {MySQLService} from '../../services/my-sql.service';
import {AlertService} from '../../services/alert.service';
import {GeneralServiceService} from '../../services/general-service.service';

import {VerDatosAlumnoPage} from '../ver-datos-alumno/ver-datos-alumno.page';

@Component({
  selector: 'app-ver-alumnos',
  templateUrl: './ver-alumnos.page.html',
  styleUrls: ['./ver-alumnos.page.scss'],
})
export class VerAlumnosPage implements OnInit {
  MySql; Alerts;
  alumnos: string[];
  alumnosMartes: string[];
  alumnosLunes : string[];
  filtroAlumnos;
  todosAlumnos;

  constructor(public injector: Injector, private modalController: ModalController, private generalService: GeneralServiceService) { 
    this.Alerts = injector.get(AlertService);

    // We subscribe to the observable to be notified when
      // the data is ready
      this.generalService.observable.subscribe(() => {
        //Hace cosas
        console.log("Recibio Observable");
        this.IniciarAlumnos();
      });
  }

  //Se carga cuando entra la vista
  ionViewWillEnter(){
    console.log("Entro vista");
    this.IniciarAlumnos();
    this.FiltrarAlumnosClases()
  }

  ngOnInit() {
    this.MySql = this.injector.get(MySQLService);
    if(this.MySql.AlumnosArray.length == 0){
      // ** Si no hay alumnos en el array (mysqlService), muestra alert (alertservice)
      let alert1 = this.Alerts.GetAlumnosError();
    }
    
    this.IniciarAlumnos();
    
    
    //console.log(this.alumnos[0]);

    /*
    this.alumnosLunes = new Array();
    this.alumnosMartes = new Array();

    console.log((Object.keys(this.alumnos).length - 1));
    for (let i=0;i < (Object.keys(this.alumnos).length - 1);i++){
      if (this.alumnos[i]['horarioLunes'] != "false"){
        this.alumnosLunes.push(this.alumnos[i]);
      }
      if (this.alumnos[i]['horarioMartes'] != "false"){
        this.alumnosMartes.push(this.alumnos[i]);
      }
    }
    console.log(this.alumnosLunes[0]);
    //console.log(this.alumnosMartes);
    */
  }

  public IniciarAlumnos(){
    this.todosAlumnos = new Array();
    this.alumnos = new Array();
    this.todosAlumnos = this.MySql.AlumnosArray;
    console.log(this.todosAlumnos);
    for(let i=0;i<(Object.keys(this.MySql.AlumnosArray).length);i++){
      var mysqlNombre:any;
      var mysqlApellido:any;
      if (this.MySql.AlumnosArray[i]['nombre'] == null){mysqlNombre = "null";}
      else {mysqlNombre = this.MySql.AlumnosArray[i]['nombre'];}
      if (this.MySql.AlumnosArray[i]['apellido'] == null){mysqlApellido = "null";}
      else {mysqlApellido = this.MySql.AlumnosArray[i]['apellido'];}
      //console.log(this.todosAlumnos[i]);
      this.todosAlumnos[i]['NombreApellido'] = mysqlNombre + " " + mysqlApellido;
    }
  }

  ReiniciarAlumnos(){
    this.alumnos = this.todosAlumnos;
  }

  FiltrarAlumnosClases() {
    // Diseño: Entrada: Array de alumnos entero, valor a filtrar ; Salida: Array filtrado
    // Analisis: for recorre elementos, si [i]['Clases'] != 'false', lo agrega al array
    this.alumnos = new Array();
    var horario = "horario" + this.filtroAlumnos;
    this.todosAlumnos.forEach(element => {
      //console.log(element);
      
      /*
      switch (this.filtroAlumnos){
        case "Lunes":{
          //console.log(element['Clases']['horarioLunes'])
          if (element['Clases']['horarioLunes'] != "false"){
            this.alumnos.push(element);
          }
          break;
        }
        case "Martes":{
          //console.log(element['Clases']['horarioLunes'])
          if (element['Clases']['horarioMartes'] != "false"){
            this.alumnos.push(element);
          }
          break;
        }
      }
      */
      if (element['Clases'][horario] != "false"){
        this.alumnos.push(element);
      }
    });


  }

  async VerDatosAlumno(alumno) {
    console.log(alumno);
    const modal = await this.modalController.create({
      component: VerDatosAlumnoPage,
      componentProps: { alumno: alumno }
    });
    await modal.present();
    await modal.onDidDismiss(); //Cuando el modal se cierra
    //TOD Hecho Al confirmar alert recargar alumnos, Ver Obserbables
    //this.IniciarAlumnos();
    //console.log("On did dismiss");
  }


}
