/**
 * @author [zhanghao]
 * @email [zh_buctwbzs@163.com]
 * @create date 2017-08-31 03:05:12
 * @modify date 2017-08-31 03:05:12
 * @desc [一个帅哥]
*/
import { Component } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ModalController, IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Md5 } from 'ts-md5/dist/md5'
import { BackBtnService } from '../../services/backBtn.service';
import { ApiService } from '../../services/api.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ModelPage } from '../model/model';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public isRemmber: boolean = true;
  public isShow: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public plt: Platform,
    public bbs: BackBtnService,
    public apiService: ApiService,
    private storage: Storage,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) {
    plt.ready().then(() => {
      this.bbs.registerBackButttonAction(null);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /**
   * login
   */
  public login(id: string, psw: string) {
    if (id && psw) {
      let md5psw = Md5.hashStr(psw);
      let $params = new URLSearchParams();
      $params.set('pdata', JSON.stringify({ CZYID: id, CZYMM: md5psw }))



      this.apiService.login($params).subscribe(
        data => {
          console.log(data);
          if (data['success']) {
            this.storage.set('USER_INFO', JSON.stringify(data['obj']));
            let $bdjsArr = data['obj']['BDJS'];
            let modelInstance = this.modalCtrl.create(ModelPage, { bdjsArr: $bdjsArr });
            modelInstance.present();
          } else {
            let toast = this.toastCtrl.create({
              message: '账号或密码错误',
              duration: 1000,
              cssClass: 'text-center',
              position: 'top'
            });
            toast.present();
          }
        })
    } else {
      let toast = this.toastCtrl.create({
        message: '请输入完整的账号密码',
        duration: 1000,
        cssClass: 'text-center',
        position: 'top'
      });
      toast.present();
    }
  }
}

