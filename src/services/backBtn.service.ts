import { Injectable } from "@angular/core";
import { Platform, App, ToastController, Tabs, NavController } from 'ionic-angular';

@Injectable()
export class BackBtnService {

  private isBackBtnPressed = false;

  constructor(
    public plt: Platform,
    public appCtrl: App,
    public toastCtrl: ToastController
  ) { }

  registerBackButttonAction(tabRef: Tabs) {
    this.plt.registerBackButtonAction(() => {
      let activeNav: NavController = this.appCtrl.getActiveNav();
      if (activeNav.canGoBack()) {
        activeNav.pop();
      } else {
        if (tabRef == null || tabRef._selectHistory[tabRef._selectHistory.length - 1] === tabRef.getByIndex(0).id) {
          this.exit();
        } else {
          tabRef.select(0);
        }
      }
    })
  }

  /**
   * exit
   */
  public exit() {
    if (this.isBackBtnPressed) {
      this.plt.exitApp();
    } else {
      this.toastCtrl.create({
        message: '再次点击将退出应用',
        duration: 2000,
        position: 'middle'
      }).present();
      this.isBackBtnPressed = true;
      setTimeout(() => { this.isBackBtnPressed = false }, 2000)
    }
  }

}