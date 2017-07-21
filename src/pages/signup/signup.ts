import { Component } from '@angular/core';
import { NavController, ToastController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { MainPage } from '../../pages/pages';
import { TagTripPage } from '../tagtrip/tagtrip';
import { User } from '../../providers/user';
import { Api } from '../../providers/api';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, email: string, password: string } = {
    name: '',
    email: '',
    password: ''
  };

    signUpForm: FormGroup;
 



  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public api : Api,
    public menuCtrl: MenuController,
    public formBuilder: FormBuilder) {

this.signUpForm = formBuilder.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
    email:['', Validators.required]
})
   this.menuCtrl.enable(false);
   
  }

  doSignup() {
    if(!this.signUpForm.valid){
      this.displayLoginError("Please fill all the fields")
    }
     else {
    var result : any = this.api.doSignUp(this.account.email, this.account.password,this.account.name);
    let res = Observable.fromPromise(result);
    res.subscribe(res => {
      if (res instanceof Error){
        this.displayLoginError(res.message) 
      } else {
          this.navCtrl.push(TagTripPage);

      }
    })

    }
    
  }


  displayLoginError(messageErr: string){
    let toast = this.toastCtrl.create({
      message: messageErr,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
