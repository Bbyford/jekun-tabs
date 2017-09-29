import { RequestMethod, RequestOptions, URLSearchParams, Request, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BASE_URL } from '../app/config/baseurl';



@Injectable()
export class ApiService {
  constructor(
    private http: Http,
    private storage: Storage
  ) { }


  public $get(path: string, params: URLSearchParams, contentType?: string) {
    let url = `${BASE_URL}${path}`;
    let requestOptions = this._createRequestOptions(url, RequestMethod.Get, params, );
    return this.http.request(new Request(requestOptions))
      .map(
      res => res.json()
      )
      .catch(
      err => {
        return Observable.throw(err);
      })
  }
  /* post请求 */
  public $post(path: string, params: URLSearchParams) {
    let url = `${BASE_URL}${path}`;
    let requestOptions = this._createRequestOptions(url, RequestMethod.Post, params);
    return this.http.request(new Request(requestOptions))
      .map(
      res => res.json()
      )
  };



  public login($params) {
    let initHeaders = new Headers({ "content-type": 'application/x-www-form-urlencoded' });
   
    
    let _url = `${BASE_URL}app/loginAction/doNotNeedSession_login.action`;

    let requestOptions = new RequestOptions({
      headers: initHeaders,
      url: _url,
      method: RequestMethod.Post,
      params: $params
    });
    return this.http.request(new Request(requestOptions))
      .map(
      res =>
        res.json()
      )
  }



  /*  未登录走 catch,已登录走then */
  private _createHeadersWithUserInfo(): Headers {
    let headers: Headers = new Headers({ 'content-type': 'application/x-www-form-urlencoded' });
    return headers;
  }

  /*所有请求基于此方法生成请求项 */
  private _createRequestOptions($url: string, $method: RequestMethod, $params: URLSearchParams = null, $body: any = null): RequestOptions {

    let requestOptions: RequestOptions = new RequestOptions({
      headers: this._createHeadersWithUserInfo(),
      method: $method,
      url: $url,
      params: $params,
      body: $body
    })

    return requestOptions;
  }


}