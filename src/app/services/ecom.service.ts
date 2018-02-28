import {Injectable} from '@angular/core';
import {Http,Headers} from "@angular/http";
import 'rxjs/add/operator/map';

class Article {
  public id:number;
  public nomImg:string;
  public designation:string;
  public description:string;
  public prix:number;
  public stock:number;
}

export class Commande {
  public id:number;
  public orderedArticles:string;
  public montant:number ;
  public tel:number;
  public pointderecuperation : string ;
  public fullName:string;
  public dateCommande:string;
}

export class Vente {
  public id:number;
  public quantite:number;
  public designation:string;
  public prixUnitaire:number ;
  public tel:number;
  public fullName:string;
  public dateVente:string;
}

export class Coursier{
  public id:number;
  public prenom:string;
  public nom:string;
}


@Injectable()
export class EcomService {

  //private link = "https://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://abonnement.bbstvnet.com/crmbbs/backend-SB-Admin-BS4-Angular-4/index.php";
  //private link = "http://localhost/backup-sb-admin/backend-SB-Admin-BS4-Angular-4/index.php";
  private link = "http://localhost/backup-sb-admin/new-backend-esquise/index.php";
  //private link = "http://sentool.bbstvnet.com/sslayer/index.php";


  private headers = new Headers();
  public responseJsoFWS :  Article[];



  constructor(private http:Http) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  public listeArticles(token : string, type:string) : Promise<Article[]> {
    let reEspParams = {token:token, type:type} ;
    let url=this.link+"/ecom-sen/listerarticle";
    console.log(url);
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
        console.log("*******Promise listeArticles*****");
        this.responseJsoFWS = JSON.parse(data);
        resolve(this.responseJsoFWS);
      });
    });
  }

  public ajouterArticle(requestedValue:{}) : Promise<string> {
    let reEspParams = requestedValue;
    let url=this.link+"/ecom-sen/ajoutarticle";
    console.log(url);
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
        resolve(data.toString());
      });
    });
  }

  public commander(requestedValue:{}) : Promise<string> {
    let reEspParams = requestedValue;
    let url=this.link+"/ecom-sen/ajoutcommande";
    console.log(url);
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
        resolve(data.toString());
      });
    });
  }

  public receptionnerCommandes(requestParams:{}) : Promise<string> {
    let reEspParams = requestParams;
    let url=this.link+"/ecom-sen/receptionnerCommandes";
    console.log(url);
    console.log("*******receptionnerCommandes*****");
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
        resolve(data.toString());
      });
    });
  }

  public supprimerArticle(requestParams:{}) : Promise<string> {
    let reEspParams = requestParams;
    let url=this.link+"/ecom-sen/supprimerArticle";
    console.log(url);
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
        resolve(data.toString());
      });
    });
  }

  public modifierArticle(requestParams:{}) : Promise<string> {
    let reEspParams = requestParams;
    let url=this.link+"/ecom-sen/modifierArticle";
    console.log(url);
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
        resolve(data.toString());
      });
    });
  }

  public assignerCourse(requestedValue:{}) : Promise<string> {
    let reEspParams = requestedValue;
    let url=this.link+"/ecom-sen/assignerCourse";
    console.log(url);
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
        resolve(data.toString());
      });
    });
  }

  public prendreCommande(requestParams:{}) : Promise<string> {
    let reEspParams = requestParams;
    let url=this.link+"/ecom-sen/prendreCommande";
    console.log(url);
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
        resolve(data.toString());
      });
    });
  }

  public fournirCommandes(requestParams:{}) : Promise<string> {
    let reEspParams = requestParams;
    let url=this.link+"/ecom-sen/fournirCommandes";
    console.log(url);
    console.log("*******fournirCommandes*****");
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
        resolve(data.toString());
      });
    });
  }

  public listerCategorie(token : string) : Promise<string[]> {
    let reEspParams = {token:token};
    let url=this.link+"/ecom-sen/listerCategorie";
    console.log(url);
    console.log("*******listerCategorie*****");
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
        resolve(data);
      });
    });
  }

  public listerCommandes(token : string, typeListe : string) : Promise<any> {
    let reEspParams = { token:token, typeListe:typeListe };
    let url=this.link+"/ecom-sen/listercommande";
    console.log(url);
    console.log("*******listerCommandes*****");
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
        resolve(data);
      });
    });
  }

  public listerCoursier(token : string) : Promise<Coursier[]> {
    let reEspParams = {token:token};
    let url=this.link+"/ecom-sen/listerCoursier";
    console.log(url);
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
        resolve(data);
      });
    });
  }

  public listerVentes(token : string) : Promise<any[]> {
    let reEspParams = {token:token};
    let url=this.link+"/ecom-sen/listervente";
    console.log(url);
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(url,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
        resolve(data);
      });
    });
  }

}
