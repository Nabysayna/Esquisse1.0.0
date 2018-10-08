import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective, DateFormatter } from 'ng2-bootstrap';

@Component({
  selector: 'app-assurance',
  templateUrl: './assurance.component.html',
  styleUrls: ['./assurance.component.css']
})
export class AssuranceComponent implements OnInit {

  //information client
  genre:string;
  getGenre(){
    if(this.genre == '1'){
      this.InfoClient.genre ='M.';
      console.log(this.InfoClient.genre);
    }
    if(this.genre == '2'){
      this.InfoClient.genre ='Mme';
      console.log(this.InfoClient.genre);
    }
    if(this.genre == '3'){
      this.InfoClient.genre ='Mlle';
      console.log(this.InfoClient.genre);
    }
    console.log(this.InfoClient,this.CarteGrise);
    
  }
  InfoClient = { genre:'',nom:'',prenom:'',rue:'',adresse:'',ville:'',region:'',bp:'',pays:'',telephone:'',mail:''}
 //carte grise
 CarteGrise = { numero:'',matricule:'',nom:'',prenom:'',marque:'',model:'',annee:'',puissance:''}
 //type vehicule
 automibile:string;
 motoScoter:string;
 moto:string;
 canion:string;
 taxi:string;
 vehiculeChantier:string;
 vehiculeAgricole:string;
 getType(){
  console.log('==>'+this.typeVehicule.nom);
   if(this.automibile =='automibile'){
    this.typeVehicule.nom = 'automibile';
    console.log(this.typeVehicule.nom);
   }
   if(this.taxi !=''){
    this.typeVehicule.nom = 'taxi';
    console.log(this.typeVehicule.nom);
   }
   if(this.motoScoter !=''){
    this.typeVehicule.nom = 'moto/scoter';
    console.log(this.typeVehicule.nom);
   }
   if(this.moto !=''){
    this.typeVehicule.nom = 'moto';
    console.log(this.typeVehicule.nom);
   }
   if(this.canion ==''){
    this.typeVehicule.nom = 'canion';
    console.log(this.typeVehicule.nom);
   }
   if(this.vehiculeChantier !=''){
    this.typeVehicule.nom = 'vehicule Chantier';
    console.log(this.typeVehicule.nom);
   }
   if(this.vehiculeAgricole !=''){
    this.typeVehicule.nom = 'vehicule Agricole';
    console.log(this.typeVehicule.nom);
   }

   console.log(this.InfoClient,this.CarteGrise);
   

 }
 typeVehicule = { nom :''}
 //permis de conduire
 
 Permis ={ numero:'',dateDelivrance:'',infoSup:''}
 //duree de l'assurance
 dateDebut:any;
 dateFin:any;
 DureeAssurance ={ dateDebut:'', dateFin:''}
 //affichage des etapes
 etap:number=1;
 etapPaiement:number = 1;
 etapPaiement1(){
  console.log(this.etapPaiement);
  this.etapPaiement =this.etapPaiement+1;
  console.log(this.etapPaiement);
}
 etapPaiement2(){
  this.etapPaiement = this.etapPaiement+1;
 }
 etapPaiemen31(){
  this.etapPaiement = this.etapPaiement+1;
 }
 etapPaiement4(){
  this.etapPaiement = this.etapPaiement+1;
 }

 assuraneEnCours:any;
 lineClick:any;
 suivant(){
    this.etap = this.etap+1;
 }
 precedent(){
  this.etap = this.etap-1;
 }
 dureeSemaine(){
  this.dateDebut = new Date().toLocaleDateString();
  this.dateFin = new Date();
  this.dateFin.setDate(this.dateFin.getDate()+7);
  this.dateFin = this.dateFin.toLocaleDateString();
  this.DureeAssurance.dateDebut = this.dateDebut;
  this.DureeAssurance.dateFin = this.dateFin;
  console.log(this.DureeAssurance); 
 }
 duree2Semaine(){
  this.dateDebut = new Date().toLocaleDateString();
  this.dateFin = new Date();
  this.dateFin.setDate(this.dateFin.getDate()+14);
  this.dateFin = this.dateFin.toLocaleDateString();
  this.DureeAssurance.dateDebut = this.dateDebut;
  this.DureeAssurance.dateFin = this.dateFin;
  console.log(this.DureeAssurance); 
 }
 dureeMois(){
  this.dateDebut = new Date().toLocaleDateString();
  this.dateFin = new Date();
  this.dateFin.setMonth(this.dateFin.getMonth() +1);
  this.dateFin = this.dateFin.toLocaleDateString();
  this.DureeAssurance.dateDebut = this.dateDebut;
  this.DureeAssurance.dateFin = this.dateFin;
  console.log(this.DureeAssurance); 
 }
 duree3Mois(){
  this.dateDebut = new Date().toLocaleDateString();
  this.dateFin = new Date();
  this.dateFin.setMonth(this.dateFin.getMonth() +3);
  this.dateFin = this.dateFin.toLocaleDateString();
  this.DureeAssurance.dateDebut = this.dateDebut;
  this.DureeAssurance.dateFin = this.dateFin;
  console.log(this.DureeAssurance); 
 }
 duree6Mois(){
  this.dateDebut = new Date().toLocaleDateString();
  this.dateFin = new Date();
  this.dateFin.setMonth(this.dateFin.getMonth() +6) ;
  this.dateFin=this.dateFin.toLocaleDateString();
  this.DureeAssurance.dateDebut = this.dateDebut;
  this.DureeAssurance.dateFin = this.dateFin;
  console.log(this.DureeAssurance); 
 }
 duree12Mois(){
  this.dateDebut = new Date().toLocaleDateString();
  this.dateFin = new Date();
  this.dateFin.setMonth(this.dateFin.getMonth() +12) ;
  this.dateFin=this.dateFin.toLocaleDateString();
  this.DureeAssurance.dateDebut = this.dateDebut;
  this.DureeAssurance.dateFin = this.dateFin;
  console.log(this.DureeAssurance); 
 }

getClassCSS(i){
  if(this.lineClick == i){
    return  { 'lineClick': true,'lineNotClick':false};
  }else{
    return  { 'lineClick': false,'lineNotClick':true};
  }
}
getAssurane(i:number){
  this.assuraneEnCours = this.Assurance[i];
  console.log(this.assuraneEnCours);
  this.lineClick = i;
  /*if(i != undefined){
      alert("ok");
      this.getColor.lineClick=true;
      this.getColor.lineNotClick=false;
  }*/
  console.log( this.getColor.lineClick);
}
 
  @ViewChild('modalAssurer') modalAssurer: ModalDirective;
  @ViewChild('modalAffichage') modalAffichage: ModalDirective;
  reinitialise(){
    this.modalAssurer.show();
  }
  ShowModalAffichage(){
    this.modalAffichage.show();
  }
  Assurance = [
    {assurance: 'Assurance 1',tarif: '8000',monaie:'FCFA',duree:'semaine'},
    {assurance: 'Assurance 2',tarif: '8500',monaie:'FCFA',duree:'2 semaine'},
    {assurance: 'Assurance 3',tarif: '8900',monaie:'FCFA',duree:'mois'},
    {assurance: 'Assurance 4',tarif: '9000',monaie:'FCFA',duree:'3 mois'},
    {assurance: 'Assurance 5',tarif: '9500',monaie:'FCFA',duree:'6 mois'},
    {assurance: 'Assurance 4',tarif: '10000',monaie:'FCFA',duree:'12 mois'}
  ]

  getColor = {
    'lineClick': false,
    'lineNotClick':true
  }
  constructor() { }

  ngOnInit() {
  }

}
