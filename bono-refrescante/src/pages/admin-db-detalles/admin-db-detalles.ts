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
    this.listaBonos = this.getBonos();
    console.log(this.listaBonos);
    this.listaBonosUsados = this.getBonosUsados();
    console.log(this.listaBonosUsados);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminDbDetallesPage');
  }

  getBonos(){
    var listaBonos = [] ;
    var mongo = this.mongo;
    this.usuario.bonos.forEach(function(bono){
       mongo.getBono(bono).subscribe(
        data => {
          listaBonos.push(data.json());
        },
        err =>  console.log(err),
        () => console.log( listaBonos )
        
      );
    });
    return listaBonos;
  }

  getBonosUsados(){
    var listaBonosUsados = [];
    this.usuario.bonosusados.forEach(function(bono){
      this.mongo.getBono(bono).subscribe(
        data => {
          listaBonosUsados.push(data.json());
        },
        err => console.log(err),
        () => console.log("Se ha realizado la consulta con exito, trae esto: " + listaBonosUsados)
      );
    });
    return listaBonosUsados;
  }

}
