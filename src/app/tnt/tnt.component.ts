import { Component, OnInit, Pipe, PipeTransform,Input,Output,EventEmitter } from '@angular/core';
import { ViewChild, ElementRef} from '@angular/core';
import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Router } from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router';
import { Location }  from '@angular/common';

import {NAbonnementService} from '../tnt/tntservices';
import {NAbonnement} from '../tnt/tntmodels';
import {LAbonnementService} from '../tnt/tntservices';
import {LAbonnement} from '../tnt/tntmodels';
import {EFinancierService} from '../tnt/tntservices';
import {EFinancier} from '../tnt/tntmodels';
import {TntService, TntResponse} from "../services/tnt.service";

@Pipe({name: 'dataToArray'})
export class DataToArray implements PipeTransform{
  transform(value){
    return Array.from(value) ;
  }
}

@Component({
  selector: 'app-tnt',
  templateUrl: './tnt.component.html',
  styleUrls: ['./tnt.component.css'],
})

export class TntComponent implements OnInit {
  verifierNumInput:number ;
  verifierNumValide:boolean = false;
  verifierNumInputValide:boolean = true;
  token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  loading = false ;
  message : string ;
  erreur = false ;
  errorMessage : string ;


  prenomNewClient : string ;
  nomNewClient: string ;
  telNewClient: number ;
  adresseNewClient: string ;
  regionNewClient: string ;
  cniNewClient: string ;
  nchipNewClient: number ;
  ncarteNewClient: number ;
  nbmNewClient: number;
  tbouquetNewClient : string = 'Sans Abonnement';

  noma:string;
  prenoma:string;
  cni : any  = '';
  nbm:number;
  tbouquet:string;
  public retourTntWS: {}[] ;
  private singleTntWS: TntResponse ;
  rowsOnPage = 7 ;
  sortBy = "prenom";
  orderByDate = 'date_abonnement' ;
  sortDateOrder = "desc";
  sortOrder = "asc";
  filtre = "" ;
  filtreDeco = "" ;
  filtreCarte = "" ;
  dataImpression:any;

  adejaclick:boolean = false;

  @ViewChild('modalabonnement') modalabonnement: ModalDirective;
  @ViewChild('modaldecodeur') modaldecodeur: ModalDirective;
  @ViewChild('modalcarte') modalcarte: ModalDirective;

  constructor(private tntCaller:TntService) { 
  /*
    this.route.params.subscribe( (params : Params) => {
      this.nAbonnement = this.nAbonnementService.getNAbonnement(5);
    });
      this.route.params.subscribe( (params : Params) => {
      this.lAbonnement = this.lAbonnementService.getLAbonnement(5);
    });
      this.route.params.subscribe( (params : Params) => {
      this.eFinancier = this.eFinancierService.getEFinancier(5);
    });*/

  }
  ngOnInit() { }
@Input() bbstnt:number=0;
@Output() changementTnt=new EventEmitter();

increment(){
  this.bbstnt++;
  this.changementTnt.emit(this.bbstnt);
}
  validVerifierNum(){
    this.loading = true ;
    this.erreur = false ;
    this.tntCaller.checkNumber(this.token, this.verifierNumInput.toString()).then( response => {
        this.singleTntWS = response ;
        console.log(this.singleTntWS);
        this.noma = this.singleTntWS.nom ;
        this.prenoma = this.singleTntWS.prenom ;
        this.telNewClient = Number(this.singleTntWS.tel);
        this.nchipNewClient = Number(this.singleTntWS.n_chip) ;
        this.ncarteNewClient = Number(this.singleTntWS.n_carte) ;
        this.cni = this.singleTntWS.cni;

        if (this.singleTntWS.id_typeabonnement=="1")
          this.tbouquet = "Maanaa";
        if (this.singleTntWS.id_typeabonnement=="2")
          this.tbouquet = "Boul Khool";
        if (this.singleTntWS.id_typeabonnement=="3")
          this.tbouquet = "Maanaa + Boul Khool";

        this.verifierNumValide = true;
        this.verifierNumInputValide = false;

        this.loading = false ;
    });
    sessionStorage.removeItem('dataImpression');
  }

