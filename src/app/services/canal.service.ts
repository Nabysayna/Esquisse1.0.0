import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";

@Injectable()
export class CanalService {

 private link = "http://localhost/canal_backend/";

  private headers=new Headers();
  private token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  public datas:any;

  public abonnement(requete:any): Promise<any>{
    let params="requestParam="+JSON.stringify({requete : requete});
    let link=this.link+"handleAlert.php";
    console.log(params);
    return this.http.post(link,params,{headers:this.headers}).toPromise().then( res => {console.log(res);return res} ).catch(error => {console.log(error);return 'bad' });
  }

  constructor(private http:Http) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

}
