import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-canal',
  templateUrl: './canal.component.html',
  styleUrls: ['./canal.component.css']
})
export class CanalComponent implements OnInit {

  verifierNumInput:any;
  infoAbonner:any = [];
  charme:any;
  pvd:any;
  deuxiemeEcran:any;
  montantNet:any;
  Abonnement =[
    {abonne:11623826,c:1,tel:'779854080',nom:'DIENG',prenom:'Aliou',pays:'Senegal',codePostale:'Sn013003',ville:'Dakar / diamalaye',Adresse:'Diamalaye 2 n 37',option:'Access',annuler:'',ret:'Non',ci:'14070495048190',societe:''},
    {abonne:11623827,c:1,tel:'772224080',nom:'BARRY',prenom:'Ablaye',pays:'Senegal',codePostale:'Sn013003',ville:'Dakar / diamalaye',Adresse:'Diamalaye 2 n 35',option:'EVASION',annuler:'',ret:'Non',ci:'14070495048190',societe:''},
    {abonne:11623828,c:1,tel:'773654080',nom:'NDIAYE',prenom:'Naby',pays:'Senegal',codePostale:'Sn013003',ville:'Dakar / parcelle',Adresse:'parcelle 2 n 37',option:'Access',annuler:'',ret:'Non',ci:'14070495048190',societe:''},
    {abonne:11623829,c:1,tel:'779854080',nom:'DIOP',prenom:'Djibi',pays:'Senegal',codePostale:'Sn013003',ville:'Dakar / Yoff',Adresse:'Yoff 2 n 37',option:'EVASION',annuler:'',ret:'Non',ci:'14070495048190',societe:''},
  ]
  validVerifierNum(){
    this.infoAbonner = [];
      for(let a of this.Abonnement){
        if(a.tel == this.verifierNumInput || a.nom == this.verifierNumInput || a.abonne == this.verifierNumInput){
          this.infoAbonner.push(a);
        }
      }
      console.log( this.infoAbonner);
  }
  listeBouquet =[
    {libelle:'Date à date Access'},
    {libelle:'Date à date Evasion'},
    {libelle:'Date à date ESSENTIEL+'},
    {libelle:'Date à date Les Chaines canal+ & Access'},
    {libelle:'Date à date Les Chaines canal+ & Evasion'},
    {libelle:'Date à date Tout Canal+'},
    {libelle:'Date à date Prestige'},

  ]
  TitreAbonner = [
    {libelle:'1-Monsieur'},
    {libelle:'2-Madame'},
    {libelle:'3-Mademoille'},
    {libelle:'4-Societé'},
  ]
  TypeIdentite = [
    {libelle:'Carte d\'identité'},
    {libelle:'Passport'},
    {libelle:'PERMIS DE CONDUIRE'},
    {libelle:'STAT'},
    {libelle:'VAD'},
  ]
  NewAbonnement ={distributeur:0,titre:'',nom:'',typeIdentite:'',pays:0,residence:'',codePostale:'',
          adresse:'',mail:'',phone:'',debut:'',offre:'',ville:'',offrePricipal:''}
  formReach:number = 1;
  abonnementChoose:any =null;
  getAbonner(i){
    this.abonnementChoose = this.infoAbonner[i];
    console.log(this.abonnementChoose.tel);
    this.infoAbonner = [];
    this.formReach = 0;
  }
  Bouquet:string;
  nombreMois:number=0;
  prixCharme:number = 0;
  getCharme(){
     if(this.prixCharme == 0){
      this.prixCharme = 6000;
     }else if(this.prixCharme != 0){
      this.prixCharme = 0;
     }

  }
  prixPVD:number=0;
  getPVD(){
    if(this.prixPVD == 0){
      this.prixPVD = 5000;
      console.log(this.prixPVD);
    }else  if(this.prixPVD != 0){
      this.prixPVD = 0;
      console.log(this.prixPVD);
    }
  }
  prix2Ecran:number=0;
  get2EECRAN(){
    if(this.prix2Ecran == 0){
      this.prix2Ecran = 6000;
      console.log(this.prix2Ecran);
      
    }else if(this.prix2Ecran != 0){
      this.prix2Ecran = 0;
      console.log(this.prix2Ecran);
      
    }
  }
  getMontant(){
    this.montantNet = 0;
    if(this.Bouquet == 'Date à date Access'){
      this.montantNet = this.montantNet + 5000 + this.prixCharme;
    }else if(this.Bouquet == 'Date à date Evasion')  {
      this.montantNet = this.montantNet + 10000 + this.prixCharme + this.prixPVD + this.prix2Ecran;
    }else if(this.Bouquet == 'Date à date Date à date ESSENTIEL+')  {
      this.montantNet = this.montantNet + 12000 + this.prixCharme + this.prixPVD + this.prix2Ecran;
    }else if(this.Bouquet == 'Date à date  Les Chaines canal+ & Access')  {
      this.montantNet = this.montantNet + 15000 + this.prixCharme + this.prixPVD + this.prix2Ecran;
    }else if(this.Bouquet == 'Date à date Les Chaines canal+ & Evasion')  {
      this.montantNet = this.montantNet + 20000 + this.prixCharme + this.prixPVD + this.prix2Ecran;
    }else if(this.Bouquet == 'Date à date Tout Canal+')  {
      this.montantNet = this.montantNet + 40000 + this.prixCharme + this.prixPVD + this.prix2Ecran;
    }else if(this.Bouquet == 'Date à date Prestige')  {
      this.montantNet = this.montantNet + 30000 + this.prixCharme + this.prixPVD + this.prix2Ecran;
    }
    this.montantNet = this.montantNet * this.nombreMois;
  }
  validAbonnement(){
    console.log(this.Bouquet);
    
  }
  reinitialise(){
    this.formReach = 1;
    this.abonnementChoose = null;
    this.infoAbonner = [];
  }
  constructor() { }

  ngOnInit() {
  }

}
