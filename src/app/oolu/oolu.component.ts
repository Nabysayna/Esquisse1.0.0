import { Component, OnInit,ViewChild } from '@angular/core';
import {FacturierService} from "../services/facturier.service";


@Component({
  selector: 'app-oolu',
  templateUrl: './oolu.component.html',
  styleUrls: ['./oolu.component.css']
})
export class OoluComponent implements OnInit {
  telephone:string;
  compte:string;
  montant:string;
  etatsuccess:boolean=false;
  etaterror:boolean=false;

  /******************************************************************************************************/
  //772632245 2000
  constructor(private _facturierService : FacturierService){}

  ngOnInit() { }

  payeroolusolar(){
    this._facturierService.payeroolusolar("00221"+this.telephone.toString(),this.compte,this.montant).then(response =>{
      console.log(response);
      this.montant=undefined;
      this.compte=undefined;
      this.telephone=undefined;
    });
  }

}

