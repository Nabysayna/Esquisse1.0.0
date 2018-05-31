import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class WizallService {

  //private link = "https://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/new-backend-esquise/index.php";

//  private link = "https://sentool.bbstvnet.com/sslayer/index.php";
//  private link = "http://127.0.0.1/kheuteuteupeuseu/index.php";

  private link = "https://mysentool.pro/index.php";

  private headers=new Headers();
  private token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  public datas:any;


  constructor(private http:Http) {
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
   }

  public intouchCashin(frommsisdn : string, tomsisdn : string, amount : number): Promise<any>  {
    let reEspParams = {token:this.token, receiver_phone_number: tomsisdn, amount: amount} ;
    console.log(reEspParams)
    let params="params="+JSON.stringify(reEspParams);
    let link=this.link+"/wizall-sen/intouchCashin";
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).map(res => res.json()).catch(res => "-12").subscribe(
        data =>{
          console.log("Service Cashin")
          console.log(data)
          if(typeof data === 'boolean') reject(JSON.parse("-11"))
          else if((typeof data === 'string') && data.match("{") && data.match("}")) resolve(JSON.parse(data))
          else if((typeof data === 'object') ) resolve(data)
          else reject(JSON.parse("-12"))
        },
        error => reject(JSON.parse("-11")),
        () => {
          console.log("Finish")
        }
      );
    });
  }

  public intouchCashout(usermsisdn : string, amount : number): Promise<any>  {
    let reEspParams = {token:this.token, customer: usermsisdn, amount: amount} ;
    let params="params="+JSON.stringify(reEspParams);
    let link=this.link+"/wizall-sen/intouchCashout";
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).map(res => res.json()).catch(res => "-12").subscribe(
        data =>{
          console.log("Service Cashout")
          console.log(data)
          if(typeof data === 'boolean') reject(JSON.parse("-11"))
          else if((typeof data === 'string') && data.match("{") && data.match("}")) resolve(JSON.parse(data))
          else if((typeof data === 'object') ) resolve(data)
          else reject(JSON.parse("-12"))
        },
        error => reject(JSON.parse("-11")),
        () => {
          console.log("Finish")
        }
      );
    });
  }

  public verifier_code_retraitbon(codebon:any):Promise<any>{
    let link=this.link+"/wizall-sen/verifiercodebonachat";
    let params="params="+JSON.stringify({codebon:codebon,token:this.token});
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).map(res => res.json()).catch(res => "-12").subscribe(
        data =>{
          console.log("Service verifier_code_retraitbon")
          console.log(data)
          if(typeof data === 'boolean') reject(JSON.parse("-11"))
          else if((typeof data === 'string') && data.match("{") && data.match("}")) resolve(JSON.parse(data))
          else if((typeof data === 'object') ) resolve(data)
          else reject(JSON.parse("-12"))
        },
        error => reject(JSON.parse("-11")),
        () => {
          console.log("Finish")
        }
      );
    });
  }

  public getSendSecureID(codebon:any):Promise<string>{
    let link=this.link+"/wizall-sen/getSendSecureID";
    let params="params="+JSON.stringify({codebon:codebon,token:this.token});
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).map(res => res.json()).catch(res => "-12").subscribe(
        data =>{
          console.log("Service getSendSecureID")
          console.log(data)
          if(typeof data === 'boolean') reject(JSON.parse("-11"))
          else if((typeof data === 'string') && data.match("{") && data.match("}")) resolve(JSON.parse(data))
          else if((typeof data === 'object') ) resolve(data)
          else reject(JSON.parse("-12"))
        },
        error => reject(JSON.parse("-11")),
        () => {
          console.log("Finish")
        }
      );
    });
  }

  public bonDebitVoucher(data:any):Promise<any>{
    let link=this.link+"/wizall-sen/bonDebitVoucher";
    let params="params="+JSON.stringify({token:this.token,nationalite:data.nationalite,num_card:data.num_card,type_carte:data.type_carte,secure_id:data.codebon,code_validation:data.code_validation, montant:data.montant});
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).map(res => res.json()).catch(res => "-12").subscribe(
        data =>{
          console.log("Service bonDebitVoucher")
          console.log(data)
          if(typeof data === 'boolean') reject(JSON.parse("-11"))
          else if((typeof data === 'string') && data.match("{") && data.match("}")) resolve(JSON.parse(data))
          else if((typeof data === 'object') ) resolve(data)
          else reject(JSON.parse("-12"))
        },
        error => reject(JSON.parse("-11")),
        () => {
          console.log("Finish")
        }
      );
    });
  }

  public validerenvoiboncash(data:any):Promise<any>{
    let link=this.link+"/wizall-sen/validerenvoiboncash";
    let params="params="+JSON.stringify({token:this.token,model_voucher:"0",requested_value:data.data.montant,customer_phone_number:data.data.telE,customer_first_name:data.data.prenomE,customer_last_name:data.data.nomE,customer_nationality:data.data.nationalite,customer_identity_type:data.data.type_piece,customer_identity_number:data.data.num_card,recipient_phone_number:data.data.telB,recipient_first_name:data.data.prenomB,recipient_last_name:data.data.nomB});
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).map(res => res.json()).catch(res => "-12").subscribe(
        data =>{
          console.log("Service validerenvoiboncash")
          console.log(data)
          if(typeof data === 'boolean') reject(JSON.parse("-11"))
          else if((typeof data === 'string') && data.match("{") && data.match("}")) resolve(JSON.parse(data))
          else if((typeof data === 'object') ) resolve(data)
          else reject(JSON.parse("-12"))
        },
        error => reject(JSON.parse("-11")),
        () => {
          console.log("Finish")
        }
      );
    });
  }

  public validerbonachat(data:any):Promise<any>{
    let link=this.link+"/wizall-sen/validerenvoibonachat";
    let params="params="+JSON.stringify({token:this.token,data:data});
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).map(res => res.json()).catch(res => "-12").subscribe(
        data =>{
          console.log("Service validerbonachat")
          console.log(data)
          if(typeof data === 'boolean') reject(JSON.parse("-11"))
          else if((typeof data === 'string') && data.match("{") && data.match("}")) resolve(JSON.parse(data))
          else if((typeof data === 'object') ) resolve(data)
          else reject(JSON.parse("-12"))
        },
        error => reject(JSON.parse("-11")),
        () => {
          console.log("Finish")
        }
      );
    });
  }



}
