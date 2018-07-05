import { Component, OnInit, NgZone, ViewChild, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router';
import { Location }  from '@angular/common';
import { ModalDirective } from 'ng2-bootstrap/modal';

import * as sha1 from 'js-sha1';
import * as _ from "lodash";

import {CrmService, Portefeuille, Relance, Promotion, Prospection, Suivicommande, Servicepoint} from "../services/crm.service";


@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements OnInit {
	public relance:any[];
	public promotion:Promotion[];
	public prospection:Prospection[];
  public suivicommande:Suivicommande[];
	public portefeuille:Portefeuille[];
  public servicepoint:Servicepoint[];
  token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  loading = false ;
  message  : string = '' ;
  categMsg : string ;
  filtre = "" ;
  choosedCustomerPhone : string ;

  filtreSuiviCmd ="";
  filtreProspect ="";
  filtrePromo ="";
  filtreService ="---Choisir un service---";
  filtreRel ="";
  filtrePortFeuil ="";

  nom="nom";
  asc="asc";

  checkerRelance : any[] = [] ;
  checkerPromo : any[] = []  ;

  public menuHead = {menuHead1:true, menuHead2:false, menuHead3:false, menuHead4:false, menuHead5:false};


  constructor(
  		   private location: Location,
         private route:ActivatedRoute,
         private router: Router,
         private _crmService: CrmService
         ) { }


  ngOnInit() {
    this.loading = true ;

    this._crmService.servicepoint().subscribe(
      data => {
        console.log(data)
        this.servicepoint = data ;
        console.log(this.servicepoint)
      },
      error => alert(error),
      () => {
        this._crmService.portefeuille().subscribe(
          data => {
            this.portefeuille = data ;
          },
          error => alert(error),
          () => {
            console.log("Here Dashboard Test")
            this.loading = false ;
          }
        )
      }
    )
  }

  public menuHeadClick(option: number){
    if(option == 1){
      this.menuHead.menuHead1 = true;
      this.menuHead.menuHead2 = false;
      this.menuHead.menuHead3 = false;
      this.menuHead.menuHead4 = false;
      this.menuHead.menuHead5 = false;
    }
    if(option == 2){
      this.menuHead.menuHead1 = false;
      this.menuHead.menuHead2 = true;
      this.menuHead.menuHead3 = false;
      this.menuHead.menuHead4 = false;
      this.menuHead.menuHead5 = false;
    }
    if(option == 3){
      this.menuHead.menuHead1 = false;
      this.menuHead.menuHead2 = false;
      this.menuHead.menuHead3 = true;
      this.menuHead.menuHead4 = false;
      this.menuHead.menuHead5 = false;
    }
    if(option == 4){
      this.menuHead.menuHead1 = false;
      this.menuHead.menuHead2 = false;
      this.menuHead.menuHead3 = false;
      this.menuHead.menuHead4 = true;
      this.menuHead.menuHead5 = false;
    }
    if(option == 5){
      this.menuHead.menuHead1 = false;
      this.menuHead.menuHead2 = false;
      this.menuHead.menuHead3 = false;
      this.menuHead.menuHead4 = false;
      this.menuHead.menuHead5 = true;
    }
  }

  relanceMeth(){
    this.loading = true ;
  	this.checkerRelance = [] ;
    this._crmService.relance().subscribe(
      data => {
        this.relance = data ;
      },
      error => alert(error),
      () => {
        console.log("Here Dashboard Test")
        this.loading = false ;
      }
    )
  }

  promotionMeth(){
    this.loading = true ;
    this.checkerPromo = [];
    this._crmService.promotion().subscribe(
      data => {
        this.promotion = data ;
        console.log(this.promotion)
      },
      error => alert(error),
      () => {
        console.log("Here Dashboard Test")
        this.loading = false ;
      }
    )
  }

  getNom(infosop : string ){
  	return JSON.parse(infosop).nom ;
  }

  getPrenom(infosop:string){
  	return JSON.parse(infosop).prenom;
  }

  getTelephone(infosop:string){
  	return JSON.parse(infosop).tel;
  }

  prospect(){
      this.loading = true ;

    this._crmService.prospection().subscribe(
      data => {
        this.prospection = data ;
      },
      error => alert(error),
      () => {
        console.log("Here Dashboard Test")
        this.loading = false ;
      }
    )
  }

  commandes(){
      this.loading = true ;
    this._crmService.suivicommande().subscribe(
      data => {
        this.suivicommande = data ;
        console.log(this.suivicommande);
      },
      error => alert(error),
      () => {
        console.log("Here Dashboard Test")
        this.loading = false ;
      }
    )
  }

  prtflle(){
    this.loading = true ;
    this._crmService.portefeuille().subscribe(
      data => {
        this.portefeuille = data ;
      },
      error => alert(error),
      () => {
        console.log("Here Dashboard Test")
        this.loading = false ;
      }
    )
  }

  checkThisForRelance( isChecked:boolean, customer:any, index ){
    if(isChecked){
      this.checkerRelance.push( {unicity :index, customer} ) ;
    }else
    if ( _.find( this.checkerRelance, { 'unicity': index } ) )
      this.checkerRelance = _.filter( this.checkerRelance, function(o) { return (o.unicity!=index) } );
  }

  checkThisForPromo( isChecked:boolean, customer:any, index ){
    if(isChecked){
      this.checkerPromo.push( {unicity :index, customer} ) ;
    }else
    if ( _.find( this.checkerPromo, { 'unicity': index } ) )
      this.checkerPromo = _.filter( this.checkerPromo, function(o) { return (o.unicity!=index) } );
  }

  getAddressRecup(pointderecuperation){
    return JSON.parse(pointderecuperation).address ;
  }

   mail(){}

   sms(telephone){
    let destinataire = '+221'+telephone ;
     this._crmService.sendSms({destinataires:destinataire, messageContain:this.message}).subscribe(
       data => {
         this.childModal.hide();
       },
       error => alert(error),
       () => {
         console.log("Here Dashboard Test")
       }
     )
   }

   appel(){}


  detail(){}

  envoyersmsPromo(){
    let destinataires : string ;
    destinataires = '+221'+this.checkerPromo[0].customer.telephone ;

    for( var i=1 ; i<this.checkerPromo.length ; i++ ){
      destinataires = destinataires+'#+221'+this.checkerPromo[i].customer.telephone ;
    }

    this._crmService.sendSms({destinataires:destinataires, messageContain:this.message}).subscribe(
      data => {
        this.childModal.hide();
      },
      error => alert(error),
      () => {
        console.log("Here Dashboard Test")
      }
    )
  }

  envoyersmsRelance(){
    let destinataires : string ;
    destinataires = '+221'+this.checkerRelance[0].customer.telephone ;
    for( var i=1 ; i<this.checkerRelance.length ; i++ ){
      destinataires = destinataires+'#+221'+this.checkerRelance[i].customer.telephone ;
    }

    this._crmService.sendSms({destinataires:destinataires, messageContain:this.message}).subscribe(
      data => {
        this.childModal.hide();
      },
      error => alert(error),
      () => {
        console.log("Here Dashboard Test")
      }
    )
  }


  tester(){
    console.log("Checker activated!") ;
  }


  @ViewChild('childModal') public childModal:ModalDirective;

  public showChildModal(typeSuivi, tel):void {
    this.categMsg = typeSuivi ;
    if (typeSuivi=='single')
      this.choosedCustomerPhone = tel ;
    this.childModal.show();
  }

  public hideChildModal():void {
    this.message = '' ;
    this.childModal.hide();
  }


}
