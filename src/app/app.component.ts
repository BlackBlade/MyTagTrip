import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CardsPage } from '../pages/cards/cards';
import { ContentPage } from '../pages/content/content';
import { FirstRunPage } from '../pages/pages';
import { ListMasterPage } from '../pages/list-master/list-master';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { MenuPage } from '../pages/menu/menu';
import { SearchPage } from '../pages/search/search';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';
import { TagTripPage } from "../pages/tagtrip/tagtrip";
import { ProfilePage } from "../pages/profile/profile";
import { LogoutPage } from "../pages/logout/logout";
import { Settings } from '../providers/providers';
import { CityPage } from "../pages/city/city";
import { PoiPage } from "../pages/poi/poi";
import { SearchpoiPage } from "../pages/searchpoi/searchpoi";
import { TranslateService } from '@ngx-translate/core'
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
    {title: 'Search P.O.I.', component: SearchcityPage},
    { title: 'Profile', component: ProfilePage}
  ]

  constructor(private translate: TranslateService, private platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    this.initTranslate();
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    /*this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });*/
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
