import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Api } from '../providers/api';
import { FirstRunPage } from '../pages/pages';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';
import { TagTripPage } from "../pages/tagtrip/tagtrip";
import { ProfilePage } from "../pages/profile/profile";
import { Settings } from '../providers/providers';
import { CityPage } from "../pages/city/city";
import { PoiPage } from "../pages/poi/poi";
import { SearchpoiPage } from "../pages/searchpoi/searchpoi";
import { SearchcityPage } from "../pages/searchcity/searchcity";
import { AddtagPage } from "../pages/addtag/addtag";
import { NewtagPage } from "../pages/newtag/newtag";
import { CitytripPage} from '../pages/citytrip/citytrip';
import { ChoosetagsPage } from '../pages/choosetags/choosetags';
import { RouteDisplay } from "../pages/routedisplaypage/routedisplaypage";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    {title: 'Home', component: TagTripPage},
    {title: 'Search P.O.I.', component: SearchcityPage}
  ]

  constructor( private platform: Platform, settings: Settings, private config: Config, 
    private statusBar: StatusBar, private splashScreen: SplashScreen, public api:Api, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {

    this.nav.setRoot(page.component);
  }

  presentConfirm() {
  let alert = this.alertCtrl.create({
    title: 'Logout',
    message: 'Are you sure you want to logout?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
        }
      },
      {
        text: 'Yes',
        handler: () => {
          this.doLogout();
        }
      }
    ]
  });
  alert.present();
}

  doLogout(){
    var result:any = this.api.doLogOut();
      let res = Observable.fromPromise(result);
      res.subscribe(res => {
      if (res instanceof Error){
      } else {
          this.nav.push(TutorialPage);

      }
    })
  }
}
