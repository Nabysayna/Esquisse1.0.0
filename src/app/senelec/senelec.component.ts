import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Router, CanActivate } from '@angular/router';
import { OrangeMoneyService } from '../webServiceClients/Orangemoney/orangemoney.service' ;
import { PostCashWebService } from '../webServiceClients/PostCash/postcash.service';
import { TntServiceWeb, TntResponse } from '../webServiceClients/Tnt/Tnt.service';
import { TigoCashService } from '../webServiceClients/Tigocash/tigocash.service';
import {WizallWebService} from "../webServiceClients/Wizall/wizall.service";

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
  providers: [PostCashWebService, WizallWebService]
})
export class SenelecComponent implements OnInit {
   etat:boolean=true;
   mntsde:number;
   echeance:any;
   refclientsde:number;
   refFactureSDE:number;
   nomclient:string;
   statuspayment:boolean;
   detailfacturesenelec:any={errorCode:0,police:12545555,numeroFacture:156665,nom_client:'nom du client',montant:50000,dateEcheance:"12/3/2018"};
   facture_deja_paye:boolean = false;
   police:any;
   num_facture:any;
  constructor(private router: Router,private omService : OrangeMoneyService,private tcService : TigoCashService,private postcashwebservice: PostCashWebService,private wizallwebservice: WizallWebService) {

  }

/******************************************************************************************************/


  ngOnInit() {

   
  }
  validatedetailfacturesenelec(){
     // this.detailfacturepostcash = null;
     // console.log('Police et Numero Facture : '+this.police+'-'+this.num_facture);
      //this.loading = true ;
      this.postcashwebservice.detailfacturesenelec(this.police,this.num_facture.toString()).then(postcashwebserviceList => {
        //this.loading = false ;
       /* this.detailfacturepostcash = postcashwebserviceList;
        console.log(postcashwebserviceList);*/
      });
    }
@ViewChild('modalsenelec') public modalsenelec:ModalDirective;
/******************************************************************************************************/
   showmodalsenelec(){
     this.modalsenelec.show();
    /*this.postcashwebservice.detailfacturesenelec(this.police,this.num_facture.toString()).then(postcashwebserviceList => {
      //this.loading = false ;
      this.detailfacturepostcash = postcashwebserviceList;
      console.log(postcashwebserviceList);
    });*/
   }
   hidemodalsenelec(){
     this.modalsenelec.hide();
   }
   payersenelec(){}
  

}

