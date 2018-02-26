import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class PostCashService {


  private lien="http://127.0.0.1/backendProductiveEsquisse/index.php";
  private headers=new Headers();
  private token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  public datas:any;


  constructor(private http:Http) {
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
   }

  public rechargementespece(tel_destinataire : string, montant : string): Promise<any>  {
    var reEspParams = {token:this.token, tel_destinataire: tel_destinataire, montant: montant} ;
    let params="params="+JSON.stringify(reEspParams);
    let link=this.lien+"/postcash/rechargementespece";
    return new Promise( (resolve, reject) => {
       this.http.post(link,params,{headers:this.headers}).subscribe(data =>{
           resolve(data);
       });
    });
  }

  public achatcodewoyofal(montant : string, compteur : string):Promise<any>{
    var reEspParams = {token:this.token, montant: montant, compteur: compteur} ;
    let params="params="+JSON.stringify(reEspParams);
    let link=this.lien+"/postcash/achatcodewoyofal";
    return new Promise( (resolve, reject) => {
        this.http.post(link,params,{headers:this.headers}).map(res=>res.json()).subscribe(data=>{
             resolve(data);
          }
        );
    });

  }

  public reglementsenelec(police : string, num_facture : string, montant : any): Promise<any>  {
    var reEspParams = {token:this.token, police: police, num_facture: num_facture,  montant : montant} ;
    let link=this.lien+"/postcash/reglementsenelec";
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
            resolve(data);
      });
    });
  }

  public detailfacturesenelec(police : string, num_facture : string): Promise<any>  {
    var reEspParams = {token:this.token, police: police, num_facture: num_facture} ;
    let link=this.lien+"/postcash/detailfacturesenelec";
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).map(res=>res.json()).subscribe(data =>{
             resolve(data);
             console.log(data);
      });
    });
  }

  public achatjula(mt_carte : string, nb_carte : string): Promise<any>  {
    var reEspParams = {token:this.token, mt_carte: mt_carte, nb_carte: nb_carte} ;
    let link=this.lien+"/postcash/achatjula";
    let params="params="+JSON.stringify(reEspParams);
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
             resolve(data);

      })
    });
  }

  public payeroolusolar(tel_destinataire : string, numcompte : string, montant : string): Promise<any>  {
    var reEspParams = {token:this.token, tel: tel_destinataire, numcompte: numcompte, mtt: montant} ;
     let params="params="+JSON.stringify(reEspParams);
     let link=this.lien+"/postcash/oolusolar";
    return new Promise( (resolve, reject) => {
      this.http.post(link,params,{headers:this.headers}).map(res =>res.json()).subscribe(data =>{
             resolve(data);
             console.log(data);
      });
    });
  }

}
