import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MongoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MongoProvider {

  constructor(private http: Http) {
    console.log('Hello MongoProvider Provider');
  }
  // ##Consigue una lista de todos los Usuarios en la BD
  getUsuarios (){
    let usuarios = this.http.get("http://localhost:3000/api/pub/usuarios");
    return usuarios;
  };

  // ##Permite introducir un usuario en la base de datos
  postUsuarios(){

  };

  getBono(id){
    let bonos = this.http.get("http://localhost:3000/api/pub/bono/"+id);
    return bonos;
  }
  



}
