import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AsociarPage } from './asociar';
import { FormsModule }   from '@angular/forms'; //Importamos esta libreria de angular para poder gestionar el formumlario.
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@NgModule({
  declarations: [
    AsociarPage,
  ],
  imports: [
    FormsModule,
    FormBuilder,
    FormGroup,//Inyectamos estas 3 clases del modulo FormsModule a nuestro modulo.
    Validators
  ],
  exports: [// Aquí le decimos a angular que es lo que vamos a exportar. En este caso nuestro modulo
    AsociarPage
  ]
})
export class AsociarPageModule {}
