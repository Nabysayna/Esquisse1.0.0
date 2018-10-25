import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Router, CanActivate } from '@angular/router';
import {FacturierService} from "../services/facturier.service";


@Component({
  selector: 'app-senelec',
  templateUrl: './senelec.component.html',
  styleUrls: ['./senelec.component.css']
})
export class SenelecComponent implements OnInit {
  etat1:boolean=false;
  etat2:boolean=false;
  etat3:boolean=false;
  adejaclick:boolean = false;


  message:boolean=false;
  errorMessage : any ;

  service:string;
  detailfacturesenelec:any={errorCode:0,police:"125455",numeroFacture:"156665",nom_client:'nom du client',montant:50000,dateecheance:"12/3/2018"};
  police:string;
  num_facture:string;
  dataImpression:any;
  telephone:string;
  loading:boolean=false;
  constructor(private _facturierService : FacturierService) { }

  /******************************************************************************************************/


  ngOnInit() {


  }

  @ViewChild('modalsenelec') public modalsenelec:ModalDirective;
  @Input() bbssenelec:number=0;
  @Output() changementSenelec=new EventEmitter();
  increment(){
    this.bbssenelec++;
    this.changementSenelec.emit(this.bbssenelec);
  }
  /******************************************************************************************************/
  showmodalsenelec(){
    this.adejaclick = false;
    this.detailfactsenelec();
    this.loading=true;
  }
  hidemodalsenelec(){
    this.modalsenelec.hide();
    this.police = undefined;
    this.num_facture = undefined;
    this.loading=false;
    this.etat2=false;
    this.detailfacturesenelec.service = "senelec";
    this.detailfacturesenelec.police="";
    this.detailfacturesenelec.numeroFacture="";
    this.detailfacturesenelec.montant="";
    this.detailfacturesenelec.dateecheance="";
  }
 /* detailfactsenelec(){
    this.detailfacturesenelec={errorCode:0,police:"5",numeroFacture:"5",nomclient:'nom du client',montant:1,dateecheance:"12/3/2018",service:"12/3/2018"};
    this.etat1=false;
    this.etat2=false;
    this.etat3=false;
    this._facturierService.detailfacturesenelec(this.police,this.num_facture).then(resp =>{
      console.log(resp);
      if(resp.errorCode==0){
        if(typeof resp.response !== 'object') {
          this.etat1=true;
          this.detailfacturesenelec.errorCode = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
        }
        else if(resp.response.length==0) this.etat3=true;
        else{
          this.etat2=true;
          this.detailfacturesenelec.service = resp.typeservice;
          this.detailfacturesenelec.police=resp.response[0].police;
          this.detailfacturesenelec.numeroFacture=resp.response[0].numfacture;
          this.detailfacturesenelec.nomclient=resp.response[0].client;
          this.detailfacturesenelec.montant=resp.response[0].montant;
          this.detailfacturesenelec.dateecheance=resp.response[0].dateecheance;
        }
        this.modalsenelec.show();
      }else{
        this.etat1=true;
        this.detailfacturesenelec.errorCode = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
        this.modalsenelec.show();
      }
    }).catch(resp => {
      console.log(resp);
      if(resp==-11){
        this.detailfacturesenelec.errorCode = "Opèration annulée. La requête n'est pas parvenue au serveur. Merci de contacter le service client."
      }
      else if(resp==-12){
        this.detailfacturesenelec.errorCode = "Impossible de se connecter au serveur du partenaire. Merci de contacter le service client."
      }
      else {
        this.detailfacturesenelec.errorCode = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
      }
      this.etat1=true;
      this.modalsenelec.show();
    });
  }*/
  detailfactsenelec(){
    console.log("youpi");
    this._facturierService.detailfacturesenelec(this.police,this.num_facture,this.telephone).then(reponse =>{
		console.log(reponse);
		let tontou=reponse["_body"].trim();
		setTimeout(()=>{
			this._facturierService.getReponse(tontou).then(rep => {
			   console.log(rep);
			   let Tontou=rep["_body"].trim();
			   if(Tontou!="no"){
					this.handlerSenelecResponse(Tontou,0);
			   }else{
          let nb=0;
					let ident=setInterval(()=>{
            if(nb<10){
                nb++;
                this._facturierService.getReponse(tontou).then(rep1=>{
                this.handlerSenelecResponse(rep1["_body"].trim(),ident);
              });
           }else{
             this._facturierService.annulation(tontou).then(rep =>{
                let reponse=rep["_body"].trim();
                if(reponse=="ko"){
                  this.detailfacturesenelec.errorCode="Votre requête n'a pas pu être traitée correctement. Veulliez reessayer plus tard.";
                  this.etat1=true;
                  clearInterval(ident);
                  this.loading=false;
                }else{
                  this.loading=false;
                  clearInterval(ident);
                }

             });
           }
					},10000);
			   }
			});
		},30000);
		this.modalsenelec.show();
    });
  }
  totalFacture(){
	return parseInt(this.detailfacturesenelec.montant)+500;
  }
  handlerSenelecResponse(tontou,id){
	 if(tontou!="no"){
		if(tontou.search("#")!=-1){
			let data=tontou.split("#");
			this.etat2=true;
			this.loading=false;
			this.detailfacturesenelec.service = "senelec";
			this.detailfacturesenelec.police=data[0];
			this.detailfacturesenelec.numeroFacture=data[1];
			//this.detailfacturesenelec.nomclient=resp.response[0].client;
			this.detailfacturesenelec.montant=data[2];
			this.detailfacturesenelec.dateecheance=data[3];
			if(parseInt(id)!=0){
					  clearInterval(id);
			}
		   
		}else{
			this.etat2=true;
			switch(parseInt(tontou)){
				case 400:{
				  this.loading=false;
					this.detailfacturesenelec.errorCode="Votre requête n'a pas pu être traitée correctement. Veulliez reessayer plus tard.";
					if(parseInt(id)!=0){
					  clearInterval(id);
					}
					break;
				}
				case 600:{
				    this.loading=false;
					this.detailfacturesenelec.errorCode="Numero facture ou reference incorrect";
					if(parseInt(id)!=0){
					  clearInterval(id);
					}
					break;
				}
				case 700:{
				    this.loading=false;
					this.detailfacturesenelec.errorCode = "Facture deja payée";
					if(parseInt(id)!=0){
					  clearInterval(id);
					}
					break;
				}
				default:{
					break;
				}
			
			}
		}
	  }
	
  }

  validerpaimentsenelec(){
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Facturier senelec','operateur':8,'operation':4,'montant':this.detailfacturesenelec.montant,'police':this.police,'num_facture':this.num_facture,'service':this.detailfacturesenelec.service,'telephone':this.telephone,'echeance':this.detailfacturesenelec.dateecheance}));
    this.increment();
    this.hidemodalsenelec();
  }


}

