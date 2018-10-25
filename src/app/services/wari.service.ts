
import {Injectable} from '@angular/core';
import {Http,Headers} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class WariService {


  //private link = "https://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/new-backend-esquise/index.php";
//  private link = "https://sentool.bbstvnet.com/sslayer/index.php";

  private link = "https://mysentool.pro/index.php";


  private headers = new Headers();

  constructor(private http:Http) {
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  public envoi(token:string,data:string) : Promise<{}[]> {
    let link=this.link+"/wari-sen/requerirControllerWari";
    console.log(link);
    let params="params="+JSON.stringify({token:token,requete:data});
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
          console.log(data)
          resolve(data);
      });
    });
  }

  public retaitrerecherche(token:string,data:string) : Promise<{}[]> {
    let link=this.link+"/wari-sen/infocode";
    console.log(link);
    let params="params="+ JSON.stringify({token:token, code:data});
      // let params = JSON.stringify({token:"azerty", code:data});
      return new Promise( (resolve, reject) => {
        this.http.post(link,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
            console.log(data);
            resolve(data);
        });
      });
  }

  public retaitconfirmer(token:string,data:string) : Promise<{}[]> {
    let link=this.link+"/wari-sen/requerirControllerWari";
    console.log(link);
    let params="params="+JSON.stringify({token:token,requete:data});
      return new Promise( (resolve, reject) => {
        this.http.post(link,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
            console.log(data)
            resolve(data);
        });
      });
  }



}
