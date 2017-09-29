import { Component } from '@angular/core';
import { ToastController, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../services/api.service';
import { ApprovalClass } from '../../model/item';
import { URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ClassListPage } from '../class-list/class-list';

@Component({
  selector: 'page-await',
  templateUrl: 'await.html'
})
export class AwaitPage {
  public bdjs = null;
  public amount: number = 38;
  public items: ApprovalClass[] = [

  ];

  constructor(
    public navCtrl: NavController,
    private params: NavParams,
    public apiService: ApiService,
    private toastCtrl: ToastController,
    private storage: Storage
  ) { }

  ionViewDidLoad() {
    console.log('aaa');
    this.loadList();
  }
  ionViewWillEnter() {
    this.loadList();
  }


  /**
   * loadList
   */
  public loadList() {

    let [objPromise, indexPromise] = [this.storage.get('USER_INFO'), this.storage.get('bdjsIndex')];

    Promise.all([objPromise, indexPromise])
      .then(
      arrData => {
        let params = new URLSearchParams();
        let index = arrData[1];
        let userInfo = JSON.parse(arrData[0]);
        let tyjsid = userInfo['BDJS'][index]['TYJSID'];
        let bdqxid = userInfo['BDJS'][index]['BDQXID'];
        let pdata = { TYJSID: tyjsid, BDQXID: bdqxid };
        params.set('pdata', JSON.stringify(pdata));
        this.apiService.$post('app/loginAction/getYwdbLX.action', params).subscribe(
          data => {
            if (data['success']) {
              console.log(data);
              let allDB = data['obj']['allDB'];
              if (allDB.length > 0) {
                this.items = data['obj']['allDB'];
              }
            } else {
              console.log('数据查询失败，请下拉刷新');
              this.toastCtrl.create({
                message: '数据查询失败，请下拉刷新',
                duration: 1500,
                cssClass: 'text-center',
                position: 'top'
              });
            }
          })
      })
      .catch(err => console.log(err));
  }

  public gotoListPage(event, item) {
    this.navCtrl.push(ClassListPage, { itemKey: item });
  }

}
