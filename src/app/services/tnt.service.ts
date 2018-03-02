
import {Injectable} from '@angular/core';
import {Http,Headers} from "@angular/http";
import 'rxjs/add/operator/map';


export class TntResponse{
  id_abonnement: number ;
  prenom: string ;
  nom: string ;
  tel: string ;
  adresse: string ;
  region: string ;
  city: string ;
  cni: string ;
  n_chip : string ;
  n_carte : string ;
  date_abonnement: string ;
  duree : string ;
  id_typeabonnement : string ;
  montant : number ;
  id_operateur : number;
  etat : number ;
  id_activateur: number ;
  date_activation: string;
  etat_reclamation : string;
  datefinactivation : string ;
}




@Injectable()
export class TntService {

  //private link = "https://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/new-backend-esquise/index.php";
  private link = "https://sentool.bbstvnet.com/sslayer/index.php";


  private headers = new Headers();
  public responseJso : any ;
  public resp : string ;
  public responseJsoFWS : TntResponse[] ;


  constructor(private http:Http) {
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  public listAbonnement(token : string) : Promise<TntResponse[]> {
      let reEspParams = {token:token} ;
      let link=this.link+"/apitnt/listabonnement";
      console.log(link);
      let params="params="+JSON.stringify(reEspParams);
      return new Promise( (resolve, reject) => {
         this.http.post(link,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
            this.responseJsoFWS = JSON.parse(data);
             resolve(this.responseJsoFWS);
         });
      });
  }

  public listeVenteDecods(token : string) : Promise<{}[]> {
      let reEspParams = {token:token} ;
      let link=this.link+"/apitnt/listeventedecodeur";
      console.log(link);
      let params="params="+JSON.stringify(reEspParams);
      return new Promise( (resolve, reject) => {
        this.http.post(link,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
         resolve(JSON.parse(data));
        });
      });
  }

  public listerVenteCartes(token : string) : Promise<{}[]> {
      let reEspParams = {token:token} ;
      let link=this.link+"/apitnt/listeventecarte";
      console.log(link);
      let params="params="+JSON.stringify(reEspParams);
      return new Promise( (resolve, reject) => {
        this.http.post(link,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
          console.log(JSON.parse(data))
          resolve(JSON.parse(data));
        });
      });
  }

  public checkNumber(token : string, chipOrCardNum: string) : Promise<TntResponse> {
    let params="params="+JSON.stringify({token:token,numeroCarteChip:chipOrCardNum});
    let link=this.link+"/apitnt/checkNumber";
    console.log(link);
    return new Promise( (resolve, reject) => {
        this.http.post(link,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
            resolve(JSON.parse(data));
        });
      });
  }

  public abonner(token:string, prenom:string, nom:string, tel:string, cni:string, numerochip:string, numerocarte:string, duree:number, typedebouquet:number) : Promise<any> {
      let montant : number = 0 ;
      if(typedebouquet==1) montant = 5000;
      if(typedebouquet==2) montant = 3000;
      if(typedebouquet==3) montant = 8000;
      montant = duree*montant ;

      let reEspParams = {token:token, prenom:prenom, nom:nom, tel:tel, adresse:'', region:'', city:'', cni:cni, numerochip:numerochip, numerocarte:numerocarte, duree:duree, typedebouquet:typedebouquet, montant:montant} ;
      let link=this.link+"/apitnt/abonner";
      console.log(link);
      let params="params="+JSON.stringify(reEspParams);
      return new Promise( (resolve, reject) => {
        this.http.post(link,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
            resolve(data);
        });
      });
  }

  public vendreDecodeur(token, prenomNewClient, nomNewClient, telNewClient, adresseNewClient, regionNewClient, cniNewClient, nchipNewClient, ncarteNewClient, nbmNewClient, typedebouquet, prix) : Promise<string> {
      let reEspParams = {token:token, prenom:prenomNewClient, nom:nomNewClient, tel:telNewClient, adresse:adresseNewClient, region:regionNewClient, cni:cniNewClient, numerochip:nchipNewClient, numerocarte:ncarteNewClient, typedebouquet:typedebouquet, prix:prix} ;
      let link=this.link+"/apitnt/ventedecodeur";
      console.log(link);
      let params="params="+JSON.stringify(reEspParams);
      return new Promise( (resolve, reject) => {
        this.http.post(link,params,{headers:this.headers}).map(res => res.json()).subscribe(data =>{
               resolve(data);
               console.log(data);
        });
      });
  }

  public vendreCarte(token, prenomNewClient, nomNewClient, telNewClient, adresseNewClient, regionNewClient, cniNewClient, ncarteNewClient, prix) : Promise<string> {
      let reEspParams = {token:token, prenom:prenomNewClient, nom:nomNewClient, tel:telNewClient, adresse:adresseNewClient, region:regionNewClient, cni:cniNewClient, numerocarte:ncarteNewClient, prix:prix} ;
      let params:{}[] = [] ;
      params["params"] = reEspParams ;
      return new Promise( (resolve, reject) => {
        this.http.post('http://127.0.0.1/test/listtnt.php',reEspParams).map(res =>res.json()).subscribe(data =>{
               resolve("ok");
        });
      });
  }

}
