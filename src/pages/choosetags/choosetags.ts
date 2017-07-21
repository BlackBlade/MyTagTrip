import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { LoadingController, Loading } from 'ionic-angular';

//import { ItemDetailPage } from '../item-detail/item-detail';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition,MarkerOptions, Marker } from '@ionic-native/google-maps';

import {TagTripPage} from '../tagtrip/tagtrip'
import { Item } from '../../models/item';
import { RouteDisplay } from "../routedisplaypage/routedisplaypage";
import { Items } from '../../providers/providers';
import firebase from 'firebase';

declare var google: any;

@Component({
  selector: 'page-choosetags',
  templateUrl: 'choosetags.html'
})
export class ChoosetagsPage {

  public selectedItems: Set<String>;
  public poiToAdd: Set<String>; //nome dei punti di interesse da mettere come waypoints
  public cityname: any;
  public loader: Loading;
  public tagList:Array<any>;
  public keyList: Array<any>;
  public loadedTagList:Array<any>;
  public tagRef:firebase.database.Reference;
  public poisRef:firebase.database.Reference;
  public poisList:Array<any>;
  public poiSnapshot:Array<any>;
  city:any;
  userCurrentPosition : LatLng;

  public keyss = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items, public loading: LoadingController
  ,public toastCtrl: ToastController) {

    this.loader = loading.create({
       content: 'Calculating route...',
       dismissOnPageChange: true
     });

     this.poiToAdd = new Set<String>();
     this.selectedItems = new Set<String>();
     this.city = navParams.get('reference')
     this.cityname = this.city.name
     this.userCurrentPosition = navParams.get('coordinates')
     let pois = [];
     let poisKey = [];
     let poissSnapshot = [];
     this.poisRef = firebase.database().ref('pois/'); //prendo i punti di interesse

     this.poisRef.orderByChild("cityName").equalTo(this.cityname).on("child_added", function(snapshot) {
       //var poif = snapshot.val();
       //var poiKey = snapshot.key;

        //keys.push(snapshot.key);
         if (snapshot.child("cityName").val()== navParams.get('reference').name){
           //pois.push(poif);
           //poisKey.push(poiKey);
           poissSnapshot.push(snapshot);
         }
     });
     this.poisList = pois; //i punti di interesse per la città scelta
     this.keyList = poisKey; //le chiavi dei punti di interesse di sopra
     this.poiSnapshot = poissSnapshot; //gli snapshot
     let tags = [];
     let keys = [];
     this.tagRef = firebase.database().ref('tags/');

     this.tagRef.on("child_added", function(snapshot) {
       var tag = snapshot.val();
       keys.push(snapshot.key);
       tags.push(tag);
     });

   this.keyss = keys; //chiavi tags
   this.tagList = tags;
   this.loadedTagList = tags;

  }

  initializeItems(): void {
  this.tagList = this.loadedTagList;
}

calculatePath(){

  this.searchWayPoints();//ricerca
  var directionsService = new google.maps.DirectionsService();
  var waypts = []
  for (let poi of Array.from(this.poiToAdd)){
    waypts.push({
      location: ''+poi+' ' +this.cityname+'',
      stopover:true
    })
  }


  this.navCtrl.setRoot(TagTripPage, {route:waypts, userPosition:this.userCurrentPosition}, {
        animate: true,
        direction: 'forward'
    });
}

searchWayPoints(){
  let scopeSelected = new Set<String>();
  let scopePoiToAdd = new Set<String>();
  scopeSelected = this.selectedItems
  for(let poi of this.poiSnapshot){
    poi.child('tags').forEach(function(tagSnapshot){//ciclo sui tag
      if(scopeSelected.has(tagSnapshot.key)){
          if(!scopePoiToAdd.has(poi.val().name)){
            scopePoiToAdd.add(poi.val().name);
          }
      }
    })
  }

  this.poiToAdd = scopePoiToAdd;
}

  selectTag(index:any){
    let key = this.keyss[index]
    if(this.selectedItems.has(key)){
      this.selectedItems.delete(key)
    } else {
      this.selectedItems.add(key)
    }
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

  this.tagList = this.tagList.filter((v) => {
    if(v.name && q) {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
}

displayError(err :string){
  let toast = this.toastCtrl.create({
    message: err,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

}
