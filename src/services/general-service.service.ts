import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {
  public updateDeletedAlumnos; observable; observer;
  public EditandoAlumno;

  constructor() { 
    this.updateDeletedAlumnos = false;
    this.observable = Observable.create(observer => {
      this.observer = observer;
    });

    

  }


  public UpdateDeletedAlumnos(){
    setTimeout(() => {
      // NOTE notify all the subscribers
      this.observer.next();
    }, 200);
  }
}
