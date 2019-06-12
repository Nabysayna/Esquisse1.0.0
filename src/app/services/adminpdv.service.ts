import { Injectable }    from '@angular/core';
import {Http, Headers} from "@angular/http";

@Injectable()
export class AdminpdvService {

  //private link = "https://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/new-backend-esquise/index.php";
//  private link = "https://sentool.bbstvnet.com/sslayer/index.php";

  private link = "https://sentool.bbstvnet.com/index.php";

  private headers = new Headers();
  private basetoken:any;

  constructor(private _http: Http){
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.basetoken = JSON.parse(sessionStorage.getItem('currentUser')).baseToken;
  }

  nombredereclamationpdvvente(data:any){
    let url = this.link+"/admindpv-sen/nombredereclamationpdvvente";
    let datas = JSON.stringify({token:this.basetoken, type:data.type});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  historiquereclamation(data:any){
    let url = this.link+"/admindpv-sen/historiquereclamation";
    let datas = JSON.stringify({token:this.basetoken, type:data.type});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  listuserpdv(data:any){
    let url = this.link+"/admindpv-sen/listuserpdv";
    let datas = JSON.stringify({token:this.basetoken, type:data.type});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  modifypdv(data:any){
    let url = this.link+"/admindpv-sen/modifypdv";
    let datas = JSON.stringify({token:this.basetoken, idpdv: data.idpdv, modifydata: data.modifydata});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  deconnectpdv(data:any){
    let url = this.link+"/admindpv-sen/deconnectpdv";
    let datas = JSON.stringify({token:this.basetoken, idpdv: data.idpdv});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  autoriservoirdepot(data:any){
    let url = this.link+"/admindpv-sen/autoriservoirdepot";
    let datas = JSON.stringify({token:this.basetoken, idpdv: data.idpdv, estautoriser: data.estautoriser});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  bilandeposit(data:any){
    let url = this.link+"/admindpv-sen/bilandeposit";
    let datas = JSON.stringify({token:this.basetoken, type: data.type});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  demandeRetrait(data:any){
    let url = this.link+"/admindpv-sen/demandeRetrait";
    let datas = JSON.stringify({token:this.basetoken, montant:data.montant});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  validerDemandeDepot(data:any){
    let url = this.link+"/admindpv-sen/validerDemandeDepot";
    console.log(url);
    let datas = JSON.stringify({token:this.basetoken, montant: data.montant, infocc: data.infocc, infocom: data.infocom});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

}
