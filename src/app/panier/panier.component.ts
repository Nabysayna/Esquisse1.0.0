import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { EcomService} from '../services/ecom.service';


class Article {
  public id:number;
  public nomImg:string;
  public designation:string;
  public description:string;
  public prix:number;
  public quantite:number;
}

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],

})
export class panierComponent implements OnInit {
  articles:any=[];
  panier:any=[];
  process=[];
  commandevalidee:boolean=false;
  token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  
   quinzeMinutes = 900000; 
//  quinzeMinutes = 15000;	

  registredAPIs : string [] = ['POSTECASH', 'ORANGEMONEY', 'TIGOCASH', 'TNT BY EXCAF'] ;
  load="loader";
  dataImpression:any;
  clients=[{'prenom':'magor','nom':'sy','telephone':779013878,'adress':'Mbour'}];
  prenom:string="";
  nom:string="";
  adress:string="";
  telephone:number=undefined;
  estclient:boolean=false;
  constructor(private router: Router,private ecomCaller:EcomService) {}


/******************************************************************************************************/


  ngOnInit() {
       if(sessionStorage.getItem('panier')!=undefined){
           this.articles=JSON.parse(sessionStorage.getItem('panier'));
           console.log(this.articles);
        }
  }


  @ViewChild('modalcommande') public modalcommande:ModalDirective;
  annulerOperation(){
    console.log("Opèration annulée ...") ;
  }
  color(i:number):string{
     if(i%2==0){
       return "border-left:2px solid green";
     }
     else{
       return "border-left:2px solid blue";
     }
  }
  getFormatted( designation) : string {
    if(designation.length>16)
      return designation.substring(0, 13)+'...' ;

    return designation ;
  }
  currency(prix:number){
   return Number(prix).toLocaleString();
  }
  totalpanier(){
    let total=0;
    for(let i=0;i<this.articles.length;i++){
       total+=this.articles[i].data.prix*this.articles[i].data.quantite;
    }
    return total;
  }
  showmodalcommande(){
    this.prenom="";
    this.nom="";
    this.adress="";
    this.telephone=undefined;
    this.estclient=false;
    this.modalcommande.show();
  }
  hidemodalcommande(){
     this.prenom="";
     this.nom="";
     this.adress="";
     this.telephone=undefined;
     this.estclient=false;
     this.modalcommande.hide();
  }
  chercherclient(tel:number){

      for(let i=0;i<this.clients.length;i++){
         if(this.clients[i].telephone==tel){
            this.prenom=this.clients[i].prenom;
            this.nom=this.clients[i].nom;
            this.adress=this.clients[i].adress;
            this.telephone=this.clients[i].telephone;
         }
      }
      this.estclient=true;
  }
 //getTelephone() methode de la class users backend 
  validercommande(){
     let total=this.totalpanier();
    // console.log(this.articles);
     for(let i=0;i<this.articles.length;i++){
     let ad=JSON.parse(this.articles[i].data.infosup);
     console.log(ad);
       let data={
			idarticle:2,
			qte:this.articles[i].data.quantite,
			prix:this.articles[i].data.prix,
			montant:this.articles[i].data.prix*this.articles[i].data.montant,
			designation:this.articles[i].data.designation,
			description:this.articles[i].data.description,
			nomLink: this.articles[i].data.nomImg,
			pourvoyeur:this.articles[i].data.pourvoyeur,
			supplied:0,
			address:ad.adresse.address,
			souszone:ad.adresse.souszone,
			zone:ad.adresse.zone,
			region:ad.adresse.region,
       }
       console.log(data);
       this.panier.push(data);
     }
     console.log(this.panier);
     let params = { 
		  token:this.token , 
		  orderedarticles:""+JSON.stringify(this.panier), 
		  prenomclient: this.prenom, 
		  nomclient: this.nom, 
		  telephoneclient: this.telephone, 
		  montant:total,
		  emailclient: '',
    };
    this.ecomCaller.commander(params).then( response => {
      let data=JSON.parse(response);
     if(data.errorCode=='1'){
         this.viderpanier();
         this.commandevalidee=true;
     }else{
        console.log(data);
     }
    });
     this.viderpanier();
     this.commandevalidee=true;
    this.hidemodalcommande(); 
    
  }
  viderpanier(){
    this.articles=[];
    sessionStorage.removeItem('panier');
  }
}

