import { Injectable }    from '@angular/core';
import {Http, Headers} from "@angular/http";

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

  /*
  consulterLanceurDalerte(): Promise<any>{
    let url:string = this.linkalert;

//        let reqPara = JSON.stringify( {requestParam : requete, tokenParam : this.token} ) ;
//        let body='requestParam='+reqPara;
    let body='';
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({ headers: headers });

    return this._http.post( url,body, options).toPromise().then( res => {return res} ).catch(error => {return '-' });
  }

  isDepotCheckAuthorized(): Promise<any>{
    let url = "http://51.254.200.129/backendprod/horsSentiersBattus/scripts/verifierAutorisation.php";
    let reqPara = JSON.stringify( {token : this.token} ) ;
    let body='requestParam='+reqPara;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({ headers: headers });
    return this._http.post( url,body, options).toPromise().then( res => {return res} ).catch(error => {return 'bad' });
  }

  checkCaution(): Promise<any>{
    let url = "http://51.254.200.129/backendprod/horsSentiersBattus/scripts/getCaution.php";
    let reqPara = JSON.stringify( {token : this.token} ) ;
    let body='requestParam='+reqPara;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({ headers: headers });
    return this._http.post( url,body, options).toPromise().then( res => {return res} ).catch(error => {return 'bad' });
  }
  */



  listcreditmanager(){
    let url = this.link+"/apifromsentool/listcreditmanager";
    let datas = JSON.stringify({token:this.basetoken, type:'me'});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  valideraacreditmanager(data:any){
    let url = this.link+"/apifromsentool/ajoutcreditmanager";
    let datas = JSON.stringify({token:this.basetoken, data:data});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  getDetailOnePointSuivicc(data:any){
    let url = this.link+"/apiplatform/getdetailonepointsuivicc";
    let datas = JSON.stringify({token:this.basetoken, data:data});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }




}
