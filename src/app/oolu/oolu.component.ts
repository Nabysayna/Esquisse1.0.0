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
  selector: 'app-oolu',
  templateUrl: './oolu.component.html',
  styleUrls: ['./oolu.component.css'],
  providers: [PostCashWebService, WizallWebService]
})
export class OoluComponent implements OnInit {
  telephone:string;
  compte:string;
  montant:string;
  etatsuccess:boolean=false;
  etaterror:boolean=false;
/******************************************************************************************************/
//772632245 2000
constructor(private FacturierServiceWeb:FacturierServiceWeb){}
  ngOnInit() { 
  }
  //@ViewChild('modaloolu') public modaloolu:ModalDirective;
  payeroolusolar(){
    this.FacturierServiceWeb.payeroolusolar("00221"+this.telephone.toString(),this.compte,this.montant).then(response =>{
      console.log(response);
      //let rep=JSON.parse(response); 
     /* if(rep.errorCode==0){
        this.compte=undefined;
        this.montant=undefined;
        this.telephone=undefined;
        this.etaterror=true;
       }
       if(rep.errorCode==1){
        this.compte=undefined;
        this.montant=undefined;
        this.telephone=undefined;
        this.etatsuccess=true;
       }*/
       
       //00382079580
       //772220594
    });
  }
  /*hidemodaloolu(){
     this.modaloolu.show();
  }*/
  
}

