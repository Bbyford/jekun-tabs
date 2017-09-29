import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'page-checked',
  templateUrl: 'checked.html'
})
export class CheckedPage {

  public amount: number = 100;
  constructor(
    public navCtrl: NavController,
    public apiService: ApiService
  ) {

  }

}
