import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Router, CanActivate } from '@angular/router';
import { OrangeMoneyService } from '../webServiceClients/Orangemoney/orangemoney.service' ;
import { TigoCashService } from '../webServiceClients/Tigocash/tigocash.service';
import {WizallWebService} from "../webServiceClients/Wizall/wizall.service";
import {FacturierServiceWeb} from "../webServiceClients/facturier/Facturier.service";



@Component({
  selector: 'app-woyofal',
  templateUrl: './woyofal.component.html',
  styleUrls: ['./woyofal.component.css'],
  providers: [WizallWebService]
})
export class WoyofalComponent implements OnInit {
   etat:boolean=true;
   api:number=5;
   compteur:string;
   montant:number;
   dataImpression:any;
  constructor(private router: Router,private omService : OrangeMoneyService,private tcService : TigoCashService,private wizallwebservice: WizallWebService,private FacturierServiceWeb:FacturierServiceWeb) {

  }

/******************************************************************************************************/


  ngOnInit() {


  }
  @ViewChild('modalwoyofal') public modalwoyofal:ModalDirective;
  showmodalwoyofal(){
   this.modalwoyofal.show();
  }

  hidemodalwoyofal(){
   this.modalwoyofal.hide();
  }
  validerwoyofal(){
    this.FacturierServiceWeb.validerwoyofal(this.api,this.montant,this.compteur).then(response =>{
      console.log(response);
      this.modalwoyofal.hide();
      this.dataImpression = {
          apiservice:'postecash',
          service:'achatcodewayafal',
          infotransaction:{
            client:{
              transactionPostCash: response.transactionId,
              transactionBBS: 'Id BBS',
               codewoyafal: response.code,
               montant: this.montant,
               compteur: this.compteur,
            },

          },
        }
        sessionStorage.setItem('dataImpression', JSON.stringify(this.dataImpression));
        this.router.navigate(['accueil/impression']);
    });
  }

/******************************************************************************************************/




}

