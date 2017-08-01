import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

import { SearchpoiPage } from "../searchpoi/searchpoi";
import { Item } from '../../models/item';
import { PoiPage } from "../poi/poi";
import firebase from 'firebase';

@Component({
  selector: 'page-searchcity',
  templateUrl: 'searchcity.html'
})
export class SearchcityPage {
  
  currentItems: any = [];

  public poiList:Array<any>;
  public loadedPoiList:Array<any>;
  public poiRef:firebase.database.Reference;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public menuCtrl: MenuController) { 

    
    this.poiRef = firebase.database().ref('/city/');

    //creo la lista di points of interests
    this.poiRef.once('value', poiList => {
    let pois = [];
    poiList.forEach( poi => {
      pois.push(poi.val());
      return false;
    });

  this.poiList = pois;
  this.loadedPoiList = pois;
});
  }

 ionViewDidLoad() {
    this.menuCtrl.close();
  }
  initializeItems(): void {
  this.poiList = this.loadedPoiList;
}

openPage(poi:any){
  this.navCtrl.push(SearchpoiPage, {
    reference: poi
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

}
