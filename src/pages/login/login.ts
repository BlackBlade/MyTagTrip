import { Component } from '@angular/core';
import { NavController, ToastController, MenuController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainPage } from '../../pages/pages';
import { MapPage } from '../map/map';
import { TagTripPage } from "../tagtrip/tagtrip";
import { User } from '../../providers/user';
import { Api } from '../../providers/api';

import { TranslateService } from '@ngx-translate/core';

import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {


  user: Observable<firebase.User>;
  signInForm: FormGroup;
  email: any;
  password:any;

  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public api : Api,
    public menuCtrl: MenuController,
    public formBuilder: FormBuilder) {

  this.signInForm = formBuilder.group({
    password: ['', Validators.required],
    email:['', Validators.required]
})
   this.menuCtrl.enable(false);


    }

  doLogin() {
    var result :any = this.api.doLogin();
    let res = Observable.fromPromise(result);
    res.subscribe(res => {
      if (res instanceof Error){
        this.displayLoginError(res.message)
      } else {
          this.navCtrl.setRoot(TagTripPage);
      }
    })


  }

  doEmailPswLogin(){
    if(!this.signInForm.valid){
        this.displayLoginError("Please fill all the fields")
    }
     else {
    var result : any = this.api.doEmailPswLogin(this.email, this.password);
    let res = Observable.fromPromise(result);
    res.subscribe(res => {
      if (res instanceof Error){
        this.displayLoginError(res.message)
      } else {
          this.navCtrl.setRoot(TagTripPage);

      }
    })
    }

  }

  displayLoginError(messageErr:string){
    let toast = this.toastCtrl.create({
      message: messageErr,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
