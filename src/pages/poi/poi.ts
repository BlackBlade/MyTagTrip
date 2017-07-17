import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Api } from '../../providers/api';
import { AddtagPage } from "../addtag/addtag";
import firebase from 'firebase';
@Component({
  selector: 'page-poi',
  templateUrl: 'poi.html',
})
export class PoiPage {

  username: any;
  photoURL: any;
  poi: any;
  name:any;
  poiKey:any;
  public poiList:Array<any>;
  public loadedPoiList:Array<any>;
  public tags: Array<any> = [];
  public tagsToSend: Array<any> = [];
  public cityBack:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api, 
  public menuCtrl: MenuController) {
        //this.username = api.user.displayName
        //this.photoURL = api.user.photoURL
        this.poi = navParams.get('poiSelected')
        this.poiKey = navParams.get('poikey')
        this.name = this.poi.name 
        this.photoURL = this.poi.imageURL
        let tags1= [];
        let tagsSend = [];
      var ref = firebase.database().ref('/pois/'+this.poiKey+'/tags/')
      var ref1 = firebase.database().ref('/tags/');

      ref.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot){
         var childKey = childSnapshot.key;
         var childData = childSnapshot.val();
         ref1.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot){
         var childKey1 = childSnapshot.key;
         var childData1 = childSnapshot.val();
         
         if(tagsSend.length!==0){ //creazione lista per visualizzazione in addtag
          var exist = false;
          tagsSend.forEach(tag=>{
           if(tag.val().name == childSnapshot.val().name){
             exist = true;
            }
         })
         if (!exist){
           tagsSend.push(childSnapshot);
         }
        } else {//vettore vuoto (prima volta)
           tagsSend.push(childSnapshot);
         }
                              
         if(childKey == childKey1){ //lista di tag per il POI selezionato
           tags1.push(childData1.name)
         };
         return false
        });
      });
         return false  
      });
    });
   
    this.loadedPoiList = tags1;
    this.poiList = tags1;
    this.tagsToSend = tagsSend;
    this.initializeItems();
  }

  refreshItems(){
    let tags1= [];
        let tagsSend = [];
     var ref = firebase.database().ref('/pois/'+this.poiKey+'/tags/')
      var ref1 = firebase.database().ref('/tags/');

      ref.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot){
         var childKey = childSnapshot.key;
         var childData = childSnapshot.val();
         ref1.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot){
         var childKey1 = childSnapshot.key;
         var childData1 = childSnapshot.val();
         
         if(tagsSend.length!==0){ //creazione lista per visualizzazione in addtag
          var exist = false;
          tagsSend.forEach(tag=>{
           if(tag.val().name == childSnapshot.val().name){
             exist = true;
            }
         })
         if (!exist){
           tagsSend.push(childSnapshot);
         }
        } else {//vettore vuoto (prima volta)
           tagsSend.push(childSnapshot);
         }
                              
         if(childKey == childKey1){ //lista di tag per il POI selezionato
           tags1.push(childData1.name)
         };
         return false
        });
      });
         return false  
      });
    });
   
    this.loadedPoiList = tags1;
    this.poiList = tags1;
    this.tagsToSend = tagsSend;
  }
  initializeItems(): void {
  this.poiList = this.loadedPoiList;
}

  ionViewDidLoad() {
    this.menuCtrl.close();
    this.initializeItems();
  }

  ionViewWillEnter(){
    this.refreshItems();
  }

  openAddTagPage(){
    this.navCtrl.push(AddtagPage, {
      recTags : this.tagsToSend,
      poi: this.poi,
      poiKey : this.poiKey
    });
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
