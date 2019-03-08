import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable({
  providedIn: 'root'
})
export class SQLiteServiceService {

  db: SQLiteObject = null;

  constructor() { }

  //Setea base SQLite
  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  //Crea tabla alumnos
  createTable_alumnos(){
    let sql = 'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER)';
    return this.db.executeSql(sql, []);
  }
}
