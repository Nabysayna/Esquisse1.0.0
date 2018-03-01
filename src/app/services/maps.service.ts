import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";


@Injectable()
export class MapsService {


  //private link = "https://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/backend-SB-Admin-BS4-Angular-4/index.php";
  private link = "http://localhost/backup-sb-admin/new-backend-esquise/index.php";
  //private link = "http://sentool.bbstvnet.com/sslayer/index.php";

  private headers=new Headers();
  private token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  public datas:any;


  constructor(private http:Http) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  public listmaps(type : string): Promise<any>  {
    let params="params="+JSON.stringify({token: this.token, type: type});
    let link=this.link+"/maps-sen/listmaps";
    return this.http.post(link,params,{headers:this.headers}).toPromise().then( res => {return res} ).catch(error => {return 'bad' });
  }

  public listmapsdepart(type : string): Promise<any>  {
    let params="params="+JSON.stringify({token: this.token, type: type});
    let link=this.link+"/maps-sen/listmapsdepart";
    return this.http.post(link,params,{headers:this.headers}).toPromise().then( res => {return res} ).catch(error => {return 'bad' });
  }

  public listmapspardepart(type : string): Promise<any>  {
    let params="params="+JSON.stringify({token: this.token, type: type});
    let link=this.link+"/maps-sen/listmapspardepart";
    return this.http.post(link,params,{headers:this.headers}).toPromise().then( res => {return res} ).catch(error => {return 'bad' });
  }

}
