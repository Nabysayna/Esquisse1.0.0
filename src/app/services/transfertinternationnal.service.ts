import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import { Token } from '@angular/compiler';

@Injectable()
export class TransfertinternationnalService {

  private url = "http://localhost/canal_backend/";

  private headers=new Headers();
  private token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;

  constructor(private http:Http) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }
  public verifierCodeRetrait(codeRetrait:any): Promise<any>{
    //let params="requestParam="+JSON.stringify({codeRetrait : codeRetrait,token:this.token});
    let params=JSON.stringify({codeRetrait : codeRetrait,token:this.token});
    let link=this.url+"handleAlert.php";
    console.log(params);
    return this.http.post(link,params,{headers:this.headers}).toPromise().then( res => {console.log(res);return res} ).catch(error => {console.log(error);return 'bad' });
  }
  public validerRetrait(codeagent:any,correspondant,codetransaction,numerotransaction,Pays,typedepiece,numeropiece): Promise<any>{
    let params="requestParam="+JSON.stringify({codeagent : codeagent,correspondant:correspondant,codetransaction:codetransaction,numerotransaction:numerotransaction,Pays:Pays,typedepiece:typedepiece,numeropiece:numeropiece});
    let link=this.url+"handleAlert.php";
    console.log(params);
    return this.http.post(link,params,{headers:this.headers}).toPromise().then( res => {console.log(res);return res} ).catch(error => {console.log(error);return 'bad' });
  }

}
