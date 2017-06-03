import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MongoProvider} from '../../providers/mongo/mongo';
import {AdminDbDetallesPage} from '../admin-db-detalles/admin-db-detalles';


/**
 * @module AdminDbPage AdminDbPage
 *@parent MyApp
 * Generated class for the AdminDbPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 *@memberOf MyApp
 */
@IonicPage()
@Component({
  selector: 'page-admin-db',
  templateUrl: 'admin-db.html',
  providers: [
    MongoProvider
    ]
})
export class AdminDbPage {
  // Contiene una lista con todos los usuarios de la aplicación
  public usuariosEncontrados;

/**
 * @function constructor
 *
 * Instancia AdminDbPage
 * 
 * @param {MongoProvider} mongo
 * @param {NavController} nav
 * 
 * @parent AdminDbPage
 */
  constructor(private mongo : MongoProvider, private nav : NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminDbPage');
  }

  /**
   *@function getUsuarios()
   * Función que nos da acceso a los usuarios de la BD.
   * Los mete en un objeto llamado data.
   *
   *@param data
   *Este objeto contiene el usuario en cuestión, se pasa a json y se asigna
   *@param err
   *Si da error se ejecuta lo que este en este parametro
   *@param funcion
   * Cuando se completa la consulta a la bd se lanza la función que pongamos aqui.
   * @memberOf AdminDbPage
   */
  getUsuarios(){
    this.mongo.getUsuarios().subscribe(
      data => {
        this.usuariosEncontrados = data.json();
      },
      err => console.error(err),
      () => console.log("getUsuarios completado" + "esto es lo que trae "+ this.usuariosEncontrados[0])
    );
  };

/**
 * @function details
 *
 *Nos lleva a una página de detalles del usuario en cuestión.
 * 
 * @param {any} user
 * 
 * @memberOf AdminDbPage
 */
  details(user){
    this.nav.push(AdminDbDetallesPage, {user:user});
    
  }

}
