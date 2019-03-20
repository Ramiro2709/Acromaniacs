import { Component } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

//Servicios
import {MySQLService} from '../../services/my-sql.service';
import {AlertService} from '../../services/alert.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private plt: Platform,  
    private MySql: MySQLService, 
    private alertService: AlertService,
    public modalCtrl: ModalController,
    private router: Router){ 

  }

  CrearAlumno(){
    this.router.navigate(['/crear-alumno']); 
  }

} // Fin class Tab2Page

