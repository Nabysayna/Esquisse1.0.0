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
  etat1:boolean=false;
  etat2:boolean=false;
  etat3:boolean=false;
  etat4:boolean=false;
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


  ngOnInit() {
    console.log("sde")
  }

  @ViewChild('modalsde') public modalsde:ModalDirective;

  detailfactursde(){
    this.refFactureSDE=undefined;
    this.nomclient=undefined;
    this.echeance=undefined;
    this.statuspayment=undefined;
    this.mntSDE=undefined
    this.etat1=false;
    this.etat2=false;
    this.etat3=false;
    this.etat4=false;
    this._facturierService.detailreglementsde(this.refclientsde).then(response =>{
      console.log(response) ;

      if(response.errorCode==0){
        if(typeof response.response !== 'object') this.etat4=true;
        else if(response.response.length==0) this.etat3=true;
        else{
          this.etat2=true;
          this.refFactureSDE=response.response.reference_facture;
          this.nomclient=response.reponse.nom;
          this.echeance=response.response.date_echeance;
          this.statuspayment=response.response.statuspayment;
          this.mntSDE=response.response.montant;
        }
        this.modalsde.show();
      }else{
        this.etat1=true;
        this.message=response.errorMessage;
        this.modalsde.show();
      }

    });
  }

  showmodalsde(){
    this.modalsde.show();
    this.detailfactursde();
  }

  paimantsde(){
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'SDE','operateur':8,'operation':1, 'mntsde':this.mntSDE, 'refclientsde':this.refclientsde, 'refFactureSDE':this.refFactureSDE}));
    this.hidemodalsde();
  }


  hidemodalsde(){
   this.modalsde.hide();
    this.refclientsde = undefined
  }

}

