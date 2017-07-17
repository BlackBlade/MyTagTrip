import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Api } from '../../providers/api';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { TutorialPage } from "../tutorial/tutorial";
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  username: any;
  photoURL: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, 
  public menuCtrl: MenuController) {
        this.username = api.user.displayName
        this.photoURL = api.user.photoURL
      //  var base64 = this.getBase64Image(document.getElementById("imageid"));
        
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
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

  getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}



}
