import { Injectable }    from '@angular/core';
import {Http, Headers} from "@angular/http";

@Injectable()
export class ComptabiliteService {

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

  userexploitation(){
    let url = this.link+"/comptabilite-adminpdv/userexploitation";
    let datas = JSON.stringify({token:this.basetoken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  exploitation(data:any){
    let url = this.link+"/comptabilite-adminpdv/exploitation";
    let datas = JSON.stringify({token:this.basetoken, idpdv: data.idpdv, type: data.type, infotype: data.infotype});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  exploitationaveccommission(data:any){
    let url = this.link+"/comptabilite-adminpdv/exploitationaveccommission";
    let datas = JSON.stringify({token:this.basetoken, idpdv: data.idpdv, type: data.type, infotype: data.infotype});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  listevente(data:any){
    let url = this.link+"/comptabilite-adminpdv/listevente";
    let datas = JSON.stringify({token:this.basetoken, idpdv: data.idpdv});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  listecharge(data:any){
    let url = this.link+"/comptabilite-adminpdv/listecharge";
    let datas = JSON.stringify({token:this.basetoken, idpdv: data.idpdv});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  ajoutcharge(data:any){
    let url = this.link+"/comptabilite-adminpdv/ajoutcharge";
    let datas = JSON.stringify({token:this.basetoken, libelle: data.libelle, idpdv: data.idpdv, service: data.service, montant: data.montant});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  supprimerservice(data:any){
    let url = this.link+"/comptabilite-adminpdv/supprimerservice";
    let datas = JSON.stringify({token:this.basetoken, idsupprimer: data.idsupprimer});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  modifierservice(data:any){
    let url = this.link+"/comptabilite-adminpdv/modifierservice";
    let datas = JSON.stringify({token:this.basetoken, service: data.service, designations: data.designations, idservice: data.idservice});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  ajoutservice(data:any){
    let url = this.link+"/comptabilite-adminpdv/ajoutservice";
    let datas = JSON.stringify({token:this.basetoken, nom: data.nom, idpdv: data.idpdv, designations: data.designations});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  approvisionner(data:any){
    let url = this.link+"/comptabilite-adminpdv/approvisionner";
    let datas = JSON.stringify({token:this.basetoken, idpdv: data.idpdv, montant: data.montant});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  listecaisse(){
    let url = this.link+"/comptabilite-adminpdv/listecaisse";
    let datas = JSON.stringify({token:this.basetoken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  listeservice(data:any){
    let url = this.link+"/comptabilite-adminpdv/listeservice";
    let datas = JSON.stringify({token:this.basetoken, idpdv: data.idpdv});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  etatcaisse(){
    let url = this.link+"/comptabilite-adminpdv/etatcaisse";
    let datas = JSON.stringify({token:this.basetoken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  validerapprovisionn(data:any){
    let url = this.link+"/comptabilite-adminpdv/validerapprovisionn";
    let datas = JSON.stringify({token:this.basetoken, idcaisse: data.idcaisse});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  listerevenu(data:any){
    let url = this.link+"/comptabilite-adminpdv/listerevenu";
    let datas = JSON.stringify({token:this.basetoken, idpdv: data.idpdv});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  listerevenutransfert(data:any){
    let url = this.link+"/comptabilite-adminpdv/listerevenutransfert";
    let datas = JSON.stringify({token:this.basetoken, idpdv: data.idpdv});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }


}
