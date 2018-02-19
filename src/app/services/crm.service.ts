import { Injectable }    from '@angular/core';
import {Http, Headers} from "@angular/http";

@Injectable()
export class CrmService {

  //private link = "http://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/backend-SB-Admin-BS4-Angular-4/index.php";
  private link = "http://localhost/backup-sb-admin/new-backend-esquise/index.php";


  private headers = new Headers();
  private basetoken:any;

  constructor(private _http: Http){
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.basetoken = JSON.parse(sessionStorage.getItem('currentUser')).baseToken;
  }

  validerDemandeDepot(data:any){
    console.log({token:this.basetoken, montant: data.montant, infocc: data.infocc, infocom: data.infocom});
    console.log("------------------------");
    let url = this.link+"/crm-sen/validerDemandeDepot";
    let datas = JSON.stringify({token:this.basetoken, montant: data.montant, infocc: data.infocc, infocom: data.infocom});
    let params = 'params='+datas;
    return this._http.post(url, params, {headers:this.headers})
      .map(res => res.json());
  }


  /*



   public validerDemandeDepot(montant: number, infocc: string, infocom: string): Promise<any>  {
   var method:string = 'validerDemandeDepot';
   var parameters:{}[] = [];

   var reEspParams = {token: this.token, montant: montant, infocc: infocc, infocom: infocom};
   var params:{}[] = [] ;
   params["params"] = reEspParams ;

   parameters['validerDemandeDepot xmlns="urn:bountoucrmwsdl#"'] = params;

   return new Promise( (resolve, reject) => {
   this.soapService.post(method, parameters, 'validerDemandeDepotResponse').then(response=>{
   var reponse = JSON.parse(response['validerDemandeDepotResponse'].return.$);
   resolve(reponse) ;
   });
   });

   }

   public getEtatDemandeDepot(infosup: string): Promise<any>  {
   var method:string = 'getEtatDemandeDepot';
   var parameters:{}[] = [];

   var reEspParams = {token: this.token, infosup: infosup};
   var params:{}[] = [] ;
   params["params"] = reEspParams ;

   parameters['getEtatDemandeDepot xmlns="urn:bountoucrmwsdl#"'] = params;

   return new Promise( (resolve, reject) => {
   this.soapService.post(method, parameters, 'getEtatDemandeDepotResponse').then(response=>{
   var reponse = JSON.parse(response['getEtatDemandeDepotResponse'].return.$);
   resolve(reponse) ;
   });
   });

   }


   public portefeuille(token:string) : Promise<Portefeuille[]> {

   var method:string = 'portefeuille';
   var parameters:{}[] = [];
   var reEspParams = {token:token} ;

   parameters['portefeuille xmlns="urn:crmwsdl#"'] = reEspParams;



   return new Promise( (resolve, reject) => {
   this.soapService.post(method, parameters, 'portefeuilleResponse').then(response=>{
   var reponse:Portefeuille[] = JSON.parse(response['portefeuilleResponse'].return.$);
   resolve(reponse) ;
   });
   });
   }

   public relance(token:string) : Promise<Relance[]> {

   var method:string = 'relance';
   var parameters:{}[] = [];
   var reEspParams = {token:token} ;

   parameters['relance xmlns="urn:crmwsdl#"'] = reEspParams;

   return new Promise( (resolve, reject) => {
   this.soapService.post(method, parameters, 'relanceResponse').then(response=>{
   var reponse:any[] = JSON.parse(response['relanceResponse'].return.$);
   resolve(reponse) ;
   });
   });
   }

   public promotion(token:string) : Promise<Promotion[]> {

   var method:string = 'promotion';
   var parameters:{}[] = [];
   var reEspParams = {token:token} ;

   parameters['promotion xmlns="urn:crmwsdl#"'] = reEspParams;

   return new Promise( (resolve, reject) => {
   this.soapService.post(method, parameters, 'promotionResponse').then(response=>{
   var reponse:Promotion[] = JSON.parse(response['promotionResponse'].return.$);
   resolve(reponse) ;
   });
   });
   }

   public sendSms(token, destinataire, message) : Promise<string> {

   var method:string = 'sendSms';
   var parameters:{}[] = [];
   var param:{}[] = [];
   var paramObject = {token:token, destinataires:destinataire, messageContain:message} ;
   param["params"] = paramObject ;
   parameters['sendSms xmlns="urn:crmwsdl#"'] = param;

   return new Promise( (resolve, reject) => {
   this.soapService.post(method, parameters, 'sendSmsResponse').then(response=>{
   resolve(response['sendSmsResponse'].return.$) ;
   });
   });
   }

   public prospection(token:string) : Promise<Prospection[]> {

   var method:string = 'prospection';
   var parameters:{}[] = [];
   var reEspParams = {token:token} ;

   parameters['prospection xmlns="urn:crmwsdl#"'] = reEspParams;



   return new Promise( (resolve, reject) => {
   this.soapService.post(method, parameters, 'prospectionResponse').then(response=>{
   var reponse:Prospection[] = JSON.parse(response['prospectionResponse'].return.$);
   console.log("ddd "+response['prospectionResponse'].return.$);
   resolve(reponse) ;
   });
   });
   }

   public suivicommande(token:string) : Promise<Suivicommande[]> {

   var method:string = 'suivicommande';
   var parameters:{}[] = [];
   var reEspParams = {token:token} ;

   parameters['suivicommande xmlns="urn:crmwsdl#"'] = reEspParams;

   return new Promise( (resolve, reject) => {
   this.soapService.post(method, parameters, 'suivicommandeResponse').then(response=>{
   var reponse:Suivicommande[] = JSON.parse(response['suivicommandeResponse'].return.$);
   resolve(reponse) ;
   });
   });
   }


   public servicepoint(token:string) : Promise<Servicepoint[]> {

   var method:string = 'servicepoint';
   var parameters:{}[] = [];
   var reEspParams = {token:token} ;

   parameters['servicepoint xmlns="urn:servicepointwsdl#"'] = reEspParams;



   return new Promise( (resolve, reject) => {
   this.soapService.post(method, parameters, 'servicepointResponse').then(response=>{
   var reponse:Servicepoint[] = JSON.parse(response['servicepointResponse'].return.$);
   resolve(reponse) ;
   });
   });
   }



   export class Portefeuille{
   nom:string;
   prenom:string;
   telephone:string;
   nombre_operation:number;
   fidelite:number;
   date_ajout:any;
   }

   export class Relance{
   iduser : number ;
   prenom:string ;
   nom:string ;
   telephone:string ;
   infosoperation:string;
   echeance:any;
   }


   export class Promotion{
   nom:string;
   prenom:string;
   telephone:string;
   nombre_operation:number;
   fidelite:number;
   date_ajout:any;
   }

   export class Prospection{
   nom:string;
   prenom:string;
   telephone:string;
   }

   export class Suivicommande{
   nomclient:string;
   prenomclient:string;
   montantcommande:number;
   pointderecuperation:string;
   etat:string;
   }



   export class Servicepoint{
   nom:string;
   designations:string;
   }


   */
}
