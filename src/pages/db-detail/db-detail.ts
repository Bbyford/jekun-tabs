import { URLSearchParams } from '@angular/http';
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiService } from '../../services/api.service';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-db-detail',
  templateUrl: 'db-detail.html',
})
export class DbDetailPage {
  public item = null;
  public masterItems: {} = {};
  public slaveItems: any[] = [];
  private dbfl;
  private cfdh;
  private cdnm;
  private ts01;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private storage: Storage,
    private api: ApiService,
    private toastCtrl: ToastController,
    private cd: ChangeDetectorRef
  ) {
  }

  ionViewDidLoad() {
    this.item = this.navParams.get('itemKey');
    console.log(this.item);
    this.dbfl = this.item['DBFL'];
    this.cfdh = this.item['CFDH'];
    this.cdnm = this.item['CDNM'];
    this.loadDetail();

  }



  public loadDetail() {
    let [objPromise, indexPromise] = [this.storage.get('USER_INFO'), this.storage.get('bdjsIndex')];

    Promise.all([objPromise, indexPromise])
      .then(
      arrData => {
        let params = new URLSearchParams();
        let index = arrData[1];
        let userInfo = JSON.parse(arrData[0]);
        let bdjs = userInfo['BDJS'][index];
        let bdjsid = bdjs['BDJSID'];
        let bdqxid = bdjs['BDQXID'];
        let pdata = { TYJSID: bdjsid, BDQXID: bdqxid, DBFL: this.item['DBFL'], CFDH: this.item['CFDH'], CFDJLX: this.item['CFDJLX'], CFDJZT: this.item['CFDJZT'], DBDJLX: this.item['DBDJLX'] };
        params.set('pdata', JSON.stringify(pdata));
        this.api.$post('app/loginAction/getDetail.action', params).subscribe(
          data => {
            if (data['success']) {
              console.log(data);
              this.masterItems = data['obj']['masterList'];
              this.ts01 = this.masterItems['unVisiable']['TS01'];
              this.slaveItems = data['obj']['slaveList'];
              this.cd.detectChanges();            //加载数据成功后务必执行一次变化检测，不然会报错
            } else {
              let toast = this.toastCtrl.create({
                message: data['msg'],
                duration: 1500,
                position: 'middle'
              });
              toast.present();
            }
          })
      }).catch(
      err => console.log(err)
      );
  }

  /*  */



  approval() {
    let params = new URLSearchParams();
    this.storage.get('USER_INFO')
      .then(userInfo => {
        let user_info = JSON.parse(userInfo);
        let rymc = user_info['RYMC'];
        let pdata = { DBFL: this.dbfl, CFDH: this.cfdh, RYMC: rymc, TS01: this.ts01, CDNM: this.cdnm, CFDJLX: this.item['CFDJLX'], CFDJZT: this.item['CFDJZT'], DBDJLX: this.item['DBDJLX'] };

        switch (this.dbfl) {
          case "定损报价单待办":
            pdata['alter'] = { SWBZ: this.masterItems['enableEdit'][0]['value'] };
            break;
          case "快速服务单转价格审核待办":
          case "方案价格审核待办":
            let _detail = [];
            for (var i = 0; i < this.slaveItems.length; i++) {
              let obj = {};
              let slaveItem = this.slaveItems[i];
              obj['YHDJ'] = slaveItem.enableEdit[0]['value'];
              obj['FABH'] = slaveItem.unVisiable['FABH'];
              obj['FAXH'] = slaveItem.unVisiable['FAXH'];
              obj['SPID'] = slaveItem.unableEdit[0]['value'];
              _detail.push(obj);
            }
            pdata['alter'] = { "FWFAH": this.masterItems['unVisiable']['FWFAH'] || "", detail: _detail }
            break;
          default:
            break;
        }
        console.log(pdata);
        params.set('pdata', JSON.stringify(pdata));
        this.api.$post('app/loginAction/postAudit.action', params)
          .subscribe(res => {
            if (res['success']) {
              let toast = this.toastCtrl.create({
                message: "审批完成",
                duration: 1000,
                cssClass: 'text-center',
                position: 'middle'
              });
              toast.present();
              setTimeout(() => {
                this.navCtrl.pop()
              }, 1000)
            } else {
              let toast = this.toastCtrl.create({
                message: res['msg'],
                duration: 1000,
                cssClass: 'text-center',
                position: 'middle'
              });
              toast.present();
              setTimeout(() => {
                this.navCtrl.pop()
              }, 1000)
            }
          })
      })
  }

  goBack() {
    this.navCtrl.pop();
  }
  scrollToTop() {
    let ele = document.querySelector('#top');
    ele.scrollIntoView();
  }
  scrollToBottom() {
    let ele = document.querySelector('#bottom');
    ele.scrollIntoView();
  }

}
