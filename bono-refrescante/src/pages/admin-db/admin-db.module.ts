import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AdminDbPage } from './admin-db';


@NgModule({
  declarations: [
    AdminDbPage,
  ],
  imports: [
    
    //IonicModule.forChild(AdminDbPage)
  ],
  exports: [
    AdminDbPage
  ]
})
export class AdminDbPageModule {}
