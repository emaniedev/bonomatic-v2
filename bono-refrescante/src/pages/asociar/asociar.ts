import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MongoProvider} from '../../providers/mongo/mongo';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private mongo : MongoProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsociarPage');
  }

  asociar(){
    
  }

}
