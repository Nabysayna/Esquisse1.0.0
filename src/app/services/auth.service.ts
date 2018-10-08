import { Injectable }    from '@angular/core';
import {Http, Headers} from "@angular/http";


export class AuthResponse{
  public prenom: string;
  public nom: string;
  public nometps: string;
  public telephone: string;
  public reponse: boolean ;
  public accessLevel: number ;
  public authorizedApis: string ;
  public firstuse: number ;
  public baseToken: string ;
}

@Injectable()
export class AuthService {

  //private link = "https://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/new-backend-esquise/index.php";
//  private link = "https://sentool.bbstvnet.com/sslayer/index.php";

 // private link = "https://mysentool.pro/index.php";
  private link = " https://sentool.bbstvnet.com/index.php";

  private link = "https://sentool.bbstvnet.com/index.php";
  private headers = new Headers();

  constructor(private _http: Http){
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  authentifier(data:any){
    let url = this.link+"/auth-sen/authentification";
    let datas = JSON.stringify({login:data.login, pwd:data.pwd});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  authentificationPhaseTwo(data:any){
    let url = this.link+"/auth-sen/authentificationPhaseTwo";
    let datas = JSON.stringify({tokentemporaire:data.tokentemporaire});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  inscription(data:any){
    let url = this.link+"/auth-sen/inscription";
    let datas = JSON.stringify(data);
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  modifpwdinit(data:any){
    let url = this.link+"/auth-sen/modifpwdinit";
    let datas = JSON.stringify({token:JSON.parse(sessionStorage.getItem('currentUser')).baseToken, pwdactuel:data.pwdactuel, newpwd : data.newpwd});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  deconnexion(){
    let url = this.link+"/auth-sen/deconnexion";
    let datas = JSON.stringify({token:JSON.parse(sessionStorage.getItem('currentUser')).baseToken, hdeconnexion:"345"});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  creerProfilCaissier(data:any){
    let url = this.link+"/auth-sen/creerProfilCaissier";
    let datas = JSON.stringify({token:JSON.parse(sessionStorage.getItem('currentUser')).baseToken, prenom:data.prenom, nom:data.nom, email:data.email, telephone:data.telephone, nometps:data.nometps, nomshop:data.nomshop, adresse:data.adresse});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }


}
