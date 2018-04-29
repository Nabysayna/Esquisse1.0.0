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

   constructor(private _facturierService : FacturierService,private router: Router) {}

/******************************************************************************************************/


  ngOnInit() {  }

  @ViewChild('modalsde') public modalsde:ModalDirective;

  detailfactursde(){
    this._facturierService.detailreglementsde(this.refclientsde).then(response =>{
      console.log(response) ;
      
      if(response.response.montant==null || response.response.montant== undefined){
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

    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'SDE','operateur':8,'operation':1, 'mntsde':this.mntSDE, 'refclientsde':this.refclientsde, 'refFactureSDE':this.refFactureSDE}));


/*
    this._facturierService.paimentsde(this.mntsde,this.refclientsde,this.refFactureSDE,'sde').then( response =>{
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
*/

  }


  hidemodalsde(){
   this.modalsde.hide();
  }

}

