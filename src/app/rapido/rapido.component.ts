import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import {FacturierService} from "../services/facturier.service";


@Component({
  selector: 'app-rapido',
  templateUrl: './rapido.component.html',
  styleUrls: ['./rapido.component.css']
})
export class RapidoComponent implements OnInit {

  ngOnInit(){}

  numclient:string;
  badge:string;
  montant:string;
  message:boolean;
  errorMessage : any ;
  dataImpression:any;


  constructor(private router: Router, private _facturierService : FacturierService) { }

  @ViewChild('modalrapido') public modalrapido:ModalDirective;

  showmodalrapido(){
    this.modalrapido.show();
  }

  hidemodalrapido(){
   this.modalrapido.hide();
   this.montant=undefined;
   this.badge=undefined;
   this.numclient=undefined;
  }

  validerrapido(){
    this.modalrapido.hide();
    this._facturierService.validerrapido(this.numclient,this.montant,this.badge).then(response =>{
       response = JSON.parse(response) ;
       console.log(response) ;
      if( (response.timestamp != null) ){
        this.dataImpression = {
          apiservice:'wizall',
          service:'rapido',
          infotransaction:{
            client:{
              transactionBBS: 'x-x-x-x',
               badge: this.badge,
               numclient: this.numclient,
               montant: this.montant,
               transactionID:response.transactionid
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


}

