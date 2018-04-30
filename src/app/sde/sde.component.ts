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
   etat:boolean;
   message:boolean=false;
   mntSDE:any;
   echeance:any;
   refclientsde:number;
   refFactureSDE:number;
   nomclient:string;
   statuspayment:boolean;
   dataImpression:any;
   errorMessage : any ;

   constructor(private _facturierService : FacturierService,private router: Router) {}

/******************************************************************************************************/


  ngOnInit() {  }

  @ViewChild('modalsde') public modalsde:ModalDirective;

  detailfactursde(){
    this._facturierService.detailreglementsde(this.refclientsde).then(response =>{
      console.log(response) ;
      
      if(response.response == null ){
         this.message=true;
         this.etat = false ;
      }else{
         this.etat=true;
         this.refFactureSDE=response.response.reference_facture;
         this.nomclient=response.reponse.nom;
         this.echeance=response.response.date_echeance;
         this.statuspayment=response.response.statuspayment;
         this.mntSDE=response.response.montant;
      }
      console.log(response);
    });
  }
  
  showmodalsde(){
    this.modalsde.show();
    this.detailfactursde();
  }

  paimantsde(){

     this.hidemodalsde();
/*
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'SDE','operateur':8,'operation':1, 'mntsde':this.mntSDE, 'refclientsde':this.refclientsde, 'refFactureSDE':this.refFactureSDE}));
*/


    this._facturierService.paimentsde(this.mntSDE,this.refclientsde,this.refFactureSDE,'sde').then( response =>{
       response = JSON.parse(response) ;
       console.log(response) ;
      if( (response.PAYMENT_TRANSACTION_NUMBER != null) ){
        this.dataImpression = {
          apiservice:'wizall',
          service:'sde',
          infotransaction:{
            client:{
              transactionPostCash: response.PAYMENT_TRANSACTION_NUMBER,
              transactionBBS: 'x-x-x-x',
               reference_client: this.refclientsde,
               reference_facture: this.refFactureSDE,
               date_echeance: response.date_echeance,
               montant: this.mntSDE,
            },

          },
        }
        sessionStorage.setItem('dataImpression', JSON.stringify(this.dataImpression));
        this.router.navigate(['accueil/impression']);
      }else
          if (response.error != null){
            this.message = true ;
            this.errorMessage = response.error ;
          }
          else{
            this.message = true ;
            this.errorMessage = response.response ;
          }
    });

  }


  hidemodalsde(){
   this.modalsde.hide();
  }

}

