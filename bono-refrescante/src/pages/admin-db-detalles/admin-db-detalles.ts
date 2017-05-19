import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdminDbDetallesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-admin-db-detalles',
  templateUrl: 'admin-db-detalles.html',
})
export class AdminDbDetallesPage {
  public usuario;
  constructor(public navCtrl: NavController, public param: NavParams ) {
    this.usuario = param.data.user;
    console.log (param);
    console.log(this.usuario)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminDbDetallesPage');
  }

}
