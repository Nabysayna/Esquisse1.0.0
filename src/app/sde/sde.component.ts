import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Router, CanActivate } from '@angular/router';
import { OrangeMoneyService } from '../webServiceClients/Orangemoney/orangemoney.service' ;
import { PostCashWebService } from '../webServiceClients/PostCash/postcash.service';
import { TntServiceWeb, TntResponse } from '../webServiceClients/Tnt/Tnt.service';
import { TigoCashService } from '../webServiceClients/Tigocash/tigocash.service';
import {WizallWebService} from "../webServiceClients/Wizall/wizall.service";
import {FacturierServiceWeb} from "../webServiceClients/facturier/Facturier.service";


@Component({
  selector: 'app-sde',
  templateUrl: './sde.component.html',
  styleUrls: ['./sde.component.css'],
  providers: [PostCashWebService, WizallWebService]
})
export class SdeComponent implements OnInit {
   etat:boolean=false;
   message:boolean=false;
   mntsde:number=545;
   echeance:any="12/8/2008";
   refclientsde:number=566;
   refFactureSDE:number=545;
   nomclient:string="mag";
   statuspayment:boolean;

   constructor(private FacturierServiceWeb:FacturierServiceWeb,private router: Router,private omService : OrangeMoneyService,private tcService : TigoCashService,private postcashwebservice: PostCashWebService,private wizallwebservice: WizallWebService) {

  }

/******************************************************************************************************/


  ngOnInit() {

   
  }
  //{'STATUS':'FAILED', 'code': '400', 'error': 'BILL_ALREADY_PAID​'}
  /*
   {'PAYMENT_TRANSACTION_NUMBER':'003001080000303010617012017092816
4414', 'reference_client': '108000030321', 'reference_facture':
'00300108000030301061701', 'nom': 'MAKTAR', 'prenom':
'DIAVERGERANIASSANEBAMBYLOR', 'montant': '10983',
'date_echeance': '10/07/2017', 'statuspayment': true }
  */
  @ViewChild('modalsde') public modalsde:ModalDirective;

  detailfactursde(){
    this.FacturierServiceWeb.detailreglementsde(this.refclientsde).then(response =>{
      if(response.response==null){
         this.message=true; 

      }else{
         this.etat=true;
         this.refFactureSDE=response.response.reference_facture;
         this.nomclient=response.reponse.nom;
         this.echeance=response.response.date_echeance;
         this.statuspayment=response.response.statuspayment;
         this.mntsde=response.response.montant;
      }

        console.log(response);
        
    });
    /*this.wizallwebservice.intouchRecupereFactureSde(this.refclientsde).then(response =>{
       console.log(response);
    });*/
  }
  showmodalsde(){
    this.modalsde.show();
    this.detailfactursde();
   
  }
  paimantsde(){
    this.FacturierServiceWeb.paimentsde(this.mntsde,this.refclientsde,this.refFactureSDE,'sde').then( response =>{
       this.hidemodalsde();
    });
  }
  hidemodalsde(){
   this.modalsde.hide();
  }
  payerfacturesde(){
    this.modalsde.hide() ;
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wizall SDE','operateur':6,'operation':3,'montant':this.mntsde,'refclient':this.refclientsde,'refFacture':this.refFactureSDE}));
  }

/******************************************************************************************************/


  

}

