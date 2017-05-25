import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AlertController } from 'ionic-angular';


import { CookieService } from 'ng2-cookies';
import {MongoProvider} from '../../providers/mongo/mongo';
import {AdminDbDetallesPage} from '../admin-db-detalles/admin-db-detalles';
/**
 * Generated class for the AsociarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-asociar',
  templateUrl: 'asociar.html',
})
export class AsociarPage {
  public myForm
  public inscripcion;
  public dni;
  public usuario;
  private resultado;
  constructor(public navCtrl: NavController, public navParams: NavParams, private mongo : MongoProvider, public fb:FormBuilder, 
  public alertCtrl: AlertController, private cookie : CookieService) {
    
    if (this.cookie.check("logueado")){
      this.inscripcion = this.cookie.get("logueado");
      this.recuperarUser(); 
    }
      this.myForm = this.fb.group({
        'inscripcion': ['', [Validators.required,Validators.minLength(4),Validators.maxLength(5)]],
        'dni': ['', [Validators.required, Validators.pattern(/^[0-9]{8}[-]?[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i)]],
      });
    

  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsociarPage');
  }

  //Da acceso a la aplicación.
  login(){
    this.asociar();
  }

  //Hace las comprobaciónes necesarias
  private comprobar(){
    
      if(this.usuario.user.length == 0 || this.usuario.user[0].dni == "error"){
        
          this.showAlert();

      }else{
        if (this.usuario.user[0].dni == this.dni){
          console.log("usuario validado");
          this.navCtrl.setRoot(AdminDbDetallesPage, { user : this.usuario.user[0] });
          this.cookie.set("logueado", this.inscripcion);
        }else{
          console.log("usuario no validado");
          this.showAlert();
        }
      }
}
private recuperarUser(){
  this.mongo.getUsuario(Number.parseInt(this.inscripcion)).subscribe(
      data => {
        this.usuario = { "user":data.json()};
      },
      err => console.log("Fallo al recuperar usuario. " + err),
      () => this.navCtrl.setRoot(AdminDbDetallesPage, { user : this.usuario.user[0] })
    );
}

  //Realiza la acción de buscar a quien pertenece la subscripcion.
  private asociar(cb?){
    this.mongo.getUsuario(Number.parseInt(this.inscripcion)).subscribe(
      data => {
        this.usuario = { "user":data.json()};
      },
      err => console.log("Fallo al recuperar usuario. " + err),
      () => this.comprobar()  
    );
    
  }
  // Modal para ver si no se ha logueado correctamente
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Malas credenciales',
      subTitle: 'Has introducido mal la subscripción o el DNI',
      buttons: ['Reintentar']
    });
    alert.present();
    this.vaciarCampos();
  }

  vaciarCampos(){
   this.inscripcion = "";
   this.dni = "";
  }


}
