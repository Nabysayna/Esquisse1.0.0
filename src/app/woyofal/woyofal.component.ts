import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'app-woyofal',
  templateUrl: './woyofal.component.html',
  styleUrls: ['./woyofal.component.css'],
})
export class WoyofalComponent implements OnInit {
  compteur:string;
  montant:number;
  adejaclick:boolean = false;

  constructor() {}

  ngOnInit() { }

  @ViewChild('modalwoyofal') public modalwoyofal:ModalDirective;

  showmodalwoyofal(){
    this.adejaclick = false;
    this.modalwoyofal.show();
  }

  hidemodalwoyofal(){
    this.modalwoyofal.hide();
    this.compteur = undefined;
    this.montant = undefined;
  }
  validerwoyofal(){
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'WOYOFAL','operateur':8,'operation':3,'montant':this.montant.toString(), 'compteur':this.compteur}));
    this.hidemodalwoyofal();
  }

}
