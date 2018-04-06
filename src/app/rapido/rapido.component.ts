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
  messagesucce:boolean=false;
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
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'RAPIDO','operateur':8,'operation':2,'numclient':this.numclient,'montant':this.montant, 'badge':this.badge}));
  }

}

