import { Component } from '@angular/core';
import {App, NavController, MenuController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public _app: App, public navCtrl: NavController, public menuCtrl:MenuController) { 
    this.menuCtrl.enable(false);
  }

  ionViewDidEnter() {
    this._app.setTitle("Welcome! Sign up or login")
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
