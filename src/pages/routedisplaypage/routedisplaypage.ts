import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, ToastController, MenuController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition,MarkerOptions, Marker } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from "rxjs/Observable";
import { CitytripPage} from '../citytrip/citytrip';
import 'rxjs/add/observable/of';

declare var google: any;

@Component({
  selector: 'page-routedisplay',
  templateUrl: 'routedisplaypage.html'
})
export class RouteDisplay {

  @ViewChild('mappa') map;
  public route : any;

  constructor(private googleMaps: GoogleMaps, public navCtrl: NavController, public platform: Platform,
  public menuCtrl : MenuController, public api:Api, public toastCtrl: ToastController,private geolocation: Geolocation,
  public navParams: NavParams) {
    this.route = navParams.get('route')
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadMap()
    },1000)
  }

  ionViewDidLoad(){
    this.menuCtrl.enable(true)
    this.menuCtrl.close();
  }

  loadMap() {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('mappa');
    let map: GoogleMap = this.googleMaps.create(element);
    var directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map)

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      directionsDisplay.setDirections(this.route)
    });

  }
}
