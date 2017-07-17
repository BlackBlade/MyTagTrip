import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';
import { SearchpoiPage } from "../searchpoi/searchpoi";
import { Item } from '../../models/item';
import { PoiPage } from "../poi/poi";
import { Items } from '../../providers/providers';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items,
  public menuCtrl: MenuController) { 

    /*var tagData2 = {
      name: "Open air"
    }

    var key = firebase.database().ref().child('tags').push().key;
    var updates = {};
    updates['/tags/'+key] = tagData2;
    firebase.database().ref().update(updates);*/
    /*var tagData = {
      name: "Fountain"
    }

    var tagData2 = {
      name: "Square"
    }

    var key = firebase.database().ref().child('tags').push().key;
    var key2 = firebase.database().ref().child('tags').push().key;
    var uid = '-KmuR5c78zpcxOw6t7he' //Piazza del popolo
    var updates = {};
    updates['/tags/'+key] = tagData;
    updates['/pois/'+ uid + '/tags/' + key] = "true";
    updates['/tags/'+key2] = tagData2;
    updates['/pois/'+ uid + '/tags/' + key2] = "true";*/

    //firebase.database().ref().update(updates);
    /*var poiData = {
      name: "Rocca Malatestiana",
      imageURL: "http://i.imgur.com/64m0kOU.jpg",
      city: "Cesena",
      tags: {}
    }

    var poiData2 = {
      name: "Chiostro San Francesco",
      imageURL: "http://i.imgur.com/D0yYGWN.jpg",
      city: "Cesena",
      tags: {}
    }

    var poiData3 = {
      name: "Cattedrale San Giovanni",
      imageURL: "http://i.imgur.com/0ZcoM9P.jpg",
      city: "Cesena",
      tags: {}
    }

    var key = firebase.database().ref().child('pois').push().key;
    var key2 = firebase.database().ref().child('pois').push().key;
    var key3 = firebase.database().ref().child('pois').push().key;
    var uid = '-KmuNE2Ku5VXyNE-sum2' //Cesena
    var updates = {};
    updates['/pois/'+key] = poiData;
    updates['/city/'+ uid + '/pois/' + key] = "true";
    updates['/pois/'+key2] = poiData2;
    updates['/city/'+ uid + '/pois/' + key2] = "true";
    updates['/pois/'+key3] = poiData3;
    updates['/city/'+ uid + '/pois/' + key3] = "true";
    firebase.database().ref().update(updates);*/

    /*var key = firebase.database().ref().child('city').push().key;
    firebase.database().ref('city/'+key).set({
        name: "Roma",
        lat : 41.90278349999999,
        lng: 12.496365500000024,
        pois: {}
    });*/
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
