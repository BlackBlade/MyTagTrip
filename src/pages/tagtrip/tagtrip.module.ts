import { NgModule } from '@angular/core';
import { TagTripPage} from './tagtrip';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [TagTripPage],
  imports: [IonicPageModule.forChild(TagTripPage)],
  entryComponents: [TagTripPage]
})
export class TagTripPageModule { }
