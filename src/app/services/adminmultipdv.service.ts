import { Injectable }    from '@angular/core';
import {Http, Headers} from "@angular/http";

@Injectable()
export class AdminmultipdvService {

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

  bilandeposit(data:any){
    let url = this.link+"/adminmultidpv-sen/bilandeposit";
    let datas = JSON.stringify({token:this.basetoken, type:data.type});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  depositinitialconsommeparservice(data:any){
    let url = this.link+"/adminmultidpv-sen/depositinitialconsommeparservice";
    let datas = JSON.stringify({token:this.basetoken, type:data.type});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  historiquereclamation(data:any){
    let url = this.link+"/adminmultidpv-sen/historiquereclamation";
    let datas = JSON.stringify({token:this.basetoken, type:data.type});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  demanderetraitfond(data:any){
    let url = this.link+"/adminmultidpv-sen/demanderetraitfond";
    let datas = JSON.stringify({token:this.basetoken, type:data.type});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  validerretrait(data:any){
    let url = this.link+"/adminmultidpv-sen/validerretrait";
    let datas = JSON.stringify({token:this.basetoken, type:data.type, idretrait: data.idretrait});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  listmajcautions(data:any){
    let url = this.link+"/adminmultidpv-sen/listmajcautions";
    let datas = JSON.stringify({token:this.basetoken, type:data.type});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  modifymajcaution(data:any){
    let url = this.link+"/adminmultidpv-sen/modifymajcaution";
    let datas = JSON.stringify({token:this.basetoken, type:data.type, idadminpdv: data.idadminpdv, modifycaution: data.modifycaution, categorie:data.categorie});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  nombredereclamationagentpdvvente(data:any){
    let url = this.link+"/adminmultidpv-sen/nombredereclamationagentpdvvente";
    let datas = JSON.stringify({token:this.basetoken, type:data.type});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  activiteservices(data:any){
    let url = this.link+"/adminmultidpv-sen/activiteservices";
    let datas = JSON.stringify({token:this.basetoken, type:data.type});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  performancesadminclasserbydate(data:any){
    let url = this.link+"/adminmultidpv-sen/performancesadminclasserbydate";
    let datas = JSON.stringify({token:this.basetoken, typedate:data.typedate});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  performancesadminclasserbylotbydate(data:any){
    let url = this.link+"/adminmultidpv-sen/performancesadminclasserbylotbydate";
    let datas = JSON.stringify({token:this.basetoken, typelot:data.typelot, typedate:data.typedate});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  detailperformancesadminclasserbydate(data:any){
    let url = this.link+"/adminmultidpv-sen/detailperformancesadminclasserbydate";
    let datas = JSON.stringify({token:this.basetoken, idadminpdv:data.idadminpdv, typedate:data.typedate});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  listmap(data:any){
    let url = this.link+"/adminmultidpv-sen/activiteservices";
    let datas = JSON.stringify({token:this.basetoken, type:data.type});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }


}
