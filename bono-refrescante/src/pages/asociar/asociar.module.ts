import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AsociarPage } from './asociar';

@NgModule({
  declarations: [
    AsociarPage,
  ],
  imports: [
    //IonicModule.forChild(AsociarPage),
  ],
  exports: [
    AsociarPage
  ]
})
export class AsociarPageModule {}
