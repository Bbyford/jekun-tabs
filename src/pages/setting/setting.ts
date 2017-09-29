import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage'
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  constructor(public navCtrl: NavController, public plt: Platform, public storage: Storage) {

  }
  /**
   * exit
   */
  public exit() {
    this.storage.clear()
      .then(_ => this.plt.exitApp())
  }
}
