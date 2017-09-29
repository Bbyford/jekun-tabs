import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-model',
  templateUrl: 'model.html',
})
export class ModelPage {

  public bdjs_Arr = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage

  ) {
  }

  ionViewDidLoad() {
    this.bdjs_Arr = this.navParams.get('bdjsArr');
  }
  public gotoDBFL($event, $bdjsIndex) {
    this.storage.set('bdjsIndex', $bdjsIndex);
    console.log($bdjsIndex);
    this.navCtrl.push(TabsPage)
  }
}
