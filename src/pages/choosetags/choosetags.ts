import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { LoadingController, Loading } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';
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

  selectedItems: Set<String>;

  public cityname: any;
  public loader: Loading;
  public tagList:Array<any>;
  public loadedTagList:Array<any>;
  public tagRef:firebase.database.Reference;
  city:any;
  userCurrentPosition : LatLng;

  public keyss = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items, public loading: LoadingController
  ,public toastCtrl: ToastController) {

   this.loader = loading.create({
      content: 'Calculating route...',
      dismissOnPageChange: true
    });

    this.selectedItems = new Set<String>();
    this.city = navParams.get('reference')
    this.cityname = this.city.name
    this.userCurrentPosition = navParams.get('coordinates')

    let tags = [];
    let keys = [];
    this.tagRef = firebase.database().ref('tags/');

    this.tagRef.on("child_added", function(snapshot) {
      var tag = snapshot.val();
      keys.push(snapshot.key);
      tags.push(tag);
    });

  this.keyss = keys;
  this.tagList = tags;
  this.loadedTagList = tags;

  }

  initializeItems(): void {
  this.tagList = this.loadedTagList;
}

calculatePath(){

  var directionsService = new google.maps.DirectionsService();
  var waypts = []
  waypts.push({
    location: 'Conad Romagna, Viale Carpi, Riccione, RN',
    stopover: true
  })
  waypts.push({
    location: 'Prodet, Viale Carpi, Riccione, RN',
    stopover: true
  })
  var request ={
    origin: {lat: 44.007193, lng: 12.6500083},
    destination: {lat: 44.007193, lng: 12.6500083},
    travelMode: google.maps.TravelMode.WALKING ,
    waypoints : waypts,
    optimizeWaypoints: true,
  };

  this.navCtrl.setRoot(TagTripPage, {route:request}, {
        animate: true,
        direction: 'forward'
    });
  /*this.loader.present().then(() => {
    var self = this
    })
    var self = this
    directionsService.route(request, function(result, status) {
    self.loader.dismiss()
      if (status == 'OK') {

          self.navCtrl.setRoot(TagTripPage, {route: result}, {
          animate: true,
          direction: 'forward'
      });
      } else {
       this.displayError(status.string)
      }
    });*/




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
