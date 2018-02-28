import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Router, CanActivate } from '@angular/router';
import { OrangeMoneyService } from '../webServiceClients/Orangemoney/orangemoney.service' ;
import { TigoCashService } from '../webServiceClients/Tigocash/tigocash.service';
import {WizallWebService} from "../webServiceClients/Wizall/wizall.service";
import {FacturierServiceWeb} from "../webServiceClients/facturier/Facturier.service";


@Component({
  selector: 'app-sde',
  templateUrl: './sde.component.html',
  styleUrls: ['./sde.component.css'],
  providers: [WizallWebService]
})
export class SdeComponent implements OnInit {
   etat:boolean=false;
   message:boolean=false;
   mntsde:number;
   echeance:any;
   refclientsde:number;
   refFactureSDE:number;
   nomclient:string;
   statuspayment:boolean;
   dataImpression:any;

   constructor(private FacturierServiceWeb:FacturierServiceWeb,private router: Router,private omService : OrangeMoneyService,private tcService : TigoCashService,private wizallwebservice: WizallWebService) {

  }

/******************************************************************************************************/


  ngOnInit() {  }

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
  }
  showmodalsde(){
    this.modalsde.show();
    this.detailfactursde();

  }
  paimantsde(){
    this.FacturierServiceWeb.paimentsde(this.mntsde,this.refclientsde,this.refFactureSDE,'sde').then( response =>{
       this.hidemodalsde();
        this.dataImpression = {
          apiservice:'postecash',
          service:'achatcodewayafal',
          infotransaction:{
            client:{
              transactionPostCash: response.transactionId,
              transactionBBS: 'Id BBS',
               referenceclient: this.refclientsde,
               montant: this.mntsde,
               refFacture: this.refFactureSDE,
            },

          },
        }
        sessionStorage.setItem('dataImpression', JSON.stringify(this.dataImpression));
        this.router.navigate(['accueil/impression']);
    });
  }
  hidemodalsde(){
   this.modalsde.hide();
  }

}

