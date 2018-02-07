import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Router, CanActivate } from '@angular/router';
import { OrangeMoneyService } from '../webServiceClients/Orangemoney/orangemoney.service' ;
import { PostCashWebService } from '../webServiceClients/PostCash/postcash.service';
import { TntServiceWeb, TntResponse } from '../webServiceClients/Tnt/Tnt.service';
import { TigoCashService } from '../webServiceClients/Tigocash/tigocash.service';
import {WizallWebService} from "../webServiceClients/Wizall/wizall.service";



@Component({
  selector: 'app-woyofal',
  templateUrl: './woyofal.component.html',
  styleUrls: ['./woyofal.component.css'],
  providers: [PostCashWebService, WizallWebService]
})
export class WoyofalComponent implements OnInit {
   etat:boolean=true;
   
   numerocompteur:number=undefined;
   montant:number=undefined;
  constructor(private router: Router,private omService : OrangeMoneyService,private tcService : TigoCashService,private postcashwebservice: PostCashWebService,private wizallwebservice: WizallWebService) {

  }

/******************************************************************************************************/


  ngOnInit() {

   
  }
  @ViewChild('modalwoyofal') public modalwoyofal:ModalDirective;
  showmodalwoyofal(){
   
   this.modalwoyofal.show();
  }
  validerachatwoyofal(){
    this.modalwoyofal.hide();
  }
    
  hidemodalwoyofal(){
   this.modalwoyofal.hide();
  }

/******************************************************************************************************/


  

}

