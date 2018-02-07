import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Router, CanActivate } from '@angular/router';
import { OrangeMoneyService } from '../webServiceClients/Orangemoney/orangemoney.service' ;
import { PostCashWebService } from '../webServiceClients/PostCash/postcash.service';
import { TntServiceWeb, TntResponse } from '../webServiceClients/Tnt/Tnt.service';
import { TigoCashService } from '../webServiceClients/Tigocash/tigocash.service';
import {WizallWebService} from "../webServiceClients/Wizall/wizall.service";


@Component({
  selector: 'app-oolu',
  templateUrl: './oolu.component.html',
  styleUrls: ['./oolu.component.css'],
  providers: [PostCashWebService, WizallWebService]
})
export class OoluComponent implements OnInit {
  telephone:number;
  compte:number;
  montant:number;
  etatsuccess:boolean=false;
  etaterror:boolean=false;
/******************************************************************************************************/
//772632245 2000
  ngOnInit() { 
  }
  //@ViewChild('modaloolu') public modaloolu:ModalDirective;
  payeroolusolar(){
    this.compte=undefined;
    this.montant=undefined;
    this.telephone=undefined;
    this.etaterror=true;
  }
  /*hidemodaloolu(){
     this.modaloolu.show();
  }*/
  
}

