import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AsociarPage } from './asociar';
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    AsociarPage,
  ],
  imports: [
    //IonicModule.forChild(AsociarPage),
    FormsModule
  ],
  exports: [
    AsociarPage
  ]
})
export class AsociarPageModule {}
