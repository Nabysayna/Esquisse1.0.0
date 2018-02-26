import { Injectable }    from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class UtilsService {

  //private link = "https://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/backend-SB-Admin-BS4-Angular-4/index.php";
  private link = "http://localhost/backup-sb-admin/new-backend-esquise/index.php";


  private headers = new Headers();
  private basetoken:any;

  constructor(private _http: Http){
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.basetoken = JSON.parse(sessionStorage.getItem('currentUser')).baseToken;
  }

  getOnePointSuivicc(data:any){
    let url = this.link+"/utils-adminpdv/getdetailonepointsuivisentool";
    let datas = JSON.stringify({token:this.basetoken, data:data});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  recupererInfosCC(){
    let url = this.link+"/utils-adminpdv/initajoutdeposit";
    let datas = JSON.stringify({token:this.basetoken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  demandedeposit(data:any){
    let url = this.link+"/utils-adminpdv/demndedeposit";
    let datas = JSON.stringify(data);
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  getRegion(){
    let url = this.link+"/util/region";
    let datas = JSON.stringify({});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  getZoneByRegion(region:string){
    let url = this.link+"/util/zone";
    let datas = JSON.stringify({region:region});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  getSouszoneByZoneByRegion(data:any){
    let url = this.link+"/util/souszonebyzonebyregion";
    let datas = JSON.stringify(data);
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }



  /////////////////////////////////////////////////////////////////

  getDetailOnePointSuivicc(data:any){
    let url = this.link+"/apiplatform/getdetailonepointsuivicc";
    let datas = JSON.stringify({token:this.basetoken, data:data});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }




}
