import { Component } from '@angular/core';
import { NavParams, IonicPage, NavController, ToastController } from 'ionic-angular';
import { ApiService } from '../../services/api.service';
import { URLSearchParams } from '@angular/http';
import { ApprovalClass } from '../../model/item';
import { Storage } from '@ionic/storage';
import { DbDetailPage } from '../db-detail/db-detail';
import DB_Detail from '../../model/detail';



@Component({
  selector: 'page-class-list',
  templateUrl: 'class-list.html',
})
export class ClassListPage {

  public item: ApprovalClass = null;
  public dbList: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiService: ApiService,
    public storage: Storage,
    private toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('123')
    this.item = this.navParams.get('itemKey');
    this.loadClassList();
  }

  ionViewWillEnter() { this.loadClassList(); } //返回重载



  public loadClassList() {
    let [objPromise, indexPromise] = [this.storage.get('USER_INFO'), this.storage.get('bdjsIndex')];
    Promise.all([objPromise, indexPromise])
      .then(
      arrData => {
        let params = new URLSearchParams();
        let index = arrData[1];
        let userInfo = JSON.parse(arrData[0]);
        let bdjs = userInfo['BDJS'][index];
        let tyjsid = bdjs['TYJSID'];
        let bdqxid = bdjs['BDQXID'];
        console.log(this.item);
        let pdata = { TYJSID: tyjsid, BDQXID: bdqxid, DBFL: this.item.DBFL }
        params.set('pdata', JSON.stringify(pdata));
        this.apiService.$post('app/loginAction/getYwdb.action', params).subscribe(
          data => {
            console.log(data);
            if (data['success']) {
              this.dbList = data['obj'];
              let toast = this.toastCtrl.create({
                message: "加载成功",
                duration: 500,
                cssClass: 'text-center',
                position: 'middle'
              });
              toast.present();
            } else {
              let toast = this.toastCtrl.create({
                message: "刷新失败",
                duration: 1000,
                cssClass: 'text-center',
                position: 'middle'
              });
              toast.present();
            }
          })
      }).catch(
      err => {
        let toast = this.toastCtrl.create({
          message: err['msg'],
          duration: 1000,
          cssClass: 'text-center',
          position: 'middle'
        });
        toast.present();
      }
      );
  }

  public gotoDetail(event, db) {
    this.navCtrl.push(DbDetailPage, { itemKey: db });
  }

  scrollToBottom() {
    let ele = document.getElementById('bottom');
    ele.scrollIntoView();
  }
  scrollToTop() {
    let ele = document.getElementById('top');
    ele.scrollIntoView();
  }

}
