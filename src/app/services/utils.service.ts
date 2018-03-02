import { Injectable }    from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";

@Injectable()
export class UtilsService {

  //private link = "https://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/new-backend-esquise/index.php";
  private link = "http://sentool.bbstvnet.com/sslayer/index.php";


  private headers = new Headers();

  constructor(private _http: Http){
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  getOnePointSuivicc(data:any){
    let url = this.link+"/utils-sen/getdetailonepointsuivisentool";
    let datas = JSON.stringify({token:JSON.parse(sessionStorage.getItem('currentUser')).baseToken, data:data});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  recupererInfosCC(){
    let url = this.link+"/utils-sen/initajoutdeposit";
    let datas = JSON.stringify({token:JSON.parse(sessionStorage.getItem('currentUser')).baseToken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  demandedeposit(data:any){
    let url = this.link+"/utils-sen/demndedeposit";
    let datas = JSON.stringify(data);
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  getRegion(){
    let url = this.link+"/utils-crm/region";
    let datas = JSON.stringify({});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  getZoneByRegion(region:string){
    let url = this.link+"/utils-crm/zone";
    let datas = JSON.stringify({region:region});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  getSouszoneByZoneByRegion(data:any){
    let url = this.link+"/utils-crm/souszonebyzonebyregion";
    let datas = JSON.stringify(data);
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  consulterLanceurDalerte(){
    let url = this.link+"/utils-sen/consulterLanceurDalerte";
    let datas = JSON.stringify({});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  isDepotCheckAuthorized(){
    let url = this.link+"/utils-sen/isDepotCheckAuthorized";
    let datas = JSON.stringify({token:JSON.parse(sessionStorage.getItem('currentUser')).baseToken});
    let params = 'requestParam='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  checkCaution(){
    let url = this.link+"/utils-sen/checkCaution";
    let datas = JSON.stringify({token:JSON.parse(sessionStorage.getItem('currentUser')).baseToken});
    let params = 'requestParam='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }



  /////////////////////////////////////////////////////////////////

  getDetailOnePointSuivicc(data:any){
    let url = this.link+"/apiplatform/getdetailonepointsuivicc";
    let datas = JSON.stringify({token:JSON.parse(sessionStorage.getItem('currentUser')).baseToken, data:data});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }


}
