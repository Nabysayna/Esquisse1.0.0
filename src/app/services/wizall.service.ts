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
    let params="params="+JSON.stringify(reEspParams);
    let link=this.link+"/wizall-sen/intouchCashin";
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).subscribe(data =>{
        console.log(data) ;
        resolve(JSON.parse(data.json()));
      });
    });
  }

  public intouchCashout(usermsisdn : string, amount : number): Promise<any>  {
    let reEspParams = {token:this.token, customer: usermsisdn, amount: amount} ;
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
  
  public verifier_code_retraitbon(codebon:any):Promise<any>{
    let link=this.link+"/wizall-sen/verifiercodebonachat";
    let params="params="+JSON.stringify({codebon:codebon,token:this.token});
    return new Promise((resolve,reject) =>{
      // let data={"status": "valid", "customer": {"phone_number": "778150416", "first_name": "Yapele Sosthene", "last_name": "KA Assane"}, "business_type": 0, "value": "100.000000", "model_voucher": {"is_cash": true, "product": "Bon Cash", "sub_product": "NA", "step_value": "1.000", "is_generic": true, "id": 3333, "is_secured": true, "minimum_value": "2000.000", "name": "Bon Cash ", "maximum_value": "3000.000", "network": "Transfert XOF", "currency_code": 952}, "recipient": {"phone_number": "775054827", "is_valid": false, "first_name": "KA Assane", "last_name": "KA Assane", "needed_kyc_infos": ["identityIsNeeded"]}, "id": 135137};
       //resolve(data);
       this.http.post(link,params,{headers:this.headers}).subscribe(data =>{
          //console.log(data.json());
          resolve(data.json());
       });
    });
   }
  public validerenvoibon():Promise<any>{
    return new Promise((resolve,reject) =>{
        let params="";
      // let data=JSON.stringify({errorCod:0,message:'operation reussie'});
       let data={errorCod:0,message:'operation reussie'};
       resolve(data);
       /*this.http.post(link,params,{headers:this.headers}).subscribe(data =>{
          resolve(data);
       });*/
    });
    
  }
  
  public getSendSecureID(codebon:any):Promise<string>{
    let link=this.link+"/wizall-sen/getSendSecureID";
    let params="params="+JSON.stringify({codebon:codebon,token:this.token});
    return new Promise((resolve,reject)=>{
      this.http.post(link,params,{headers:this.headers}).subscribe(data =>{
         console.log(data);
         resolve(data.json());
      });
    });
    
  }
  
  public bonDebitVoucher(data:any):Promise<any>{
    let link=this.link+"/wizall-sen/bonDebitVoucher";
    let params="params="+JSON.stringify({token:this.token,nationalite:data.nationalite,num_card:data.num_card,type_carte:data.type_carte,secure_id:data.codebon,code_validation:data.code_validation, montant:data.montant});
    return new Promise((resolve,reject) =>{
       this.http.post(link,params,{headers:this.headers}).map(res => res.json()).subscribe(data =>{
          // console.log(data);
           resolve(data);
       });
    });
  }

  
  public validationretraitbon(){
      return new Promise((resolve,reject) =>{
      // let data=JSON.stringify({errorCod:0,message:'operation reussie'});
       let link=this.link+"/wizall-sen/validerbonachat";
       let params="params=";
       let data={errorCod:0,message:'operation reussie'};
       resolve(data);
       this.http.post(link,params,{headers:this.headers}).subscribe(response =>{
          console.log(response);
          resolve(data);
       });
    });
  
  }
 // $params=array("token"=> $params->token,"model_voucher_id" =>"0","requested_value" =>"7000","customer_phone_number" => $params->telE,"customer_first_name"=> $params->prenomE,"customer_nationality"=>$params->nationalite,"customer_identity_type"=>$params->type_piece,"customer_identity_number"=>$params->num_card,"recipient_phone_number"=>$params->telB,"recipient_first_name" => $params->prenomB,"recipient_last_name" => $params->nomB);
  public validerenvoiboncash(data:any):Promise<any>{
      let link=this.link+"/wizall-sen/validerenvoiboncash";
       let params="params="+JSON.stringify({token:this.token,model_voucher:"0",requested_value:data.data.montant,customer_phone_number:data.data.telE,customer_first_name:data.data.prenomE,customer_last_name:data.data.nomE,customer_nationality:data.data.nationalite,customer_identity_type:data.data.type_piece,customer_identity_number:data.data.num_card,recipient_phone_number:data.data.telB,recipient_first_name:data.data.prenomB,recipient_last_name:data.data.nomB});
      return new Promise((resolve,reject) =>{
       console.log(data);
       this.http.post(link,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
          console.log(data);
          resolve(data);
       });
    });  
  }
  public validerbonachat(data:any){
       let link=this.link+"/wizall-sen/validerenvoibonachat";
       let params="params="+JSON.stringify({token:this.token,data:data});
       return new Promise((resolve,reject) =>{
		 //  let data=JSON.stringify({errorCod:0,message:'operation reussie'});
		   //let data={errorCod:0,message:'operation reussie'};
		   this.http.post(link,params,{headers:this.headers}).subscribe(data =>{
			  resolve(data);
		 });
    });  
  }


}
