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
   @ViewChild('directionsPanel') directionsPanel: ElementRef;
   map: any;
   title: string;
   set:boolean;
  public userCurrentPosition: LatLng;
  directions= [];
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  constructor(public _app: App , private googleMaps: GoogleMaps, public navCtrl: NavController, public platform: Platform,
  public menuCtrl : MenuController, public api:Api, public toastCtrl: ToastController,private geolocation: Geolocation,public navParams: NavParams) {
        
        if(api.user.displayName==null){
            this.username = '';
        }else {
            this.username = api.user.displayName
        }      
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
      this.title = "My Tag Trip"
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
          this.displayMapError('Cannot find location. Turn on GPS to use Tag Trip services!')
        });
        this.userCurrentPosition = currentPosition;
    } else {
      this.title = "Enjoy your route!"
      if (this.userCurrentPosition==null){
        this.displayMapError('Cannot find location. Turn on GPS to use Tag Trip services!')
      } else {
        this.set=false;
      this.directionsDisplay.setMap(this.map)
      this.directionsDisplay.setPanel(this.directionsPanel.nativeElement);
      this.calculateAndDisplayRoute();
      }
      
      
    }
}

showToast(){
  
    var x = document.getElementById('dir')
    if(x.style.display =='none'){
        x.style.display = 'block'
    } else {
      x.style.display = 'none'
    }
    
  
   
   
}

calculateAndDisplayRoute() {

    if(this.directions.length == 0){
      this.displayMapError('Sorry, there are no places tagged with the tags you\'ve chosen! Why don\'t you add one yourself?')
    }
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
