import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Router, CanActivate } from '@angular/router';
import { OrangeMoneyService } from '../webServiceClients/Orangemoney/orangemoney.service' ;
import { TigoCashService } from '../webServiceClients/Tigocash/tigocash.service';
import {WizallWebService} from "../webServiceClients/Wizall/wizall.service";
import {FacturierServiceWeb} from "../webServiceClients/facturier/Facturier.service";


class Article {
  public id:number;
  public nomImg:string;
  public designation:string;
  public description:string;
  public prix:number;
  public quantite:number;
}

@Component({
  selector: 'app-senelec',
  templateUrl: './senelec.component.html',
  styleUrls: ['./senelec.component.css'],
  providers: [WizallWebService]
})
export class SenelecComponent implements OnInit {
   etat1:boolean=false;
   etat2:boolean=false;
   montant:number;
   service:string;
   mntsde:number;
   echeance:any;
   refclientsde:number;
   refFactureSDE:number;
   nomclient:string;
   statuspayment:boolean;
   detailfacturesenelec:any={errorCode:0,police:12545555,numeroFacture:156665,nom_client:'nom du client',montant:50000,dateEcheance:"12/3/2018"};
   facture_deja_paye:boolean = false;
   police:string;
   num_facture:string;
   dataImpression:any;
  constructor(private router: Router,private omService : OrangeMoneyService,private tcService : TigoCashService,private wizallwebservice: WizallWebService,private FacturierServiceWeb:FacturierServiceWeb) { }

/******************************************************************************************************/


  ngOnInit() {


  }

@ViewChild('modalsenelec') public modalsenelec:ModalDirective;
/******************************************************************************************************/
   showmodalsenelec(){
     this.detailfactsenelec();
   }
   hidemodalsenelec(){
     this.modalsenelec.hide();
   }
   detailfactsenelec(){
     this.FacturierServiceWeb.detailfacturesenelec(this.police,this.num_facture).then(response =>{
        if(response.errorCode==0){
          this.etat2=true;
          this.detailfacturesenelec.police=response.police;
          this.detailfacturesenelec.numeroFacture=response.num_facture;
          this.detailfacturesenelec.nomclient=response.nom_client;
          this.detailfacturesenelec.montant=response.montant;
          this.detailfacturesenelec.dateEcheance=response.dateEcheance;

          this.modalsenelec.show();
        }else{
          console.log(response);
          this.etat1=true;
          this.detailfacturesenelec.errorCode=response.errorCode;
          this.modalsenelec.show();
        }

     });
   }
   validerpaimentsenelec(){
    this.FacturierServiceWeb.validerpaimentsenelec(this.montant,this.police,this.num_facture,this.service).then(response =>{
      if(response.errorCode==0){
         this.modalsenelec.hide();
         this.dataImpression = {
            apiservice:'postecash',
            service:'reglementsenelec',
            infotransaction:{
              client:{
                transactionPostCash: response.transactionId,
                transactionBBS: 'Id BBS',
                police: this.police,
                facture: this.num_facture,
                montant: response.montant_reel,

              },

            },
          }
          sessionStorage.setItem('dataImpression', JSON.stringify(this.dataImpression));
          this.router.navigate(['accueil/impression']);
         console.log(response);
      }else{
        console.log(response);
        this.modalsenelec.hide();
      }

   });

   }


}

