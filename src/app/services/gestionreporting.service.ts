import { Injectable }    from '@angular/core';
import {Http, Headers} from "@angular/http";

export class Gestionreporting{
  dateoperation:any;
  operateur:string;
  traitement:string;
  montant:number;
}

export class Servicepoint{
  nom:string;
  designations:string;
}



@Injectable()
export class GestionreportingService {

  //private link = "https://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/backend-SB-Admin-BS4-Angular-4/index.php";
  private link = "http://localhost/backup-sb-admin/new-backend-esquise/index.php";
  //private link = "http://sentool.bbstvnet.com/sslayer/index.php";


  private headers = new Headers();
  private basetoken:any;

  constructor(private _http: Http){
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.basetoken = JSON.parse(sessionStorage.getItem('currentUser')).baseToken;
  }

  reportingdate(data:any){
    let url = this.link+"/gestionreporting-sen/reportingdate";
    let datas = JSON.stringify({token:this.basetoken, idpdv:data.idpdv, type:data.type, infotype:data.infotype});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  reimpression(data:any){
    let url = this.link+"/gestionreporting-sen/reimpression";
    let datas = JSON.stringify({token:this.basetoken, idpdv:data.idpdv, operation:data.operation, infooperation:data.infooperation});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  gestionreporting(){
    let url = this.link+"/gestionreporting-sen/gestionreporting";
    let datas = JSON.stringify({token:this.basetoken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  servicepoint(){
    let url = this.link+"/gestionreporting-sen/servicepoint";
    let datas = JSON.stringify({token:this.basetoken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  ajoutdepense(data:any){
    let url = this.link+"/gestionreporting-sen/ajoutdepense";
    let datas = JSON.stringify({token:this.basetoken, libelle:data.libelle, service:data.service, montant:data.montant});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  reclamation(data:any){
    let url = this.link+"/gestionreporting-sen/reclamation";
    let datas = JSON.stringify({token:this.basetoken, sujet:data.sujet, nomservice:data.nomservice, message:data.message});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  vente(data:any){
    let url = this.link+"/gestionreporting-sen/vente";
    let datas = JSON.stringify({token:this.basetoken, servicevente:data.servicevente, designation:data.designation, quantite:data.quantite});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }


}
