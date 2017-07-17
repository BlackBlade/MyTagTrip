import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Api } from '../../providers/api';
import { Observable } from 'rxjs/Observable';
import { TutorialPage } from "../tutorial/tutorial";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public api : Api,
  public menuCtrl: MenuController) {
  }


  doLogout(){  
      var result:any = this.api.doLogOut();
      let res = Observable.fromPromise(result);
      res.subscribe(res => {
      if (res instanceof Error){
      } else {
          this.navCtrl.push(TutorialPage);

      }
    })

  }

  ionViewDidLoad() {
    this.menuCtrl.close();
  }

}
