import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MongoProvider} from '../../providers/mongo/mongo';
/**
 *@module AdminDbDetallesPage AdminDbDetallesPage
 @parent MyApp
 * Generated class for the AdminDbDetallesPage page.
 *
 * @memberOf MyApp
 */
@IonicPage()
@Component({
  selector: 'page-admin-db-detalles',
  templateUrl: 'admin-db-detalles.html',
  providers: [
    MongoProvider
    ]
})
export class AdminDbDetallesPage {
  /**
   *@property usuarios
   * Contiene el objeto del usuario que ha entrado en esta vista.
   * @memberOf AdminDbDetallesPage
   */
  public usuario;



  /**
   *@property listaFinal
   * Contiene la lista de bonos que se muestra al final, despues de haber realizado
   * el filtrado de si lo ha usado o no.
   * @memberOf AdminDbDetallesPage
   */
  public listaFinal= [];

  /**
   *@function Constructor()
   * Crea una instancia de la Clase. En el parámetro param nos llega el usuario que ha llamado ha esta vista.
   * 
   * @param {NavController} navCtrl
   * @param {NavParams} param
   * @param {MongoProvider} mongo
   * 
   * @memberOf AdminDbDetallesPage
   */
  constructor(public navCtrl: NavController, public param: NavParams, private mongo : MongoProvider ) {
    this.usuario = param.data.user;
    this.conseguirLista();
     
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminDbDetallesPage');
  }

  
  /**
   * @function conseguirLista
   *
   *Nos crea una lista de los bonos que aún están por usar, usa la lista de bonos que tiene el usuario y quita los bonos que ya a gastado.
   * @param void
   * 
   * @memberOf AdminDbDetallesPage
   */
  conseguirLista() {
    var usuario = this.usuario;
    var listaFinal = this.listaFinal;
    usuario.bonos.forEach(function (bono) {
      usuario.bonosusados.forEach(function (bonousado) {
        if (bono._id != bonousado._id) {
          listaFinal.push(bono);
        }
      })
    })
  }

  /// -- El código de aqui era todo el código que llevaba esta vista cuando no era capaz de hacer
  /// -- un JOIN con MongoDB. Una vez supe hacer la consulta con el JOIN todo se resumio a navegar por el 
  /// -- objeto que tengo en la variable usuario.
  /*

  getBonos(){
    var bonos = this.usuario.bonos;
    var mongo = this.mongo;
    return new Promise(function(resolve, reject){
      var lista = [];
      bonos.forEach(function(bono){
      mongo.getBono(bono).subscribe(
          data => {
            lista.push(data.json());
            console.log(lista[0][0]);
          },
          err => console.log(err.message)
        );

      });
      resolve(lista);
    })
  }

  comprobarUsados(){
    var listaBonos = this.listaBonos;
    var listaBonosUsados = this.listaBonosUsados;
    var listaFinal = this.listaFinal;
    listaBonos.forEach(function (bono, i){
      listaBonosUsados.forEach(function (bonoU, iU){
        if (bono[0]._id == bonoU[0]._id){
          listaFinal.push(bono[0]);          
        }
      })
    })
  }
  
  
  ordenarAsignar(lista){
    console.log("función despues de promise");
    debugger;
    this.listaBonos = lista;
    lista = null;
    this.listaBonos.sort(function(a,b){  
                debugger;
                var dateA = new Date(a.horainicio.toString()).getTime();
                var dateB = new Date(b.horainicio.toString()).getTime();
                return dateA > dateB ? 1 : -1;  
            })
                this.listaBonos.forEach(function(bono){
                  console.log("nombre: " + bono[0].nombre);
                  console.log("Fecha inicio : " + bono[0].horainicio)
                })

                
  }

    getBonosUsados(){
    var bonos = this.usuario.bonosusados;
    var mongo = this.mongo;
    return new Promise(function(resolve, reject){
      var lista = [];
      bonos.forEach(function(bono){
      mongo.getBono(bono).subscribe(
          data => {
            lista.push(data.json());
            console.log(lista[0][0]);
          },
          err => console.log(err.message)
        );

      });
      resolve(lista);
    })
  }
  */



}
