import { Component, ViewChild, ElementRef } from '@angular/core';
import {App, NavController, Platform, ToastController, MenuController, NavParams,IonicPage } from 'ionic-angular';
import { Api } from '../../providers/api';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition,MarkerOptions, Marker } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from "rxjs/Observable";
import { CitytripPage} from '../citytrip/citytrip';
import 'rxjs/add/observable/of';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-tagtrip',
  templateUrl: 'tagtrip.html'
})
export class TagTripPage {
  username:any;
   @ViewChild('map') mapElement: ElementRef;
   map: any;
  userCurrentPosition: LatLng;
  directions: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  start = 'Piazza del popolo cesena';
  end = 'Rocca malatestiana cesena';
  constructor(public _app: App , private googleMaps: GoogleMaps, public navCtrl: NavController, public platform: Platform,
  public menuCtrl : MenuController, public api:Api, public toastCtrl: ToastController,private geolocation: Geolocation,public navParams: NavParams) {
        this.username = api.user.displayName
        this.directions = navParams.get('route')
  }




  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.loadMap()
    // },1000)
  }

  ionViewDidLoad(){
    this.menuCtrl.enable(true)
    this.menuCtrl.close();
    this.initMap()
    // setTimeout(() => {
    //   this.loadMap()
    // },1000)
  }

ionViewDidEnter() {
    this._app.setTitle("Home")
  }

  getItems(searchbar) {
  //search for cities on db
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });

    this.directionsDisplay.setMap(this.map);
    this.loadMap()
    //this.calculateAndDisplayRoute();
  }

  loadMap() {



    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
  //  let element: HTMLElement = document.getElementById('map');

    //let map: GoogleMap = this.googleMaps.create(element);

    if(this.directions == null){
      // listen to MAP_READY event
      // You must wait for this event to fire before adding something to the map or modifying it in anyway
    //  this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        this.geolocation.getCurrentPosition().then((resp) => {
          let currentPosition: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude);
          this.userCurrentPosition = currentPosition;
          let position: CameraPosition = {
            target: currentPosition,
            zoom: 18,
            tilt: 30
          };

          // move the map's camera to position
          //this.map.moveCamera(position);
          this.map.setCenter(currentPosition)
          this.map.setZoom(18)
        //  this.map.setCameraTarget(currentPosition);

          var marker = new google.maps.Marker({
            position: currentPosition,
            title: 'Your Position'
          })
          marker.setMap(this.map)
          // create new marker
          //  let markerOptions: MarkerOptions = {
          //    position: currentPosition,
          //    title: 'Your Position'
          //  };
           //
          //  this.map.addMarker(markerOptions)
          //    .then((marker: Marker) => {
          //       marker.showInfoWindow();
          //     });

        }).catch((error) => {
          this.displayMapError(error.message)
        });

      //});
    } else {
if(this.map==null){
  this.displayMapError('La mappa è null')
}
this.directionsDisplay.setMap(this.map)
//map.one(GoogleMapsEvent.MAP_READY).then(() => {
  this.calculateAndDisplayRoute();
//});
      // this.directionsDisplay.setMap(map)
      // this.displayMapError('not null')
      //
      // // listen to MAP_READY event
      // // You must wait for this event to fire before adding something to the map or modifying it in anyway
      //  var self = this
      //  map.one(GoogleMapsEvent.MAP_READY).then(() => {
      //   this.directionsService.route({
      // origin: this.start,
      // destination: this.end,
      // travelMode: 'DRIVING'}, (response, status) => {
      //   if (status === 'OK') {
      //   this.directionsDisplay.setDirections(response);
      // } else {
      // this.displayMapError('Directions request failed due to ');
      // }
      //
        // this.directionsService.route(self.directions, function(result, status) {
        //   if (status == 'OK') {
        //     this.directionsDisplay.setDirections(result)
        //   } else {
        //    self.displayMapError(status.string)
        //   }
        // });

    //   });
    // }





    // initJSMaps(mapEle) {
    //   new google.maps.Map(mapEle, {
    //     center: { lat: 43.071584, lng: -89.380120 },
    //     zoom: 16
    //   });
    // }

    // initNativeMaps(mapEle) {
    //   this.map = new GoogleMap(mapEle);
    //   mapEle.classList.add('show-map');

    //   GoogleMap.isAvailable().then(() => {
    //     const position = new GoogleMapsLatLng(43.074395, -89.381056);
    //     this.map.setPosition(position);
    //   });
    // }

    // ionViewDidLoad() {
    //   let mapEle = this.map.nativeElement;

    //   if (!mapEle) {
    //     console.error('Unable to initialize map, no map element with #map view reference.');
    //     return;
    //   }

    //   // Disable this switch if you'd like to only use JS maps, as the APIs
    //   // are slightly different between the two. However, this makes it easy
    //   // to use native maps while running in Cordova, and JS maps on the web.
    //   if (this.platform.is('cordova') === true) {
    //     this.initNativeMaps(mapEle);
    //   } else {
    //     this.initJSMaps(mapEle);
    //   }
    // }


//  }
}
}

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'WALKING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ');
      }
    });
  }

  planTrip(){
    this.navCtrl.push(CitytripPage, {
      reference: this.userCurrentPosition
    });
    //this.calculateAndDisplayRoute();
  }

  displayMapError(err :string){
    let toast = this.toastCtrl.create({
      message: err,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
