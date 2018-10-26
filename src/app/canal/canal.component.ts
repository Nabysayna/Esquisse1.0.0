import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { CanalService } from '../services/canal.service';

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
  //Abonnement = {abonne:0,c:0,tel:'',nom:'',prenom:'',pays:'',codePostale:'',ville:'',Adresse:'',option:'',annuler:'',ret:'',ci:'',societe:''};
  Abonnement = {abonne:0,tel:'',nom:'',prenom:'',numeroDecodeur:'',numeroCarte:'',formule:'',formuleOptionnelle:'',nombreMois:0,montant:0};

  validVerifierNum(){
    this.infoAbonner = [];
     
  }
  listeBouquet =[
    {libelle:'Date à date Access'},
    {libelle:'Date à date Evasion'},
    {libelle:'Date à date ESSENTIEL+'},
    {libelle:'Date à date Les Chaines canal+ & Access'},
    {libelle:'Date à date Les Chaines canal+ & Evasion'},
    {libelle:'Date à date Tout Canal+'},
    //{libelle:'Date à date Prestige'},
  ]
  listeBouquetR =[
    {libelle:'Date à date Access'},
    {libelle:'Date à date Evasion'},
    {libelle:'Date à date Les Chaines canal+ & Access'},
    {libelle:'Date à date Les Chaines canal+ & Evasion'},
    {libelle:'Date à date Tout Canal+'},
    //{libelle:'Date à date Prestige'},
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

  NewAbonnement ={titre:'',nom:'',prenom:'',cni:'',pays:0,
          adresse:'',mail:'',phone:'',formule:'',ville:'',nombreMois:0,numeroDecoudeur:0,montant:0}

  formReach:number = 1;
  validRecrutement(){
    this.NewAbonnement.formule = this.Bouquet;
    this.NewAbonnement.montant = this.montantNet;
    this.NewAbonnement.nombreMois = this.nombreMois;
    this.NewAbonnement.pays = 149;
    console.log(this.NewAbonnement);
    
  }
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
     this.getMontant();
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
    this.getMontant();
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
    this.getMontant();
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
   /* this.Abonnement.formule = this.Bouquet;
    this.Abonnement.montant = this.montantNet;
    this.Abonnement.nombreMois = this.nombreMois;
    console.log(this.Abonnement);
    this._canal.abonnement(1,this.Abonnement.nom,this.Abonnement.prenom,this.Abonnement.tel,this.Abonnement.abonne,this.Abonnement.numeroDecodeur,this.Abonnement.numeroCarte,this.Abonnement.formule,this.Abonnement.montant,this.Abonnement.nombreMois).then(res =>{
      console.log(res);
    });*/
  }
  reinitialise(){
   /* this.formReach = 1;
    this.abonnementChoose = null;
    this.infoAbonner = [];*/
    this.Bouquet = '';
    this.nombreMois = 0;
    this.montantNet = 0;

  }
  @ViewChild('modalventecredit') public modalventecredit:ModalDirective;
  showmodalventecredit(){
    this.modalventecredit.show();
  }
  hidemodalventecredit(){
    this.modalventecredit.hide();
  }
  constructor(public _canal:CanalService) { }

  ngOnInit() {
    //this.getMontant();
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

}
