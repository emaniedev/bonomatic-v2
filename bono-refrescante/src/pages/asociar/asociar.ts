import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';//Importamos los modulos para gestionar el Formulario
                                                                    // y las validaciones.
import { AlertController } from 'ionic-angular';//Importamos el módulo que nos permite crear popups de alertas.


import { CookieService } from 'ng2-cookies';//Importamos el proveedor/factory/servicio que nos permite crear Cookies.
                                            //Se llama de estas 3 formas pero al final son lo mismo. Nos presta un servicio.
                                            //En este caso nos permite gestionar Cookies, puede ser un trozo de código que nos
                                            //permita hacer llamadas a apis, realizar funciones internas del dispositivo, o extraer
                                            //información de un fichero de configuración, etc...
                                            //Es una forma de tener el código mas encapsulado y estructurado.
import { MongoProvider } from '../../providers/mongo/mongo';//Importamos un servicio propio que me he hecho a modo de ejemplo de lo que 
                                                            //seria un provider. Tiene las funciones que llaman a la base de datos.

import {AdminDbDetallesPage} from '../admin-db-detalles/admin-db-detalles';

//Directivas de Angular e Ionic.
@IonicPage()
@Component({
  selector: 'page-asociar',
  templateUrl: 'asociar.html',
  })
/**
 *@module AsociarPage AsociarPage
 @parent MyApp
 * Clase que controla la vista de Asociar.
 *
 *@memberOf MyApp
 */
export class AsociarPage {
  /**
   *@property myForm
   * Contiene nuestro formulario
   * @memberOf AsociarPage
   */
  public myForm
  
  /**
   *@property inscripcion
   * Está bindeado a nuestro input con nombre inscripción, tb se podria sacar este dato del formulario.
   * @memberOf AsociarPage
   */
  public inscripcion;

  /**
   *@property dni
   * Está bindeado a nuestro input con nombre dni, tambien se podría sacar de nuestro formulario.
   * @memberOf AsociarPage
   */
  public dni;

  /**
   *@property usuario
   * Esta propiedad contiene toda la información de nuestro usuario.
   * @memberOf AsociarPage
   */
  public usuario;
  
  /**
   *@function constructor
   * Crea una instancia de AsociarPage.
   * Inicializa las propiedades y comprueba si ya ha habido una conexión anterior revisando las cookies.
   *
   *Podemos ver como en los parámetros que se le pasa hay objetos como "Provider","Builder" o "Service". Esta nomenclatura
   *solo sirve para estructurar más el código. Realmente son todos Provider o Proveedores.
  
   * @param {NavController} navCtrl
   *contiene los controles de navegación.
   * @param {NavParams} navParams
   *contiene el parámetro que se le pasa a la vista cuando se la llama.
   * @param {MongoProvider} mongo
   *inicializa la instancia del provider MongoProvider
   * @param {FormBuilder} fb
   *inicializa una instancia del builder FormBuilder
   * @param {AlertController} alertCtrl
   *inicializa una instancia del provider AlertController
   * @param {CookieService} cookie
   *inicializa una instancia del servicio CookieService
   * 
   * @memberOf AsociarPage
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, private mongo : MongoProvider, public fb:FormBuilder, 
  public alertCtrl: AlertController, private cookie : CookieService) {
    //Comprobamos si el usuario ya se ha logueado alguna vez.
    //Si ya se ha logueado tendrá una cookie que contiene el número de una inscripción. Se recupera la cookie
    //y se procede a encontrar el usuario y pasar a la pantalla con los bonos.
    if (this.cookie.check("logueado")){
      this.inscripcion = this.cookie.get("logueado");
      this.recuperarUser(); 
    }

    //Se construye el formulario y se aplican las validaciones necesarias por medio de la clase Validators y el siguiente objeto.
    this.myForm = this.fb.group({
      //Para el valor inscripcion le pasamos un array que contiene:
      //-Valor por defecto -> Este es el valor que queremos que tenga la inscripción cuando se genere el formulario.
      //-Array con todas las validaciones que le queramos aplicar -> Por medio de la clase Validator y sus métodos
      //introducimos en el array las validaciones que necesitamos.
        'inscripcion': ['', [Validators.required,Validators.minLength(4),Validators.maxLength(5)]],
        'dni': ['', [Validators.required, Validators.pattern(/^[0-9]{8}[-]?[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i)]],
      });
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsociarPage');
  }

  /**
   *@function loguin()
  
   * Encapsulo el método que realiza la asociación de la aplicación con un nombre mas literal.
   * 
   * @memberOf AsociarPage
   */
  login(){
    this.asociar();
  }

  /**
   *@function comprobar()
   * Esta es una función de utillaje que sólo tiene sentido dentro de esta clase en concreto. Nos hace las comprobaciones
   *necesarias para efectuar un login. Recoge un usuario de la bd y comprueba si el dni que ha metido el usuario coincide con
   *el que viene de la base de datos, en este caso la aplicación da paso a su página de bonos.
   * 
   * @private
   * @param void
   * @memberOf AsociarPage
   */
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

  /**
   *@function recuperarUser()
   * Esta es una función de utillaje. Se utiliza en nuestro constructor si se detecta que la asociación ya se ha hecho una vez.
   *Recoge la información de la cookie y con ella encuentra el usuario. Si todo ha salido bien, pasa a su página de bonos.
   *Utiliza nuestro proveedor MongoProvider.
  
     *@param data
   *Este objeto contiene el usuario en cuestión, se pasa a json y se asigna
   *@param err
   *Si da error se ejecuta lo que este en este parametro
   *@param funcion
   * Cuando se completa la consulta a la bd se lanza la función que pongamos aqui.
   * 
   * @private
   * 
   * @memberOf AsociarPage
   */
  private recuperarUser(){
    this.mongo.getUsuario(Number.parseInt(this.inscripcion)).subscribe(
        data => {
          this.usuario = { "user":data.json()};
        },
        err => this.showAlert(),
        () => this.navCtrl.setRoot(AdminDbDetallesPage, { user : this.usuario.user[0] })
      );
  }

  /**
   *@function asociar()
   * Función de utillaje que recupera el usuario de la base de datos a traves de su numero de inscripción.
   *Utiliza nuestro proveedor MongoProvider.
   * @param void
   * @private
   * 
   * @memberOf AsociarPage
   */
  private asociar(){
    this.mongo.getUsuario(Number.parseInt(this.inscripcion)).subscribe(
      data => {
        this.usuario = { "user":data.json()};
      },
      err => this.showAlert(),
      () => this.comprobar()  
    );
    
  }
  /**
   *@function showAlert()
   * Función que nos muestra un alert cuando el lógin no se ha realizado con éxito.
   * 
   * @param void
   * @memberOf AsociarPage
   */
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Malas credenciales',
      subTitle: 'Has introducido mal la subscripción o el DNI',
      buttons: ['Reintentar']
    });
    alert.present();
    this.vaciarCampos();
  }

  /**
   *@function vaciarCampos()
   * Función que solo limpia los campos del formulario. Se utiliza para vaciar los campos despues de un alert de error.
   * 
   * @param void
   * @memberOf AsociarPage
   */
  vaciarCampos(){
   this.inscripcion = "";
   this.dni = "";
  }


}
