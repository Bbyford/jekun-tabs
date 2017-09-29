import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage'

import { Jekun } from './app.component';
import { CheckedPage } from '../pages/checked/checked';
import { SettingPage } from '../pages/setting/setting';
import { AwaitPage } from '../pages/await/await';
import { TabsPage } from '../pages/tabs/tabs';

import { LoginPageModule } from '../pages/login/login.module';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackBtnService } from '../services/backBtn.service';
import { ApiService } from '../services/api.service';
import { ClassListPage } from '../pages/class-list/class-list';
import { DbDetailPage } from '../pages/db-detail/db-detail';
import { ModelPage } from '../pages/model/model';


@NgModule({
  declarations: [
    Jekun,
    CheckedPage,
    SettingPage,
    AwaitPage,
    TabsPage,
    ClassListPage,
    DbDetailPage,
    ModelPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(Jekun),
    IonicStorageModule.forRoot(),
    LoginPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Jekun,
    TabsPage,
    AwaitPage,
    CheckedPage,
    SettingPage,
    ClassListPage,
    DbDetailPage,
    ModelPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackBtnService,
    ApiService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
