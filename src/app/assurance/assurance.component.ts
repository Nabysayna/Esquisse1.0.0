import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'app-assurance',
  templateUrl: './assurance.component.html',
  styleUrls: ['./assurance.component.css']
})
export class AssuranceComponent implements OnInit {

  //information client
  monsieur:string='M.';
  madame: string = 'Mme.';
  mademoiselle: string = 'Mlle.';
  nomClient: string;
  prenomClient: string;
  rueClient: string;
  adesseClient: string;
  villeClient: string;
  regionClient: string;
  bpClient: string;
  paysClient: string;
  telClient: string;
  mailClient: string;
 //carte grise
 numCarteGrise: string;
 numMatriculation: string;
 nomProprio: string;
 prenomProprio: string;
 marqueVehicule: string;
 modelVehicule: string;
 anneeFabrication: string;
 puissanceVehicule: string;
 //type vehicule
 automibile:string;
 motoScoter:string;
 taxi:string;
 moto:string;
 canion:string;
 vehiculeChantier:string;
 vehiculeAgricole:string;
 //permis de conduire
 numPermi:string;
 dateDelivrance:string;
 infoSupPermis:string;
 //duree de l'assurance
 dateDebut:any;
 dateFin:any;
 duree:any;
 //affichage des etapes
 etap:number=1;
 assuraneEnCours:any;
 suivant(){
    this.etap = this.etap+1;
 }
 precedent(){
  this.etap = this.etap-1;
 }
dureeAssurance(){
  if(this.duree == 'semaine'){
    this.dateDebut = new Date().toJSON();
    this.dateFin = new Date().getDay() + 7;
    console.log("=>"+this.dateDebut+" "+this.dateFin);
    
  }
}
detail(i:number){
  this.assuraneEnCours = this.Assurance[i];
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
  getAssurane(i:number){

  }
  constructor() { }

  ngOnInit() {
  }

}
