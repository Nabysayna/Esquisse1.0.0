import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class WizallService {

  //private link = "https://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/new-backend-esquise/index.php";
  private link = "https://sentool.bbstvnet.com/sslayer/index.php";

  private headers=new Headers();
  private token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  public datas:any;


  constructor(private http:Http) {
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
   }

  public intouchCashin(frommsisdn : string, tomsisdn : string, amount : number): Promise<any>  {
    let reEspParams = {token:this.token, frommsisdn: "", tomsisdn: tomsisdn, amount: amount} ;
    let params="params="+JSON.stringify(reEspParams);
    let link=this.link+"/wizall-sen/intouchCashin";
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).subscribe(data =>{
        resolve(data);
      });
    });
  }

  public intouchCashout(agentmsisdn : string, usermsisdn : string, amount : number): Promise<any>  {
    let reEspParams = {token:this.token, agentmsisdn: agentmsisdn, usermsisdn: usermsisdn, amount: amount} ;
    let params="params="+JSON.stringify(reEspParams);
    let link=this.link+"/wizall-sen/intouchCashout";
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).subscribe(data =>{
        resolve(data);
      });
    });
  }

  public intouchPayerFactureSde(montant : number, reference_client : number, reference_facture : number): Promise<any>  {
    let reEspParams = {token:this.token, montant: montant, reference_client: reference_client, reference_facture: reference_facture} ;
    let params="params="+JSON.stringify(reEspParams);
    let link=this.link+"/wizall-sen/intouchPayerFactureSde";
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).subscribe(data =>{
        resolve(data);
      });
    });
  }

  public intouchRecupereFactureSde(reference_client : number): Promise<any>  {
    let reEspParams = {token:this.token, reference_client: reference_client} ;
    let params="params="+JSON.stringify(reEspParams);
    let link=this.link+"/wizall-sen/intouchRecupereFactureSde";
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).subscribe(data =>{
        resolve(data);
      });
    });
  }

  public intouchPayerFactureSenelec(montant : number, police : string, numfacture : string): Promise<any>  {
    let reEspParams = {token:this.token, montant: montant, police: police, numfacture: numfacture} ;
    let params="params="+JSON.stringify(reEspParams);
    let link=this.link+"/wizall-sen/intouchPayerFactureSenelec";
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).subscribe(data =>{
        resolve(data);
      });
    });
  }

  public intouchRecupereFactureSenelec(police : string): Promise<any>  {
    let reEspParams = {token:this.token, police: police} ;
    let params="params="+JSON.stringify(reEspParams);
    let link=this.link+"/wizall-sen/intouchRecupereFactureSenelec";
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).subscribe(data =>{
        resolve(data);
      });
    });
  }
  
  public verifier_code_retraitbon():Promise<any>{
    return new Promise((resolve,reject) =>{
       let data={"status": "valid", "customer": {"phone_number": "778150416", "first_name": "Yapele Sosthene", "last_name": "KA Assane"}, "business_type": 0, "value": "100.000000", "model_voucher": {"is_cash": true, "product": "Bon Cash", "sub_product": "NA", "step_value": "1.000", "is_generic": true, "id": 3333, "is_secured": true, "minimum_value": "2000.000", "name": "Bon Cash ", "maximum_value": "3000.000", "network": "Transfert XOF", "currency_code": 952}, "recipient": {"phone_number": "775054827", "is_valid": false, "first_name": "KA Assane", "last_name": "KA Assane", "needed_kyc_infos": ["identityIsNeeded"]}, "id": 135137};
       resolve(data);
       /*this.http.post(link,params,{headers:this.headers}).subscribe(data =>{
          resolve(data);
       });*/
    });
   }
  public validerenvoibon():Promise<any>{
    return new Promise((resolve,reject) =>{
      // let data=JSON.stringify({errorCod:0,message:'operation reussie'});
       let data={errorCod:0,message:'operation reussie'};
       resolve(data);
       /*this.http.post(link,params,{headers:this.headers}).subscribe(data =>{
          resolve(data);
       });*/
    });
    
  }


}
