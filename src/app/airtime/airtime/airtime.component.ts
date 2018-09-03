import { Component, OnInit,ViewChild,Input, Output, EventEmitter} from '@angular/core';
import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AirtimeService } from '../../services/airtime.service';

@Component({
  selector: 'app-airtime',
  templateUrl: './airtime.component.html',
  styleUrls: ['./airtime.component.css']
})
export class AirtimeComponent implements OnInit {
  numero:string;
  montant:string;
  num_bool:boolean=false;
  montant_bool:boolean=false;

  constructor(private airtimeService:AirtimeService) { }

  ngOnInit() {
  }
  @ViewChild('modalairtime') public modalairtime:ModalDirective;
   @Input() bbs:number=0;
   @Output() changementAirtime=new EventEmitter();
  increment() {
    this.bbs++;
    console.log("si incremente bi"+this.bbs);
    this.changementAirtime.emit(this.bbs);
  }

  decrement() {
    this.bbs--;
    this.changementAirtime.emit(this.bbs);
  }
  showModalAirtime(){
	  let tab=this.numero.split("");
	  let verif_number_bool=(tab[0]=="7" && (tab[1]=="7" || tab[1]=="8" || tab[1]=="6" || tab[1]=="0"));
	  let verif_montant_bool=(this.verif_montant(this.montant) && parseInt(this.montant)>=100);
	  
	  if(this.verif_phone_number(this.numero) && verif_montant_bool){
			this.modalairtime.show();
		}else{
			if(!verif_number_bool || !this.verif_phone_number(this.numero)){
				this.num_bool=true;
			}
			if(!verif_montant_bool){
				this.montant_bool=true;
			}
		
		}
  }
  hideModalAirtime(){
    
		this.modalairtime.hide();
		this.numero=undefined;
		this.montant=undefined;
	
  }
  validerVenteCredit(){
	
	let tab=this.numero.split("");
	let service="";
	switch(tab[1]){
		case "7":{
					service="ceddo";
					break;
		          }
		case "8":{
					service="ceddo";
					break;
		         }
		case "0":{
					service="yakalma";
					break;
		         }
		case "6":{
					service="izi";
					break;
		         }
		default:break;
	}
	sessionStorage.setItem('curentProcess',JSON.stringify({'nom':service,'operateur':9,'operation':1,'montant':this.montant,'numero':this.numero}));
	this.increment();
	this.hideModalAirtime();
	/*this.airtimeService.Airtime().then(resp =>{
	     console.log(resp);
	});*/
  }
  isNumber(num:string):boolean{
    let tab=["0","1","2","3","4","5","6","7","8","9"];
    for(let i=0;i<tab.length;i++){
      if(num===tab[i]){
        return true;
      }
    }
    return false;
  }

  verif_phone_number(number:string):boolean{
    let numero=number.split("");
    console.log(numero.length);
    if(numero.length!=parseInt("9")){
      return false;
    }
    for(let i=0;i<numero.length;i++){
      if(!this.isNumber(numero[i])){
        return false;
      }
    }
    return true;
  }

  verif_montant(mnt:string):boolean{
    if(parseInt(mnt)>=1){
      return true;
    }else{
      return false;
    }
  }
  reinitialiser(){
	this.num_bool=false;
	this.montant_bool=false;
  }
}
