import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 *@module VistaBonoPage VistaBonoPage
 @parent MyApp
 * Generated class for the VistaBonoPage page.
 *
 * @memberOf MyApp
 */
@IonicPage()
@Component({
  selector: 'page-vista-bono',
  templateUrl: 'vista-bono.html',
  
})
export class VistaBonoPage {
/**
 *@function constructor
  
 * Creates an instance of VistaBonoPage.
 * 
 * @param {NavController} navCtrl
 * @param {NavParams} navParams
 * 
 * @memberOf VistaBonoPage
 */
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VistaBonoPage');
  }

}
