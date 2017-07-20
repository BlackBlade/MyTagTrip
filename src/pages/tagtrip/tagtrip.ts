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
   title: string;
  public userCurrentPosition: LatLng;
  directions= [];
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  start = 'Piazza del popolo cesena';
  end = 'Rocca malatestiana cesena';
  constructor(public _app: App , private googleMaps: GoogleMaps, public navCtrl: NavController, public platform: Platform,
  public menuCtrl : MenuController, public api:Api, public toastCtrl: ToastController,private geolocation: Geolocation,public navParams: NavParams) {
        this.username = api.user.displayName
        this.directions = navParams.get('route')
        this.userCurrentPosition = navParams.get('userPosition')
  }

  ionViewDidLoad(){
    this.menuCtrl.enable(true)
    this.menuCtrl.close();
    this.initMap()
  }

ionViewDidEnter() {
    this._app.setTitle("Home")
  }


  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });

    this.directionsDisplay.setMap(this.map);
    this.loadMap()
  }

  loadMap() {

    if(this.directions == null){
      this.title = "Welcome " + this.username + " to My Tag trip!"

      let currentPosition: LatLng;
        this.geolocation.getCurrentPosition().then((resp) => {
           currentPosition = new LatLng(resp.coords.latitude, resp.coords.longitude);
          this.userCurrentPosition = currentPosition;
          let position: CameraPosition = {
            target: currentPosition,
            zoom: 18,
            tilt: 30
          };
          this.map.setCenter(currentPosition)
          this.map.setZoom(18)

          var marker = new google.maps.Marker({
            position: currentPosition,
            title: 'Your Position'
          })
          marker.setMap(this.map)
        }).catch((error) => {
          this.displayMapError(error.message)
        });
        this.userCurrentPosition = currentPosition;
    } else {

      this.title = "Enjoy your route!"
      this.directionsDisplay.setMap(this.map)
      this.calculateAndDisplayRoute();
    }
}

calculateAndDisplayRoute() {

    this.directionsService.route({
      origin: this.userCurrentPosition,
      destination: this.userCurrentPosition,
      waypoints: this.directions,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.WALKING
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
