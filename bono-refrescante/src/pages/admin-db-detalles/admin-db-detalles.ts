import { Component } from '@angular/core';
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
  public listaBonos;
  public listaBonosUsados;


  constructor(public navCtrl: NavController, public param: NavParams, private mongo : MongoProvider ) {
    this.usuario = param.data.user;
    console.log (param);
    console.log(this.usuario)
    this.getBonos().then(
      lista => this.ordenarAsignar(lista),
      err => 
        console.log("no se ha cumplido la promesa. " + err)
    )
    .catch(
      err => console.log (err)
    );  

    this.getBonosUsados().then(
      lista => this.ordenarAsignarUsados(lista),
      err => 
        console.log("no se ha cumplido la promesa. " + err)
    )
    .catch(
      err => console.log (err)
    );  
     
    
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
    listaBonos.forEach(function (bono, i){
      listaBonosUsados.forEach(function (bonoU, iU){
        if (bono[0]._id == bonoU[0]._id){
          listaBonos.pop(i);
        }
      })
    })
  }
  
  
  ordenarAsignar(lista){
    console.log("función despues de promise");
    console.log("ListaBonos -> " + lista);
    lista.sort(this.sortFunction);
    this.listaBonos = lista;
    
  }

   ordenarAsignarUsados(lista){
    console.log("función despues de promise");
    console.log("ListaBonos -> " + lista);
    lista.sort(this.sortFunction);
    this.listaBonosUsados = lista;
    this.comprobarUsados();
  }

  sortFunction(a,b){  
    var dateA = new Date(a[0].horainicio).getTime();
    var dateB = new Date(b[0].horainicio).getTime();
    return dateA > dateB ? 1 : -1;  
}; 


//   getBonos(){
//     var mongo = this.mongo;
//     var bonos = this.usuario.bonos;
//     return new Promise(function(resolve,reject){ 
//       var listaBonos = [];
//       var lista;
//       bonos.forEach(function(bono){
//         mongo.getBono(bono).subscribe(
//         data => {
//           listaBonos.push(data.json());
//         },
//         err =>  console.log(err),
//         () => console.log( listaBonos )
//         
//         );
//       });
//       lista = listaBonos; 
//       lista.ready = function (err, lista){
//         if (err){
//           return reject(Error("Error al conseguir Bonos"))
//         }
//         return resolve(lista);
//       }
//     })
//   }


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
