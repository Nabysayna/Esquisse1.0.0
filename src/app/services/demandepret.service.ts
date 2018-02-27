import { Injectable }    from '@angular/core';
import {Http, Headers} from "@angular/http";


export class Demandepret{
  plafond:number;
}

@Injectable()
export class DemandepretService {

  //private link = "https://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/backend-SB-Admin-BS4-Angular-4/index.php";
  private link = "http://localhost/backup-sb-admin/new-backend-esquise/index.php";
  //private link = "http://sentool.bbstvnet.com/sslayer/index.php";


  private headers = new Headers();

  constructor(private _http: Http){
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  demandepret(){
    let url = this.link+"/demandepret-sen/demandepret";
    let datas = JSON.stringify({token:JSON.parse(sessionStorage.getItem('currentUser')).baseToken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  envoyerDemandeDepretCofina(data:any){
    let url = this.link+"/demandepret-sen/envoyerDemandeDepretCofina";
    let datas = JSON.stringify({requestParam : data, tokenParam : JSON.parse(sessionStorage.getItem('currentUser')).baseToken});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

  ajoutdemandepret(data:any){
    let url = this.link+"/demandepret-sen/ajoutdemandepret";
    let datas = JSON.stringify({ token:JSON.parse(sessionStorage.getItem('currentUser')).baseToken, montantdemande: data.montantdemande});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }

}
