import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Router, CanActivate } from '@angular/router';
import {FacturierService} from "../services/facturier.service";


@Component({
  selector: 'app-sde',
  templateUrl: './sde.component.html',
  styleUrls: ['./sde.component.css']
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

   constructor(private _facturierService : FacturierService,private router: Router) {}

/******************************************************************************************************/


  ngOnInit() {
    console.log("sde")
  }

  @ViewChild('modalsde') public modalsde:ModalDirective;

  detailfactursde(){
    this._facturierService.detailreglementsde(this.refclientsde).then(response =>{
      console.log(response) ;
      if(response==null || response.length==0){
         this.message=true;

      }else{
         this.etat=true;
         this.refFactureSDE=response[0].reference_facture;
        this.nomclient=response[0].nom;
         this.echeance=response[0].date_echeance;
         this.statuspayment=response[0].statuspayment;
         this.mntsde=response[0].montant;
      }
    });
  }

  showmodalsde(){
    console.log("show sde")
    this.modalsde.show();
    this.detailfactursde();
  }

  paimantsde(){
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'SDE','operateur':8,'operation':1, 'mntsde':this.mntsde, 'refclientsde':this.refclientsde, 'refFactureSDE':this.refFactureSDE}));

    this._facturierService.paimentsde(this.mntsde,this.refclientsde,this.refFactureSDE,'sde').then( response =>{
      console.log(response)
        this.hidemodalsde();
        this.dataImpression = {
          apiservice:'facturier',
          service:'paimentsde',
          infotransaction:{
            client:{
              transactionBBS: 'Id BBS',
              PAYMENT_TRANSACTION_NUMBER: response.PAYMENT_TRANSACTION_NUMBER,
              reference_client: response.reference_client,
              reference_facture: response.reference_facture,
              nom: response.nom,
              prenom: response.prenom,
              montant: response.montant,
              date_echeance: response.date_echeance,
              statuspayment: response.statuspayment,
              fees: response.fees,
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

