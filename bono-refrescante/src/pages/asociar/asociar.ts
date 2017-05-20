import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MongoProvider} from '../../providers/mongo/mongo';
import {AdminDbDetallesPage} from '../admin-db-detalles/admin-db-detalles';
/**
 * Generated class for the AsociarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-asociar',
  templateUrl: 'asociar.html',
})
export class AsociarPage {
  public inscripcion;
  public dni;
  public usuario;
  public error = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private mongo : MongoProvider) {
    this.error = {
      "texto" : "",
      "invisible" : true
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsociarPage');
  }

  login(){
    if (this.asociar()){
      this.navCtrl.push(AdminDbDetallesPage, { user : this.usuario.user[0]});
    } else {
      this.error= {
        "texto" : "Fallo al loguear, introduzca bien los datos.",
        "invisible" : false
      } ;
    }
  }

  asociar(){
    this.mongo.getUsuario(Number.parseInt(this.inscripcion)).subscribe(
      data => {
        this.usuario = { "user":data.json()};
        console.log(this.usuario.user[0]);
      },
      err => console.log("Fallo al recuperar usuario. " + err),
      () => console.log("Usuario recuperado con exito." + this.usuario.user[0].dni)
    );
    console.log("Este dni esta -> " + this.dni);
    console.log("Este inscripcion esta -> " + this.inscripcion);
    console.log("Este dni traigo -> " + this.usuario.user[0].dni);

    if (this.usuario.user[0].dni == this.dni){
      return true;
    }else{
      return false;
    }

  }

}
