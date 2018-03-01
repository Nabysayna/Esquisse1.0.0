import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router';
import { Location }               from '@angular/common';
import {CashInService, CashOutService, AgentTopUpService, MyAccountService} from '../expresso/expressoservices';
import {CashIn, MyAccount, AgentTopUp, CashOut} from '../expresso/expressomodels';
import {ExpressocashService} from "../services/expressocash.service";


@Component({
  selector: 'app-expresso',
  templateUrl: './expresso.component.html',
  styleUrls: ['./expresso.component.css']
})
export class ExpressoComponent implements OnInit {
	 formvisible='';
    idclient:string;
    telephone:number;
    montant:number;
    passwordc:string;
    telephonec:number;
    montantd:number;
    idclientc:string;
    passwordco:string;
    tel:number;
    mnt:number;
    idc:string;
    mdp:string;
    idcl:string;
    pwd:string;

    cashIn:CashIn;
    cashOut:CashOut;
    agentTopUp:AgentTopUp;
    myAccount:MyAccount;


  constructor(
     private myAccountService:MyAccountService,
     private agentTopUpService:AgentTopUpService,
     private cashOutService: CashOutService,
     private cashInService: CashInService,
     private location: Location,
     private route:ActivatedRoute,
     private router: Router,
     private _ecService: ExpressocashService
  ) { }

  ngOnInit():void {
    this.route.params.subscribe( (params : Params) => {
      this.cashIn = this.cashInService.getCashIn(5);
    });


    this.route.params.subscribe( (params : Params) => {
      this.cashOut = this.cashOutService.getCashOut(5);
    });

     this.route.params.subscribe( (params : Params) => {
      this.agentTopUp = this.agentTopUpService.getAgentTopUp(5);
    });

       this.route.params.subscribe( (params : Params) => {
      this.myAccount = this.myAccountService.getMyAccount(5);
    });


  }

  validcashin(){
    this._ecService.cashin('12345678902','221703593438','100',"bank cash in",'N/A','N/A','TEST _BANK','C1B5669733701269F11862510C93E932','9A1D2C5FD5B16EBD0184E0DE8108EB814635CDDC509999A922C4A4A267A7FCFB172B44D1D05AC536989').then(expressocashwebserviceList => {
      console.log(expressocashwebserviceList);
    });
  }

  validcashout(){
    this._ecService.cashout('12345678902','221703593438','100',"bank cash out",'N/A','N/A','TEST _BANK','C1B5669733701269F11862510C93E932','9A1D2C5FD5B16EBD0184E0DE8108EB814635CDDC509999A922C4A4A267A7FCFB172B44D1D05AC536989').then(expressocashwebserviceList => {
      console.log(expressocashwebserviceList);
    });
  }

  validagenttopup(){
    this._ecService.topup('12345678902','221703593438','100',"bank top up",'N/A','N/A','TEST _BANK','C1B5669733701269F11862510C93E932','9A1D2C5FD5B16EBD0184E0DE8108EB814635CDDC509999A922C4A4A267A7FCFB172B44D1D05AC536989').then(expressocashwebserviceList => {
      console.log(expressocashwebserviceList);
    });
  }

  validmyaccount(){
    this._ecService.checkbalance('TEST _BANK','C1B5669733701269F11862510C93E932','9A1D2C5FD5B16EBD0184E0DE8108EB814635CDDC509999A922C4A4A267A7FCFB172B44D1D05AC536989').then(expressocashwebserviceList => {
      console.log(expressocashwebserviceList);
    });
  }

}
