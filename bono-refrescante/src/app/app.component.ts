import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {AdminDbPage} from '../pages/admin-db/admin-db';
import {VistaBonoPage} from '../pages/vista-bono/vista-bono';
import {AsociarPage} from '../pages/asociar/asociar';

import { CookieService } from 'ng2-cookies';



@Component({
  templateUrl: 'app.html',
 
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AsociarPage;

  pages: Array<{title: string, component: any, cb? : () => void }>;

  self = MyApp;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
  private cookie : CookieService) {
    this.initializeApp();
    

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Bonos', component: VistaBonoPage } ,
      {title: "Admin", component: AdminDbPage},
      {title: "Desasociar", component: AsociarPage}
    ];

  }

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

  desasociar(){
    this.cookie.delete("logueado");
  }
}
