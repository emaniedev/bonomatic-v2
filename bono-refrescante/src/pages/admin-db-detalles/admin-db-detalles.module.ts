import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AdminDbDetallesPage } from './admin-db-detalles';

@NgModule({
  declarations: [
    AdminDbDetallesPage,
  ],
  imports: [
    //IonicModule.forChild(AdminDbDetallesPage),
  ],
  exports: [
    AdminDbDetallesPage
  ]
})
export class AdminDbDetallesPageModule {}
