import { Injectable }    from '@angular/core';
import {Http, Headers} from "@angular/http";


export class Portefeuille{
  nom:string;
  prenom:string;
  telephone:string;
  nombre_operation:number;
  fidelite:number;
  date_ajout:any;
}

export class Relance{
  iduser : number ;
  prenom:string ;
  nom:string ;
  telephone:string ;
  infosoperation:string;
  echeance:any;
}

export class Promotion{
  nom:string;
  prenom:string;
  telephone:string;
  nombre_operation:number;
  fidelite:number;
  date_ajout:any;
}

export class Prospection{
  nom:string;
  prenom:string;
  telephone:string;
}

export class Suivicommande{
  nomclient:string;
  prenomclient:string;
  montantcommande:number;
  pointderecuperation:string;
  etat:string;
}

export class Servicepoint{
  nom:string;
  designations:string;
}


@Injectable()
export class CrmService {

  //private link = "http://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/new-backend-esquise/index.php";
  private link = "http://sentool.bbstvnet.com/sslayer/index.php";


  private headers = new Headers();
  private basetoken:any;

  constructor(private _http: Http){
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.basetoken = JSON.parse(sessionStorage.getItem('currentUser')).baseToken;
  }

  validerDemandeDepot(data:any){
    let url = this.link+"/crm-sen/validerDemandeDepot";
    let datas = JSON.stringify({token:this.basetoken, montant: data.montant, infocc: data.infocc, infocom: data.infocom});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  getEtatDemandeDepot(data:any){
    let url = this.link+"/crm-sen/getEtatDemandeDepot";
    let datas = JSON.stringify({token:this.basetoken, infosup: data.infosup});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  portefeuille(){
    let url = this.link+"/crm-sen/portefeuille";
    let datas = JSON.stringify({token:this.basetoken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  relance(){
    let url = this.link+"/crm-sen/relance";
    let datas = JSON.stringify({token:this.basetoken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  promotion(){
    let url = this.link+"/crm-sen/promotion";
    let datas = JSON.stringify({token:this.basetoken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  sendSms(data:any){
    let url = this.link+"/crm-sen/sendSms";
    let datas = JSON.stringify({token:this.basetoken, destinataires:data.destinataire, messageContain:data.message});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  prospection(){
    let url = this.link+"/crm-sen/prospection";
    let datas = JSON.stringify({token:this.basetoken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  suivicommande(){
    let url = this.link+"/crm-sen/suivicommande";
    let datas = JSON.stringify({token:this.basetoken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  servicepoint(){
    let url = this.link+"/crm-sen/servicepoint";
    let datas = JSON.stringify({token:this.basetoken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

}
