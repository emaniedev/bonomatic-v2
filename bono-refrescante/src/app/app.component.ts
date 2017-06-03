//Imports
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {AdminDbPage} from '../pages/admin-db/admin-db';
import {VistaBonoPage} from '../pages/vista-bono/vista-bono';
import { AsociarPage } from '../pages/asociar/asociar';
import { AdminDbDetallesPage } from '../pages/admin-db-detalles/admin-deb-detalles';

import { CookieService } from 'ng2-cookies';

/**
 *
 * Clase que contiene toda la aplicación
 * 
 * @export
 * @module MyApp
 *@parent index
 */

@Component({
  templateUrl: 'app.html',
 
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  /**
   * @property rootPage
   *
   *Dicta cual es la página raíz
   * 
   * @type {*}
   * @memberOf MyApp
   */
  rootPage: any = AsociarPage;

  /**
  * @property pages
  *
  *Incluye en un array todas las páginas de la aplicación
  *
  * @memberOf MyApp
  */  
  pages: Array<{title: string, component: any, cb? : () => void }>;

  self = MyApp;

  /**
   * @function constructor
   *
   *Crea una instancia de la clase MyApp
   * 
   * @param {Platform} platform
   * @param {StatusBar} statusBar
   * @param {SplashScreen} splashScreen
   * @param {CookieService} cookie
   * 
   * @memberOf MyApp
   */
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
  private cookie : CookieService) {
    this.initializeApp();
    
    this.pages = [
      //{ title: 'Bonos', component: VistaBonoPage } ,
      {title: "Admin", component: AdminDbPage},
      {title: "Desasociar", component: AsociarPage}
    ];

  }
  /**
   * @function initializeApp
   *
   *Inicializa las variables necesarias para que la aplicación arranque.
   * 
   * @memberOf MyApp
   */
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if ( page.title == "Desasociar"){
      this.desasociar();
      this.nav.setRoot(page.component);
    }else {
      this.nav.setRoot(page.component);
    }
  }
/**
 *@function desasociar()
 * Función que nos permite desasociar nuestra aplicación de la inscripción activa, 
 * borra la cookie para que no se vuelva a autologuear.
 * @param void
 *
 * @parent MyApp
* */
  desasociar(){
    this.cookie.delete("logueado");
  }
}
