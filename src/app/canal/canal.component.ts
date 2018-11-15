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
  Abonnement = {abonne:0,tel:'',nom:'',prenom:'',numeroDecodeur:'',numeroCarte:'',formule:'',formuleOptionnelle:'',nombreMois:0,montant:0,charme:'',pvr:'',deuxiemeEcran:''};
  abonnement = [
    {abonne:145236,tel:779854080,nom:'Ndiaye',prenom:'Naby',numeroDecodeur:'146856652165',numeroCarte:154651418646,formule:'Date à date Access',formuleOptionnelle:'',nombreMois:1,montant:5000,charme:'',pvr:'',deuxiemeEcran:''},
    {abonne:166236,tel:772224080,nom:'Ndiaye',prenom:'Naby',numeroDecodeur:'146856652165',numeroCarte:154651418646,formule:'Date à date Access',formuleOptionnelle:'',nombreMois:1,montant:5000,charme:'',pvr:'',deuxiemeEcran:''},
    {abonne:111236,tel:779994080,nom:'Ndiaye',prenom:'Naby',numeroDecodeur:'146856652165',numeroCarte:154651418646,formule:'Date à date Access',formuleOptionnelle:'',nombreMois:1,montant:5000,charme:'',pvr:'',deuxiemeEcran:''}
  ];

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
    {libelle:'Monsieur'},
    {libelle:'Madame'},
    {libelle:'Mademoille'},
    {libelle:'Societé'},
  ]
  TypeIdentite = [
    {libelle:'Carte d\'identité'},
    {libelle:'Passport'},
    {libelle:'PERMIS DE CONDUIRE'},
    {libelle:'STAT'},
    {libelle:'VAD'},
  ]

  NewAbonnement ={titre:'',nom:'',prenom:'',cni:'',pays:0,
          adresse:'',mail:'',tel:'',formule:'',ville:'',nombreMois:0,numeroDecoudeur:0,montant:0,charme:'',pvr:'',deuxiemeEcran:''}

  formReach:number = 1;
  validRecrutement(){
    this.NewAbonnement.formule = this.Bouquet;
    this.NewAbonnement.montant = this.montantNet;
    this.NewAbonnement.nombreMois = this.nombreMois;
    this.NewAbonnement.pays = 149;
    this._canal.Recrutement(2,this.NewAbonnement.titre,this.NewAbonnement.nom,this.NewAbonnement.prenom,this.NewAbonnement.cni,this.NewAbonnement.ville,this.NewAbonnement.adresse,this.NewAbonnement.mail,this.NewAbonnement.tel,this.NewAbonnement.numeroDecoudeur,this.NewAbonnement.formule,this.NewAbonnement.montant,this.NewAbonnement.nombreMois,this.NewAbonnement.charme,this.NewAbonnement.pvr,this.NewAbonnement.deuxiemeEcran)
    console.log(this.NewAbonnement);
    this.reinitialise();
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
      this.Abonnement.charme ='charme';
      this.NewAbonnement.charme = 'charme';
     }else if(this.prixCharme != 0){
      this.prixCharme = 0;
      this.Abonnement.charme ="";
      this.NewAbonnement.charme = "";
     }
     this.getMontant();
  }
  prixPVD:number=0;
  getPVD(){
    if(this.prixPVD == 0){
      this.prixPVD = 5000;
      this.Abonnement.pvr ='PVD';
      this.NewAbonnement.pvr = 'PVD';
    }else  if(this.prixPVD != 0){
      this.prixPVD = 0;
      this.Abonnement.pvr ="";
      this.NewAbonnement.pvr = "";  
      }
    this.getMontant();
  }
  prix2Ecran:number=0;
  get2EECRAN(){
    if(this.prix2Ecran == 0){
      this.prix2Ecran = 6000;
      this.Abonnement.deuxiemeEcran ='2E ECRAN';
      this.NewAbonnement.deuxiemeEcran = '2E ECRAN';      
    }else if(this.prix2Ecran != 0){
      this.prix2Ecran = 0;
      this.Abonnement.deuxiemeEcran ="";
      this.NewAbonnement.deuxiemeEcran = ""; 
    }
    this.getMontant();
  }
  getMontant(){
    this.montantNet = 0;
    if(this.Bouquet == 'Date à date Access'){
      this.montantNet = this.montantNet + 5000 + this.prixCharme;
    }else if(this.Bouquet == 'Date à date Evasion')  {
      this.montantNet = this.montantNet + 10000 + this.prixCharme + this.prixPVD + this.prix2Ecran;
    }else if(this.Bouquet == 'Date à date ESSENTIEL+')  {
      this.montantNet = this.montantNet + 12000 + this.prixCharme + this.prixPVD + this.prix2Ecran;
    }else if(this.Bouquet == 'Date à date Les Chaines canal+ & Access')  {
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
    this.Abonnement.formule = this.Bouquet;
    this.Abonnement.montant = this.montantNet;
    this.Abonnement.nombreMois = this.nombreMois;
    console.log(this.Abonnement);
    this._canal.abonnement(1,this.Abonnement.nom,this.Abonnement.prenom,this.Abonnement.tel,this.Abonnement.abonne,this.Abonnement.numeroDecodeur,this.Abonnement.numeroCarte,this.Abonnement.formule,this.Abonnement.montant,this.Abonnement.nombreMois,this.NewAbonnement.charme,this.NewAbonnement.pvr,this.NewAbonnement.deuxiemeEcran).then(res =>{
      console.log(res);

    });
    this.reinitialise()

  }
  reachAbonne:number;
  displayReabonnement:number =1;
  reachResult:any =[];
  rechercher(){
   /* this.reachResult =[];
    for(let a of this.abonnement){
      console.log(a.abonne+" "+this.reachAbonne);     
      if(a.abonne == this.reachAbonne || a.numeroCarte == this.reachAbonne || a.tel == this.reachAbonne ){
        this.reachResult.push(a)
        this.displayReabonnement=2;
      }
    }
    let tel = "00221"+this.reachAbonne
    console.log(tel);
    
    console.log(this.reachResult);*/
    this._canal.Recherhe(this.reachAbonne).then(res =>{
      console.log(res);
    }) 
  }
  clickAbonnement(i){
    this.reachResult
    this.Abonnement.abonne = this.reachResult[i].abonne;
    this.Abonnement.nom = this.reachResult[i].nom;
    this.Abonnement.prenom = this.reachResult[i].prenom;
    this.Abonnement.tel = this.reachResult[i].tel;
    this.Abonnement.numeroDecodeur = this.reachResult[i].numeroDecodeur;
    this.Abonnement.numeroCarte = this.reachResult[i].numeroCarte;
    this.displayReabonnement=3;
  }
  reinitialise(){
   /* this.formReach = 1;
    this.abonnementChoose = null;
    this.infoAbonner = [];*/
    this.Bouquet = '';
    this.nombreMois = 0;
    this.montantNet = 0;
    this.Abonnement.abonne =null;
    this.Abonnement.charme = null;
    this.Abonnement.deuxiemeEcran = null;
    this.Abonnement.formule = null;
    this.Abonnement.formuleOptionnelle = null;
    this.Abonnement.montant = null;
    this.Abonnement.nom = null;
    this.Abonnement.nombreMois = null;
    this.Abonnement.numeroCarte = null;
    this.Abonnement.numeroDecodeur = null;
    this.Abonnement.prenom = null;
    this.Abonnement.pvr = null;
    this.Abonnement.tel
    this.NewAbonnement.adresse = null;
    this.NewAbonnement.charme = null;
    this.NewAbonnement.cni = null;
    this.NewAbonnement.deuxiemeEcran = null;
    this.NewAbonnement.formule = null;
    this.NewAbonnement.mail = null;
    this.NewAbonnement.montant = null;
    this.NewAbonnement.nom = null;
    this.NewAbonnement.nombreMois = null;
    this.NewAbonnement.numeroDecoudeur = null;
    this.NewAbonnement.pays = null;
    this.NewAbonnement.prenom = null;
    this.NewAbonnement.pvr = null;
    this.NewAbonnement.tel =null;
    this.NewAbonnement.titre = null;
    this.NewAbonnement.ville = null;

  }
  @ViewChild('modalventecredit') public modalventecredit:ModalDirective;
  @ViewChild('reabonnement') public reabonnement:ModalDirective;
  @ViewChild('recrutement') public recrutement:ModalDirective;
  showmodalventecredit(){
    this.modalventecredit.show();
  }
  showmodalreabonnement(){
    this.reabonnement.show();
  }
  showmodalrecrutement(){
    this.recrutement.show();
  }
  hidemodalventecredit(){
    this.modalventecredit.hide();
  }
  hidereabonnement(){
    this.reabonnement.hide();
  }
  hiderecrutement(){
    this.recrutement.hide();
  }
  constructor(public _canal:CanalService) { }

  ngOnInit() {
    //this.getMontant();
    this.getMontant()
  }

}
