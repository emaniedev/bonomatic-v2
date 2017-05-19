import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MongoProvider} from '../../providers/mongo/mongo';
import {AdminDbDetallesPage} from '../admin-db-detalles/admin-db-detalles';


/**
 * Generated class for the AdminDbPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
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
  public usuariosEncontrados;

  constructor(private mongo : MongoProvider, private nav : NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminDbPage');
  }

  getUsuarios(){
    this.mongo.getUsuarios().subscribe(
      data => {
        this.usuariosEncontrados = data.json();
      },
      err => console.error(err),
      () => console.log("getUsuarios completado" + "esto es lo que trae "+ this.usuariosEncontrados[0].nombre)
    );
  };

  details(user){
    this.nav.push(AdminDbDetallesPage, {user:user});
    
  }

}
