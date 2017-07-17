import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { Api } from '../../providers/api';
import firebase from 'firebase';
import { PoiPage } from "../poi/poi";
import { NewtagPage } from "../newtag/newtag";
@Component({
  selector: 'page-addtag',
  templateUrl: 'addtag.html',
})
export class AddtagPage {

  public poiName:any;
  public tagList: Array<any>;
  public loadedTagList: Array<any>;
  public poiSelected: any;
  public poiKey:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, 
  public menuCtrl: MenuController, public toastCtrl: ToastController) {
 
      this.poiSelected = navParams.get('poi');
      this.poiName = this.poiSelected.name;
      this.poiKey = navParams.get('poiKey');
      //this.tagList = navParams.get('recTags'); //vettore di tutti i tag disponibili
      let tagShow = [];
      console.log('Key of poi selected ' + this.poiKey);
      var ref = firebase.database().ref('/pois/'+this.poiKey+'/tags/')
      var ref1 = firebase.database().ref('/tags/');

      ref1.once('value', function(snapshot){ //ciclo sui tag
        snapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key; //chiave tag
            var exists = false;
            ref.once('value', function(snapshot){
              snapshot.forEach(function(childSnapshot){
                var childKey1 = childSnapshot.key;
                if (childKey == childKey1){ //se ne trovo uno uguale, eisste nella lista dei tag del poi
                    exists = true;
                }
                return false;
              })
            })
            if (!exists){
              tagShow.push(childSnapshot);
            }
          return false;
        })
      }).then(a=>{
        this.tagList = tagShow;
      this.loadedTagList = tagShow;
      })

      this.tagList = tagShow;
      this.loadedTagList = tagShow;
        
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
  }

  ionViewWillEnter() {

    console.log('sto per rientrare2');
    this.initializeItems();

  }

  refreshList(){
    var ref = firebase.database().ref('/pois/'+this.poiKey+'/tags/')
      var ref1 = firebase.database().ref('/tags/');
      let tagShow = [];
      ref1.once('value', function(snapshot){ //ciclo sui tag
        snapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key; //chiave tag
            var exists = false;
            ref.once('value', function(snapshot){
              snapshot.forEach(function(childSnapshot){
                var childKey1 = childSnapshot.key;
                if (childKey == childKey1){ //se ne trovo uno uguale, eisste nella lista dei tag del poi
                    exists = true;
                }
                return false;
              })
            })
            if (!exists){
              tagShow.push(childSnapshot);
            }
          return false;
        })
      }).then(a=>{
        this.tagList = tagShow;
      this.loadedTagList = tagShow;
      })
  }

  openAddNewTagPage(){
    this.navCtrl.push(NewtagPage, {
      poiSel : this.poiSelected,
      poiName : this.poiName,
      poiKey: this.poiKey

    })
  }
  addSelectedTag(index){
   var tagToAdd = this.tagList[index]; //corretto
   var updates = {};
  updates['/pois/'+ this.poiKey + '/tags/' + tagToAdd.key] = "true";
  firebase.database().ref().update(updates);
  this.refreshList();
    this.presentToast();
}

initializeItems(): void {
  this.tagList = this.loadedTagList;
}

presentToast(){
  let toast = this.toastCtrl.create({
    message: 'Tag added succesfully!',
    duration: 3000,
    position: 'top'
  }).present();
  this.initializeItems();
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
