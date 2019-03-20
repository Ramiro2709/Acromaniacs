import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { File } from '@ionic-native/File/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import {SQLiteServiceService} from '../services/sqlite-service.service';

import{ModalSearchAlumnosPage} from './modal-search-alumnos/modal-search-alumnos.page';

import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent,
    ModalSearchAlumnosPage],
  entryComponents: [
    ModalSearchAlumnosPage
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    File,
    FileOpener,
    FileTransfer,
    SQLite,
    SQLiteServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