  validnabon(){
    this.modalabonnement.hide();
    var typedebouquet : number ;
    if(this.tbouquet == "Maanaa")
      typedebouquet=1;
    if(this.tbouquet == "Boul khool")
      typedebouquet=2;
    if(this.tbouquet == "Maanaa + Boul khool")
      typedebouquet=3;
    sessionStorage.setItem('curentProcess',JSON.stringify({'token':this.token,'nom':'Tnt nouvel abonnement','operateur':4,'operation':1,'typedebouquet':typedebouquet,'tel':this.telNewClient,'chip':this.nchipNewClient,'carte':this.ncarteNewClient,'prenom':this.prenoma,'nomclient':this.noma,'duree':this.nbm,'cni':''}));
    this.increment();
    this.reinitialiserVariables();
  }


  listerAbonnements(){
      this.loading = true ;
      this.erreur = false ;
      this.tntCaller.listAbonnement(this.token).then( response =>
        {
          this.retourTntWS = response ;
          this.loading = false ;
        }) ;
  }

  listerVenteDeco(){
      this.loading = true ;
      this.erreur = false ;
      this.tntCaller.listeVenteDecods(this.token).then( response =>
        {
          this.retourTntWS = response.reverse() ;
          this.loading = false ;
        }) ;
  }

  listerVenteCarte(){
      this.loading = true ;
      this.erreur = false ;
      this.tntCaller.listerVenteCartes(this.token).then( response =>
        {
          this.retourTntWS = response.reverse() ;
          this.loading = false ;
        }) ;
  }

  vendreDecodeur(){
     var typedebouquet : number ;
    var prix:number ;
    if(this.tbouquetNewClient == "Sans Abonnement"){
      typedebouquet=0;
      prix = 15000 ;
    }
    if(this.tbouquetNewClient == "+ 1 Mois"){
      typedebouquet=1;
      prix = 19500 ;
    }
    if(this.tbouquetNewClient == "+ 3 Mois"){
      typedebouquet=3;
      prix = 28000 ;
    }
    sessionStorage.setItem('curentProcess',JSON.stringify({'token':this.token,'nom':'Tnt vente decodeur','operateur':4,'operation':2,'prenom':this.prenomNewClient,'tel':this.telNewClient,adresse:this.adresseNewClient, region:this.regionNewClient, cni:this.cniNewClient,'chip':this.nchipNewClient,'carte':this.ncarteNewClient,'nomclient':this.nomNewClient,'typedebouquet':typedebouquet,'montant':prix}));
    this.increment();
    this.hidemodaldecodeur();
    this.reinitialiserVariables() ;

  }

  vendreCarte(){
       sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Tnt vente carte','operateur':4,'operation':3,'prenom':this.prenomNewClient,'tel':this.telNewClient,adresse:this.adresseNewClient, region:this.regionNewClient, cni:this.cniNewClient,'chip':this.nchipNewClient,'carte':this.ncarteNewClient,'nomclient':this.nomNewClient}));
       this.increment();
       this.modalcarte.hide();
       this.reinitialiserVariables() ;
  }

  reinitialiserVariables(){
      this.erreur = false ;
      this.verifierNumValide = false ;
      this.prenomNewClient =undefined ;
      this.nomNewClient=undefined ;
      this.telNewClient=undefined ;
      this.adresseNewClient=undefined ;
      this.regionNewClient=undefined ;
      this.cniNewClient=undefined ;
      this.nchipNewClient=undefined ;
      this.ncarteNewClient=undefined ;
      this.nbmNewClient=undefined;
      this.tbouquetNewClient=undefined ;
  }


 public showmodalabonnement(){
   this.adejaclick = false;
   this.modalabonnement.show();
  }

 public showmodaldecodeur(){
   this.adejaclick = false;
   this.modaldecodeur.show();
  }
  public hidemodaldecodeur(){
    this.modaldecodeur.hide();
  }
 public showmodalcarte(){
   this.adejaclick = false;
   this.modalcarte.show();
  }
  public hidemodalcarte(){
    this.modalcarte.hide();
  }

}
