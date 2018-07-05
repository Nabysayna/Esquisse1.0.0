import { Component, OnInit,ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';
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
  adejaclick:boolean = false;


  constructor(private router: Router, private _facturierService : FacturierService) { }

  @ViewChild('modalrapido') public modalrapido:ModalDirective;

  showmodalrapido(){
    this.adejaclick = false;
    this.modalrapido.show();
  }

  hidemodalrapido(){
    this.modalrapido.hide();
    this.montant=undefined;
    this.badge=undefined;
    this.numclient=undefined;
  }

  validerrapido(){
    this._facturierService.validerrapido(this.numclient+"",this.montant+"",this.badge+"").then(response =>{
      console.log(response) ;
      if(typeof response !== 'object') {
        this.message = true ;
        this.hidemodalrapido();
        this.errorMessage = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
      }
      else if( (response.timestamp != null) ){
        this.dataImpression = {
          apiservice:'facturier',
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
        this.hidemodalrapido();
      }else {
        if (response.error != null){
          this.message = true ;
          this.errorMessage = response.error ;
        }
        else{
          this.message = true ;
          this.errorMessage = response.response ;
        }
        this.hidemodalrapido();
      }

    }).catch(resp => {
      console.log(resp);
      if(resp==-11){
        this.errorMessage = "Opèration annulée. La requête n'est pas parvenue au serveur. Merci de contacter le service client."
      }
      else if(resp==-12){
        this.errorMessage = "Impossible de se connecter au serveur du partenaire. Merci de contacter le service client."
      }
      else {
        this.errorMessage = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
      }
      this.message = true ;
      this.hidemodalrapido();
    });
  }


}

