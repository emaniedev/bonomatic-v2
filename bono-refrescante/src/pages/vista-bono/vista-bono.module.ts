import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { VistaBonoPage } from './vista-bono';

@NgModule({
  declarations: [
    VistaBonoPage,
  ],
  imports: [
    //IonicModule.forChild(VistaBonoPage),
  ],
  exports: [
    VistaBonoPage
  ]
})
export class VistaBonoPageModule {}
