import { Injectable }    from '@angular/core';
import {Http, Headers} from "@angular/http";

@Injectable()
export class TarifsService {

  private link = "https://mysentool.pro/index.php";


  private headers = new Headers();

  constructor(private _http: Http){
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  getTarifTntAbon(data:any){
    let url = this.link+"/tf-sen/tntAbon";
    let datas = JSON.stringify({token:JSON.parse(sessionStorage.getItem('currentUser')).baseToken, data:data});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers}).map(res => res.json());
  }


}
