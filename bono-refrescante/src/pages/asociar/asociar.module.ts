import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AsociarPage } from './asociar';
import { FormsModule }   from '@angular/forms';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@NgModule({
  declarations: [
    AsociarPage,
  ],
  imports: [
    //IonicModule.forChild(AsociarPage),
    FormsModule,
    FormBuilder,
    FormGroup,
    Validators
  ],
  exports: [
    AsociarPage
  ]
})
export class AsociarPageModule {}
