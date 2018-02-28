import { Component, OnInit,ViewChild } from '@angular/core';
import { PostCashWebService } from '../webServiceClients/PostCash/postcash.service';
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

  ngOnInit() { }

  payeroolusolar(){
    this.FacturierServiceWeb.payeroolusolar("00221"+this.telephone.toString(),this.compte,this.montant).then(response =>{
      console.log(response);
    });
  }

}

