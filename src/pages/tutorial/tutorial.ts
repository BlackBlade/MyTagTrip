import { Component } from '@angular/core';
import { App, MenuController, NavController } from 'ionic-angular';

import { WelcomePage } from '../welcome/welcome';

import { TranslateService } from '@ngx-translate/core';



export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController, public menu: MenuController, public _app:App) {
        this.slides = [
          {
            title: "Welcome to My Tag Trip!",
            description: "My Tag Trip lets you organize your cultural trip using tags entered by users",
            image: 'assets/img/hand-gesture.png',
          },
          {
            title: "Plan your trip",
            description: "Enter the city and choose the tags to plan your journey",
            image: 'assets/img/005-map.png',
            
          },
          {
            title: "Enter new tags",
            description: "Add new tags to points of interest to improve the experience",
            image: 'assets/img/tag.png',
          }
        ];
  }

  startApp() {
    this.navCtrl.setRoot(WelcomePage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    this._app.setTitle("My Tag Trip")
    this.menu.enable(false);
  }

  ionViewWillLeave() {

  }

}
