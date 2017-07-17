import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';

import { Item } from '../../models/item';
import { PoiPage } from "../poi/poi";
import { Items } from '../../providers/providers';
import firebase from 'firebase';

@Component({
  selector: 'page-searchpoi',
  templateUrl: 'searchpoi.html'
})
export class SearchpoiPage {
  
  currentItems: any = [];

  public poiList:Array<any>;
  public loadedPoiList:Array<any>;
  public poiRef:firebase.database.Reference;
  city:any;
  cityname: any;
  poiKey:any;
  public keyss = [];
  constructor(public _app: App, public navCtrl: NavController, public navParams: NavParams, public items: Items) { 

    this.city = navParams.get('reference')
    this.cityname = this.city.name;
    
    let pois = [];
    let keys = [];
    this.poiRef = firebase.database().ref('pois/');

    this.poiRef.orderByChild("cityName").equalTo(this.cityname).on("child_added", function(snapshot) {
      var poif = snapshot.val(); 
       keys.push(snapshot.key);
        if (snapshot.child("cityName").val()== navParams.get('reference').name){
          pois.push(poif);
        }
    });
  this.keyss = keys;
  this.poiList = pois;  
  this.loadedPoiList = pois;
    
  }

  initializeItems(): void {
  this.poiList = this.loadedPoiList;
}

openPage(poi:any, index:any){
  console.log('INDICE: ' + index);
  this.navCtrl.push(PoiPage, {
    poiSelected: poi,
    poikey: this.keyss[index],
    cityBack: this.city
  });
}
getItems(searchbar) {
  // Reset items back to all of the items
  this.initializeItems();

  // set q to the value of the searchbar
  var q = searchbar.srcElement.value;


  // if the value is an empty string don't filter the items
  if (!q) {
    return;
  }

  this.poiList = this.poiList.filter((v) => {
    if(v.name && q) {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
}

ionViewDidEnter() {
    this._app.setTitle("Search P.O.I.")
  }

}
