import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AddtagPage } from "../pages/addtag/addtag";
import { MyApp } from './app.component';

import { RouteDisplay } from "../pages/routedisplaypage/routedisplaypage";
import { SearchpoiPage } from "../pages/searchpoi/searchpoi";
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';
import { TagTripPage } from "../pages/tagtrip/tagtrip";
import { CitytripPage} from '../pages/citytrip/citytrip';
import { Api } from '../providers/api';
import { Items } from '../mocks/providers/items';
import { PoiPage } from "../pages/poi/poi";
import { SearchcityPage } from "../pages/searchcity/searchcity";
import { NewtagPage } from "../pages/newtag/newtag";
import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ChoosetagsPage } from '../pages/choosetags/choosetags';


/* export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
} */

export function provideSettings(storage: Storage) {
  
  /*return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });*/
}

export const firebaseConfig = {
    apiKey: "AIzaSyCXv9XOpd2iAe6Cnc3Rd3QAmV3_JDFE4Ws",
    authDomain: "mytagtrip.firebaseapp.com",
    databaseURL: "https://mytagtrip.firebaseio.com",
    projectId: "mytagtrip",
    storageBucket: "mytagtrip.appspot.com",
    messagingSenderId: "5428982894"
  };


let pages = [
  MyApp,
  LoginPage,
  SignupPage,
  TutorialPage,
  WelcomePage,
  TagTripPage,
  SearchpoiPage,
  PoiPage,
  SearchcityPage,
  AddtagPage,
  NewtagPage,
  CitytripPage,
  ChoosetagsPage,
  RouteDisplay
];

export function declarations() {
  return pages;
}

export function entryComponents() {
  return pages;
}

export function providers() {
  return [
    Api,
    Camera,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    Geolocation,

    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ];
}

@NgModule({
  declarations: declarations(),
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule { }
