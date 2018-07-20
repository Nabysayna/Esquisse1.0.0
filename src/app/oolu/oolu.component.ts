import { Component, OnInit,ViewChild, ElementRef,Input,Output,EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';


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
  errornumero:boolean;
  errormontant:boolean=false;
  errorcompte:boolean=false;
  adejaclick:boolean = false;


  /******************************************************************************************************/
  constructor(){}

  ngOnInit() {
   }
  @ViewChild('modaloolu') public modaloolu:ModalDirective;
  @Input() bbsoolu:number=0;
  @Output() changementOolu=new EventEmitter();
  increment(){
    this.bbsoolu++;
    this.changementOolu.emit(this.bbsoolu);
  }
  showmodaloolu(){
    this.adejaclick = false;
    if(this.telephone!="" && this.telephone!=undefined && this.montant!="" && this.montant!=undefined && this.compte!="" && this.compte!=undefined){
        let tab=this.telephone.split("");
		if(this.isNumber(this.telephone) && this.isNumber(this.montant) && parseInt(this.montant)>0 && tab.length==9 && tab[0]=="7" && (tab[1]=="7" || tab[1]=="8" || tab[1]=="0")){
		    this.modaloolu.show();
		}
		else{
		   if(!this.isNumber(this.telephone) || this.telephone==undefined || tab.length!=9 || tab[0]!="7" || (tab[1]!="7" && tab[1]!="8" && tab[1]!="0")){
		       this.errornumero=true;
		   }
		   if(!this.isNumber(this.montant) || parseInt(this.montant)<0 ){
		        this.errormontant=true;
		   }

		}
   }
   else{
         if(this.telephone=="" || this.telephone==undefined){
		       this.errornumero=true;
		   }
		   if(this.montant=="" || this.montant==undefined ){
		        this.errormontant=true;
		   }
		   if(this.compte=="" || this.compte==undefined){
		        this.errorcompte=true;
		   }
   }
  }
  hidemodaloolu(){
    this.modaloolu.hide();
  }
  reinitialiserbool(){
     this.errornumero=false;
     this.errormontant=false;
     this.errorcompte=false;
    }

  payeroolusolar(){
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'OOLU SOLAR','operateur':8,'operation':5,'telephone':this.telephone.toString(), 'compte':this.compte, 'montant':this.montant}));
    this.increment();
    this.montant=undefined;
    this.compte=undefined;
    this.telephone=undefined;
    this.hidemodaloolu();
  }
  isNumber(tel:string):boolean{
      let tab=tel.split("");
      for(let i=0;i<tab.length;i++){
         if(!this.ischiffre(tab[i])){
            return false;
         }
      }

        return true;
    }
    ischiffre(c:string):boolean{
      let tab=["0","1","2","3","4","5","6","7","8","9"];
      for(let j=0;j<tab.length;j++){
         if(tab[j].localeCompare(c)==0){
            return true;
         }
      }
      return false;
    }


}

