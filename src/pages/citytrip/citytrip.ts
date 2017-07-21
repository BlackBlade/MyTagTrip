import { Component } from '@angular/core';
import {App, NavController, NavParams, MenuController } from 'ionic-angular';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition,MarkerOptions, Marker } from '@ionic-native/google-maps';
//import { ItemDetailPage } from '../item-detail/item-detail';
import { ChoosetagsPage } from '../choosetags/choosetags';
import { Item } from '../../models/item';
import { PoiPage } from "../poi/poi";
import { Items } from '../../providers/providers';
import firebase from 'firebase';

@Component({
  selector: 'page-citytrip',
  templateUrl: 'citytrip.html'
})
export class CitytripPage {

  currentItems: any = [];
  userCurrentPosition: LatLng;
 
  public cityList:Array<any>;
  public loadedCityList:Array<any>;
  public cityRef:firebase.database.Reference;
  constructor(public _app: App, public navCtrl: NavController, public navParams: NavParams, public items: Items,
  public menuCtrl: MenuController) {

    this.cityRef = firebase.database().ref('/city/')
    this.userCurrentPosition = navParams.get('reference')
    //creo la lista di points of interests
    this.cityRef.once('value', poiList => {
    let cities = [];
    poiList.forEach( city => {
      cities.push(city.val());
      return false;
    });

  this.cityList = cities;
  this.loadedCityList = cities;
});
  }

 ionViewDidLoad() {
    this.menuCtrl.close();
  }
  initializeItems(): void {
  this.cityList = this.loadedCityList;
}
ionViewDidEnter() {
    this._app.setTitle("Plan your trip")
  }

openPage(city:any){
  this.navCtrl.push(ChoosetagsPage, {
    reference: city,
    coordinates: this.userCurrentPosition
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

  this.cityList = this.cityList.filter((v) => {
    if(v.name && q) {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
}

}
