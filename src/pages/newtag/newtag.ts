import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { Api } from '../../providers/api';
import firebase from 'firebase';
import { PoiPage } from "../poi/poi";
@Component({
  selector: 'page-newtag',
  templateUrl: 'newtag.html',
})
export class NewtagPage {

  public poiName:any;
  public tagList: Array<any>;
  public loadedTagList: Array<any>;
  public poiSelected: any;
  public poiKey:any;
  public isEnabled :boolean;
  public textSearch:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, 
  public menuCtrl: MenuController, public toastCtrl: ToastController) {
 
      this.poiSelected = navParams.get('poiSel');
      this.poiName = this.poiSelected.name;
      this.poiKey = navParams.get('poiKey');
      var ref1 = firebase.database().ref('/tags/'); //prendo tutti i tag esistenti

      
      //creo la lista di tag
       ref1.once('value', tagList => {
      let tags = [];
      tagList.forEach( poi => {
        tags.push(poi.val());
        return false;
      });

      this.tagList = tags;
      this.loadedTagList = tags;
    });
        
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
  }

  ionViewWillEnter() {
    this.initializeItems();

  }

  addSelectedTag(index){
   var tagToAdd = this.tagList[index]; //corretto
   var updates = {};
  updates['/pois/'+ this.poiKey + '/tags/' + tagToAdd.key] = "true";
  firebase.database().ref().update(updates);
  

}

refreshItems():void{
var ref1 = firebase.database().ref('/tags/'); //prendo tutti i tag esistenti


      //creo la lista di tag
       ref1.once('value', tagList => {
      let tags = [];
      tagList.forEach( poi => {
        tags.push(poi.val());
        return false;
      });

      this.tagList = tags;
      this.loadedTagList = tags;
    });
}

initializeItems(): void {
  this.tagList = this.loadedTagList;
}

presentToastOk(){
  let toast = this.toastCtrl.create({
    message: 'Tag added succesfully!',
    duration: 3000,
    position: 'top'
  }).present();
  this.initializeItems();
}

presentToastWrong(){
  let toast = this.toastCtrl.create({
    message: 'Seems like you are trying to add an existing tag! ',
    duration: 3000,
    position: 'top'
  }).present();

}

clickedButton(){
  if (this.tagList.length==0){//posso aggiungere il tag
    var tagData = {
      name: this.textSearch
    }
    var key = firebase.database().ref().child('tags').push().key;
    var updates = {};
    updates['/tags/'+key] = tagData;
    updates['/pois/'+ this.poiKey + '/tags/' + key] = "true";
    firebase.database().ref().update(updates);
    this.presentToastOk();
    this.refreshItems();
    this.isEnabled = false;
  } else {
    this.presentToastWrong();
    
  }
}


getItems(searchbar) {
  // Reset items back to all of the items
  this.initializeItems();

  // set q to the value of the searchbar
  var q = searchbar.srcElement.value;
  this.textSearch = q;

  // if the value is an empty string don't filter the items
  if (!q) {
    return;
  }

  this.tagList = this.tagList.filter((v) => {
    if(v.name && q) {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });

  if (this.tagList.length==0){
    this.isEnabled = true;
  } else{
    this.isEnabled = false;
  }

 
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
