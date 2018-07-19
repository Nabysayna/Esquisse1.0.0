import { Component, OnInit,ViewChild,Input,Output,EventEmitter} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'app-woyofal',
  templateUrl: './woyofal.component.html',
  styleUrls: ['./woyofal.component.css'],
})
export class WoyofalComponent implements OnInit {
  compteur:string;
  montant:number;

  constructor() {}

  ngOnInit() { }

  @ViewChild('modalwoyofal') public modalwoyofal:ModalDirective;
  @Input() bbswoyofal:number=0;
  @Output() changementWoyofal=new EventEmitter();
  increment(){
    this.bbswoyofal++;
    this.changementWoyofal.emit(this.bbswoyofal);
  }

  showmodalwoyofal(){
    this.modalwoyofal.show();
  }

  hidemodalwoyofal(){
    this.modalwoyofal.hide();
    this.compteur = undefined;
    this.montant = undefined;
  }
  validerwoyofal(){
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'WOYOFAL','operateur':8,'operation':3,'montant':this.montant.toString(), 'compteur':this.compteur}));
    this.increment();
    this.hidemodalwoyofal();
  }

}

