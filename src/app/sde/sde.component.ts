import { Component, OnInit,ViewChild,Input,Output,EventEmitter} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import {FacturierService} from "../services/facturier.service";
import { ControleService } from "../services/controle.service";


@Component({
  selector: 'app-sde',
  templateUrl: './sde.component.html',
  styleUrls: ['./sde.component.css']
})
export class SdeComponent implements OnInit {
  etat1:boolean=false;
  etat2:boolean=false;
  etat3:boolean=false;
  refClientSDE:string;
  message:boolean=false;
  detailfacturesde:any={errorCode:0,reference_client:"",reference_facture:"",client:'nom du client',montant:1,dateecheance:"12/3/2018",service:"wizall"};
  errorMessage : any ;
  adejaclick:boolean = false;
  numeroFacture:string;
  numeroTelephone:string;
  waiting:boolean=false;
  refBool:boolean=false;
  numFactBool:boolean=false;
  telBool:boolean=false;

  constructor(private _facturierService : FacturierService,private controle: ControleService) {}

  /******************************************************************************************************/


  ngOnInit() {
    console.log("sde")
  }
  @Input() bbssde:number=0;
  @Output() changementSde=new EventEmitter();
  increment(){
    this.bbssde++;
    this.changementSde.emit(this.bbssde);
  }

  @ViewChild('modalsde') public modalsde:ModalDirective;

  detailfactursde(){
    this.detailfacturesde={errorCode:0,reference_client:"",reference_facture:"",client:'nom du client',montant:1,echeance:"12/3/2018",service:"wizall"};
    this.etat1=false;
    this.etat2=false;
    this.etat3=false;
    this.waiting=true;
    this._facturierService.detailreglementsde(this.refClientSDE,this.numeroTelephone,this.numeroFacture).then(response =>{
      // console.log(typeof response);
      // console.log(response);
	   console.log("fii la wara bakhe");
	   if(response.status==200){
			setTimeout(()=>{
				this._facturierService.getReponse(response["_body"]).then(rep =>{
				console.log(rep);
					if(rep["_body"].trim()!="no"){
					   this.handlerSdeResponse(rep["_body"],0);
					}else{
						let timer=setInterval(()=>{
							this._facturierService.getReponse(response["_body"]).then(rep1 =>{
							     this.handlerSdeResponse(rep1["_body"],timer);
							});
						},10000);
					}
				});
			},5000);
	  }
      
    }).catch(response => {
      console.log(response);
      console.log("fii la wara bakhe");
      if(response==-11){
        this.detailfacturesde.errorCode = "Opèration annulée. La requête n'est pas parvenue au serveur. Merci de contacter le service client."
      }
      else if(response==-12){
        this.detailfacturesde.errorCode = "Impossible de se connecter au serveur du partenaire. Merci de contacter le service client."
      }
      else {
        this.detailfacturesde.errorCode = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
      }
      console.log("fii la wara bakhe");
      this.etat1=true;
      this.modalsde.show();
    });
  }
  totalFacture(montant:any){
    return parseInt(montant)+500;
  }
  handlerSdeResponse(reponse:string,timer:number){
    let message=reponse.trim();
	if(message!="no"){
		if(message.search("#")!=-1){
		    this.waiting=false;
			this.etat2=true;
			let data=message.split("#");
			this.detailfacturesde.reference_facture=data[0];
			this.detailfacturesde.reference_client=data[1];
			this.detailfacturesde.montant=data[2];
			this.detailfacturesde.dateecheance=data[3];
			clearInterval(timer);
		 }else{
			this.etat1=true;
			switch(message){
				//echec de webdriverwait(absence input)
				//console.log("si biir switch bi");
				case "400":{
				    this.waiting=false;
					this.detailfacturesde.errorCode = "Votre requête n'a pas pu être traitée correctement. Veulliez reessayer plus tard.";
					console.log("nii la beugué");
					clearInterval(timer);
					break;
				}
				case "600":{
				    this.waiting=false;
					this.detailfacturesde.errorCode = "Numero facture ou reference incorrect";
					clearInterval(timer);
					break;	
				}
				case "700":{
				    this.waiting=false;
					this.detailfacturesde.errorCode = "Facture deja payée";
					clearInterval(timer);
					break;
				}
				default:{
				    this.waiting=false;
					this.detailfacturesde.errorCode = "Votre requête n'a pas pu être traitée correctement. Veulliez reessayer plus tard";
					clearInterval(timer);
					console.log("si defaul bi");
					break;
				}
			}
		}
	}
  }

  showmodalsde(){
   if(this.verifData()){
		this.adejaclick = false;
		this.modalsde.show();
		this.detailfactursde();
    }
  }
  verifData(){
    if(this.refClientSDE!=undefined && this.refClientSDE!="" && this.numeroFacture!=undefined && this.numeroFacture!="" && this.numeroTelephone!=undefined && this.numeroTelephone!=""){
		if(this.controle.verifRefClientSde(this.refClientSDE) && this.controle.verifNumeroFactureSde(this.numeroFacture) && this.controle.verif_phone_number(this.numeroTelephone)){
			return true;
		}else{
			if(!this.controle.verifRefClientSde(this.refClientSDE)){
				this.refBool=true;
				return false;
			}else{
				if(!this.controle.verifNumeroFactureSde(this.numeroFacture)){
				    this.numFactBool=true;
					return false;
				}else{
				    this.telBool=true;
					return false;
				}
			}
		}
	 }
  }
  reinitialiseBool(){
	this.telBool=false;
	this.refBool=false;
	this.numFactBool=false;
  }
  paimantsde(){
    //console.log({'nom':'SDE','operateur':8,'operation':1, 'montant':this.detailfacturesde.montant, 'reference_client':this.detailfacturesde.reference_client, 'reference_facture':this.detailfacturesde.reference_facture,'service':this.detailfacturesde.service})
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'SDE','operateur':8,'operation':1, 'montant':this.detailfacturesde.montant, 'reference_client':this.detailfacturesde.reference_client, 'reference_facture':this.detailfacturesde.reference_facture,'service':this.detailfacturesde.service,telephone:this.numeroTelephone,echeance:this.detailfacturesde.dateecheance}));
    this.increment();
    this.hidemodalsde();
  }


  hidemodalsde(){
    this.modalsde.hide();
    this.refClientSDE = undefined;
    this.numeroFacture=undefined;
    this.numeroTelephone=undefined;
  }

}

