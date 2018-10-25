import {Injectable} from '@angular/core';
import {Http,Headers} from "@angular/http";
import 'rxjs/add/operator/map';



@Injectable()
export class FacturierService {

  //private link = "https://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/new-backend-esquise/index.php";
//  private link = "https://sentool.bbstvnet.com/sslayer/index.php";

  private link = "http://127.0.0.1/backendProductiveEsquisse/index.php";


  private headers = new Headers();
  private token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;



  constructor(private http:Http) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    console.log(this.token);
    }
/*
  public paimentsde(montant : number, reference_client : string,reference_facture :string ,service :string) : Promise<any> {
    let reEspParams = {token:this.token, reference_client:reference_client,reference_facture:reference_facture, service:service, montant : montant} ;
    let url=this.link+"/facturier-sen/reglementsde";
    let params="params="+JSON.stringify(reEspParams);
    console.log(this.token);
    return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res => res.json()).catch(res => "-12").subscribe(
        data =>{
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
 */
  public detailreglementsde(reference_client:string,numeroTelephone:string,numeroFacture:String):Promise<any>{
    //let reEspParams={tokenParam:this.token,reference_client:reference_client,numeroTelephone:numeroTelephone,numeroFacture:numeroFacture};
    let requete="9/"+reference_client+"/"+numeroTelephone+"/"+numeroFacture;
    let reEspParams={tokenParam:this.token,requestParam:requete};
    //let url=this.link+"/facturier-sen/detailreglementsde";
    let url=this.link+"/zuulu/zuulu";
    let params="requestParam="+JSON.stringify(reEspParams);
    /*return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res => res.json()).catch(res => "-12").subscribe(
        data =>{
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
    });*/
    return new Promise((resolve,reject)=>{
		this.http.post(url,params,{headers:this.headers}).subscribe(response =>{
		   console.log(response);
		   resolve(response);
		});
    });
  }
  public paimentsde(reference:string,telephone:string,numeroFacture,montant:string):Promise<any>{
      let requete="10/"+montant+"/"+reference+"/"+numeroFacture+"/"+telephone;
      let url=this.link+"/zuulu/zuulu";
      let params="requestParam="+JSON.stringify({tokenParam:this.token,requestParam:requete});
      return new Promise((resolve,reject) =>{
          console.log(params);
          this.http.post(url,params,{headers:this.headers}).subscribe(rep =>{
			console.log(rep);
			resolve(rep);
		  });
      });
	
  }
  public getReponse(file:string){
	let params="param="+JSON.stringify({file:file,token:this.token});
	let url=this.link+"/zuulu/getReponse";
	return new Promise((resolve,reject)=>{
		this.http.post(url,params,{headers:this.headers}).subscribe(reponse =>{
			console.log(reponse);
			resolve(reponse);
		});
		
	});
	
  }
  public annulation(file:string){
    let params="param="+JSON.stringify({file:file,token:this.token});
    let url=this.link+"/zuulu/annulation";
    return new Promise((resolve,reject)=>{
      this.http.post(url,params,{headers:this.headers}).subscribe(reponse =>{
        console.log(reponse);
        resolve(reponse);
      });
      
    });

  }

  public validerrapido(telephone:string,montant:string,badge:string):Promise<any>{
    let reEspParams={token:this.token,telephone:telephone,montant:montant,badge:badge};
    let url=this.link+"/facturier-sen/achatrapido";
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res => res.json()).catch(res => "-12").subscribe(
        data =>{
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

  public validerwoyofal(montant:string,compteur:string):Promise<any>{
    let reEspParams={token:this.token,montant:montant,compteur:compteur};
    let url=this.link+"/facturier-sen/achatcodewoyofal";
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res => res.json()).catch(res => "-12").subscribe(
        data =>{
          console.log("**WOYOFAL**")
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

 /* public detailfacturesenelec(police:string,numfacture:string):Promise<any>{
    let reEspParams={token:this.token,police:police,num_facture:numfacture};
    let url=this.link+"/facturier-sen/detailreglementsenelec";
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res => res.json()).catch(res => "-12").subscribe(
        data =>{
          console.log(data)
          if(typeof data === 'boolean') reject(JSON.parse("-11"))
          else if((typeof data === 'string') && data.match("{") && data.match("}")) resolve(JSON.parse(data))
          else if((typeof data === 'object') ) resolve(data)
          else reject(JSON.parse("-12"))
        },
        error => reject(JSON.parse("-11")),
        () => {
          console.log("Finish");
        }
      );
    });
  }*/
  public detailfacturesenelec(police:string,numfacture:string,telephone:string):Promise<any>{
    let url=this.link+"/zuulu/zuulu";
    let requete="11/"+police+"/"+numfacture+"/"+telephone;
    let params="requestParam="+JSON.stringify({tokenParam:this.token,requestParam:requete});
	return new Promise((resolve,reject) =>{
	    console.log("something");
	    this.http.post(url,params,{headers:this.headers}).subscribe(reponse => {
	       console.log(reponse);
		   resolve(reponse);
	    });
	});
  }

 /* public validerpaimentsenelec(montant:number,police:string,num_facture:string,service:string):Promise<any>{
    let reEspParams={token:this.token,montant:montant,police:police,num_facture:num_facture,service:service};
    let url=this.link+"/facturier-sen/reglementsenelec";
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res => res.json()).catch(res => "-12").subscribe(
        data =>{
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
  }*/
  public validerpaimentsenelec(police:string,num_facture:string,montant:string,telephone:string):Promise<any>{
    let requete="12/"+montant+"/"+police+"/"+num_facture+"/"+telephone;
    let url=this.link+"/zuulu/zuulu";
    let Params="requestParam="+JSON.stringify({tokenParam:this.token,requestParam:requete});
    return new Promise((resolve,reject)=>{
      this.http.post(url,Params,{headers:this.headers}).subscribe(reponse =>{
        console.log(reponse);
        resolve(reponse);
      });
	   
		
	});
	
  }

  public payeroolusolar(tel:string,numcompte:string,mtt:string):Promise<string>{
    let reEspParams={token:this.token,tel:tel,numcompte:numcompte,mtt:mtt};
    let url=this.link+"/facturier-sen/paiementoolusolar";
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
        resolve(data);
      });
    });
  }

}
