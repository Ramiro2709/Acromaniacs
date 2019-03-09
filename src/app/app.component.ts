import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public sqlite: SQLite
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //this.createDatabase();
    });
  }

  /*
  private createDatabase(){
    this.sqlite.create({
      name: 'contactos_local.db',
      location: 'default' // the location field is required
    })
    .then((db : SQLiteObject) => {
      console.log("Base de datos: "+db);
      
      this.tasksService.setDatabase(db);
      //this.tasksService.prueba_borrartabla(); ////  Borra contenido de tabla contactos_local
      this.tasksService.createTable_contactos();
      return this.tasksService.createTable_numeros();
      
    })
    .catch(error =>{
      console.error(error);
    });
  }
  */
}
