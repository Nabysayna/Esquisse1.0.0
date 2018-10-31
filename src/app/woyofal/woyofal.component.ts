import { Component, OnInit,ViewChild,Input,Output,EventEmitter} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { ControleService } from '../services/controle.service';

@Component({
  selector: 'app-woyofal',
  templateUrl: './woyofal.component.html',
  styleUrls: ['./woyofal.component.css'],
})
export class WoyofalComponent implements OnInit {
  compteur:string;
  montant:number;
  adejaclick:boolean = false;
  telephone:string;
  telBool:boolean=false;

  constructor(private controle:ControleService) {}

  ngOnInit() { }

  @ViewChild('modalwoyofal') public modalwoyofal:ModalDirective;
  @Input() bbswoyofal:number=0;
  @Output() changementWoyofal=new EventEmitter();
  increment(){
    this.bbswoyofal++;
    this.changementWoyofal.emit(this.bbswoyofal);
  }

  showmodalwoyofal(){
    if(this.controle.verif_phone_number(this.telephone) && this.controle.verifCompteur(this.compteur.toString()) && this.controle.verifCompteur(this.montant.toString())){
      this.adejaclick = false;
      this.modalwoyofal.show();
    }else{
      if(!this.controle.verif_phone_number(this.telephone)){
        console.log("telephone bi bakhoule");
        this.telBool=true;
      }
      if(!this.controle.verifCompteur(this.compteur.toString())){
        console.log("comteur bi bakhoule");
      }
      if(!this.controle.verifCompteur(this.montant.toString())){
        console.log("montant bi bakhoule");
      }
    }
  }
  reinitialise(){
    this.telBool=false;
  }

  hidemodalwoyofal(){
    this.modalwoyofal.hide();
    this.compteur = undefined;
    this.montant = undefined;
    this.telephone=undefined;
  }
  validerwoyofal(){
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'WOYOFAL','operateur':8,'operation':3,'montant':this.montant.toString(), 'compteur':this.compteur,'telephone':this.telephone}));
    this.increment();
    this.hidemodalwoyofal();
  }

}
