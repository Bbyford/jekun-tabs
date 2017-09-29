import { Component, ViewChild } from '@angular/core';
import { CheckedPage } from '../checked/checked';
import { SettingPage } from '../setting/setting';
import { AwaitPage } from '../await/await';
import { Tabs, Platform } from 'ionic-angular';
import { BackBtnService } from '../../services/backBtn.service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') tabRef: Tabs;

  tab1Root = AwaitPage;
  tab2Root = CheckedPage;
  tab3Root = SettingPage;

  constructor(public plt: Platform, public bbs: BackBtnService) {
    plt.ready().then(() => {
      this.bbs.registerBackButttonAction(this.tabRef);
    });
  }
}
