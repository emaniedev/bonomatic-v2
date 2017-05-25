import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MongoProvider} from '../../providers/mongo/mongo';
/**
 * Generated class for the AdminDbDetallesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
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
  public usuario;
  public listaBonos = [];
  public listaBonosUsados = [];
  public listaFinal= [];


  constructor(public navCtrl: NavController, public param: NavParams, private mongo : MongoProvider ) {
    this.usuario = param.data.user;
    var usuario = this.usuario;
    var listaFinal = this.listaFinal;
    console.log (param);
    console.log(this.usuario)
    usuario.bonos.forEach(function(bono){
      usuario.bonosusados.forEach(function(bonousado){
        if (bono._id != bonousado._id){
          listaFinal.push(bono);
        }
      })
    })
     
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminDbDetallesPage');
  }

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
  encontrarDesayunos(desayuno){
    return desayuno[0].nombre == "Desayuno";
  }

   ordenarAsignarUsados(lista){
    console.log("función despues de promise");
    console.log("ListaBonos -> " + lista);
    lista.sort(this.sortFunction);
    this.listaBonosUsados = lista;
    this.listaBonosUsados.sort(this.sortFunction);
    this.comprobarUsados();
  }

  sortFunction(a,b){  
    
    var dateA = new Date(a[0].horainicio).getTime();
    var dateB = new Date(b[0].horainicio).getTime();
    return dateA > dateB ? 1 : -1;  
}; 

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



}
