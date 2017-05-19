import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {AdminDbPage} from '../pages/admin-db/admin-db';
import {AdminDbDetallesPage} from '../pages/admin-db-detalles/admin-db-detalles';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MongoProvider } from '../providers/mongo/mongo';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AdminDbPage,
    AdminDbDetallesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AdminDbPage,
    AdminDbDetallesPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, MongoProvider
  ]
})
export class AppModule {}