import { Injectable }    from '@angular/core';
import {Http, Headers} from "@angular/http";


@Injectable()
export class ExpressocashService {

  //private link = "https://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/backend-SB-Admin-BS4-Angular-4/index.php";
  private link = "http://localhost/backup-sb-admin/new-backend-esquise/index.php";
  //private link = "http://sentool.bbstvnet.com/sslayer/index.php";

  private headers=new Headers();
  private token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;


  constructor(private http:Http) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  public cashin(transactionID: string, destination: string, amount: string, purposeOfTransfer: string, externaldata1: string, externaldata2: string, clientID: string, clientPassword: string, hashValue: string): Promise<any>  {
    let params="params="+JSON.stringify({token:this.token, transactionID: transactionID, destination: destination, amount: amount, purposeOfTransfer: purposeOfTransfer, externaldata1: externaldata1, externaldata2: externaldata2, clientID: clientID, clientPassword: clientPassword, hashValue: hashValue});
    let link=this.link+"/ec-sen/cashin";
    return this.http.post(link,params,{headers:this.headers}).toPromise().then( res => {return res} ).catch(error => {return 'bad' });
  }

  public cashout(transactionID: string, customer: string, amount: string, purposeOfTransfer: string, externaldata1: string, externaldata2: string, clientID: string, clientPassword: string, hashValue: string): Promise<any>  {
    let params="params="+JSON.stringify({token:this.token, transactionID: transactionID, customer: customer, amount: amount, purposeOfTransfer: purposeOfTransfer, externaldata1: externaldata1, externaldata2: externaldata2, clientID: clientID, clientPassword: clientPassword, hashValue: hashValue});
    let link=this.link+"/ec-sen/cashout";
    return this.http.post(link,params,{headers:this.headers}).toPromise().then( res => {return res} ).catch(error => {return 'bad' });
  }

  public topup(transactionID: string, destination: string, amount: string, purposeOfTransfer: string, externaldata1: string, externaldata2: string, clientID: string, clientPassword: string, hashValue: string): Promise<any>  {
    let params="params="+JSON.stringify({token:this.token, transactionID: transactionID, destination: destination, amount: amount, purposeOfTransfer: purposeOfTransfer, externaldata1: externaldata1, externaldata2: externaldata2, clientID: clientID, clientPassword: clientPassword, hashValue: hashValue});
    let link=this.link+"/ec-sen/topup";
    return this.http.post(link,params,{headers:this.headers}).toPromise().then( res => {return res} ).catch(error => {return 'bad' });
  }

  public checkbalance(clientID: string, clientPassword: string, hashValue: string): Promise<any>  {
    let params="params="+JSON.stringify({token:this.token, clientID: clientID, clientPassword: clientPassword, hashValue: hashValue});
    let link=this.link+"/ec-sen/checkbalance";
    return this.http.post(link,params,{headers:this.headers}).toPromise().then( res => {return res} ).catch(error => {return 'bad' });
  }

}
