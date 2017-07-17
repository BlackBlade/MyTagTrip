import { Component } from '@angular/core';
import { NavController, App} from 'ionic-angular';
import { Api } from '../../providers/api';

/*import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';*/

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  username: any;
/*  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;*/

 /* tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";*/

  constructor(public navCtrl: NavController, private _app: App, public api: Api) {
    this.username = api.user.displayName
   /* translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab2Title = values['TAB2_TITLE'];
      this.tab3Title = values['TAB3_TITLE'];
    });*/
  }

  ionViewDidEnter(){

 this._app.setTitle("Main");
  }
}
