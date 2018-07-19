import { Component, OnInit,ViewChild,Input,Output,EventEmitter } from '@angular/core';
import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TigocashService } from '../services/tigocash.service';

@Component({
  selector: 'app-tigo-cash-component',
  templateUrl: './tigo-cash-component.component.html',
  styleUrls: ['./tigo-cash-component.component.css'],
  providers: [TigocashService]
})
export class TigoCashComponentComponent implements OnInit {

   telephoneBeneficiaire: any;
   telephoneExpediteur: any;
   telephone:number;
   montant: any;
   prenomExpediteur: string;
   prenomBeneficiaire: string;
   nomExpediteur: string;
   nomBeneficiaire: string;
   numeropiece: any;
   typepiece: any;
   prenom: string;
   nom: string;
   messagepayertransfert:boolean=false;
   donneepayertransfert:boolean=false;
   donneetransfert:string;
   reference:number;
   coderetrait:any;
   date:any;
   cni:any;
   numclient:any;
   mnt:any;
   @ViewChild('modaldepot') modaldepot: ModalDirective;
   @ViewChild('modalretrait') modalretrait: ModalDirective;
   @ViewChild('modalpaiment') modalpaiment: ModalDirective;
   @ViewChild('modalenvoi') modalenvoi: ModalDirective;
   @ViewChild('modalvendreizi') modalvendreizi: ModalDirective;
   @ViewChild('modalinscription') modalinscription: ModalDirective;

   constructor(private tcservice:TigocashService,) { }

  ngOnInit() {
  }
  /**********reinitialiser************/
  reinitialiser(){
   this.telephoneBeneficiaire=undefined;
   this.telephoneExpediteur=undefined;
   this.telephone=undefined;
   this.montant=undefined;
   this.prenomExpediteur=undefined;
   this.prenomBeneficiaire=undefined;
   this.nomExpediteur=undefined;
   this.nomBeneficiaire=undefined;
   this.numeropiece=undefined;
   this.typepiece=undefined;
   this.prenom=undefined;
   this.nom=undefined;
   this.donneepayertransfert=false;
   this.messagepayertransfert=false;
   this.donneetransfert=undefined;
   this.reference=undefined;
   this.date=undefined;
   this.coderetrait=undefined;
   this.mnt=undefined;
  }
  @Input() bbstc:number=0;
  @Output() changementTc=new EventEmitter();
  increment(){
    this.bbstc++;
    this.changementTc.emit(this.bbstc);
  }

  /***********************************/
  /********depot**********************/
      depot(){
         sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Tigo cash depot','operateur':3,'operation':1,'num':this.telephone,'montant':this.montant}));
        // console.log("anvant incremente");
         //this.increment();
         this.hidemodaldepot();
//         this.reinitialiser();
      }
  /***********************************/
  /********retrait**********************/
      retrait(){

         console.log({'nom':'Tigo cash retrait','operateur':3,'operation':2,'num':this.telephone,'montant':this.montant});
         sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Tigo cash retrait','operateur':3,'operation':2,'num':this.telephone,'montant':this.montant}));
         this.reinitialiser();
         this.hidemodalretrait();
      }
  /***********************************/
  /********retrait**********************/
  payerTransfer(){

    this.hidemodalpaiment();
    console.log({'nom':'Tigo cash payer un transfer','operateur':3,'operation':6,'coderetrait':this.coderetrait,'nomCient':this.nom,'prenomClient':this.prenom,'typepiece':this.typepiece,'numeropiece':this.numeropiece,'montant':this.mnt});
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Tigo cash payer un transfer','operateur':3,'operation':6,'coderetrait':this.coderetrait,'nomCient':this.nom,'prenomClient':this.prenom,'typepiece':this.typepiece,'numeropiece':this.numeropiece,'montant':this.mnt}));
    this.reinitialiser();
    return false;
 }
  /***********************************/
  /**********envoyer argent***********/
       envoiyerargent(){
          let data:any={'montant':'','prenomExpediteur':'','nomExpediteur':'','telephoneExpediteur':'','prenomBeneficiaire':'','nomBeneficiaire':'','telephoneBeneficiaire':''};
          data.montant=this.montant;
          data.prenomExpediteur=this.prenomExpediteur;
          data.nomExpediteur=this.nomExpediteur;
          data.telephoneExpediteur=this.telephoneExpediteur;
          data.prenomBeneficiaire=this.prenomBeneficiaire;
          data.nomBeneficiaire=this.nomBeneficiaire;
          data.telephoneBeneficiaire=this.telephoneBeneficiaire;
          sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Tigo cash envoi','operateur':3,'operation':4,data}));
          this.hidemodalenvoi();
          this.reinitialiser();
       }
  /***********************************/
  /*************izi*******************/
     izi(){

       console.log({'nom':'tigo cash izi','operateur':3,'operation':5,'num':this.telephone,'montant':this.montant});
       sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'tigo cash izi','operateur':3,'operation':5,'num':this.telephone,'montant':this.montant}));
       this.reinitialiser();
    this.hidemodalvendreizi();
     }

  /***********************************/
  /********inscription****************/
  inscription(){
   sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'tigo cash inscription','operateur':3,'operation':6,'prenom':this.prenom,'nomclient':this.nom,'telephone':this.telephone,'typepiece':this.typepiece,'numeropiece':this.numeropiece}));
   this.hidemodalinscription();
   this.reinitialiser();
  }
  /**********************************/
  /*******verif numero reference*****/
     verifnumeroreference(){
        let requet="3/"+this.reference;
        console.log(this.reference);
        this.tcservice.requerirControllerTC(requet).then(rep=>{
      if(rep.statut==200){
			   if(rep.body.trim()!=""){
			   this.donneepayertransfert=true;
			   this.messagepayertransfert=false;
			   this.hidemodalpaiment();
			   this.donneetransfert="modou 5000 fallou";
			}
			else{
			   this.donneepayertransfert=false;
			   this.messagepayertransfert=true;
			   this.hidemodalpaiment();
			   this.donneetransfert="";

			}
	    }
	    else{
	    }
   })

  }
  validerpayertansfert(){
      sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'tigo cash payer transfert','operateur':3,'operation':3,'reference':this.reference,'confirmation':'c'}));
     }
  /**********************************/
  /**********les modals***************/
	  showmodaldepot(){
     this.depot();
	   this.modaldepot.show();
	  }
	  hidemodaldepot(){
	   this.modaldepot.hide()
	  }
	  showmodalretrait(){
	   this.modalretrait.show();
	  }
	  hidemodalretrait(){
	   this.modalretrait.hide()
	  }
	  showmodalpaiment(){
	   this.modalpaiment.show();
	  }
	  hidemodalpaiment(){
	   this.modalpaiment.hide()
	  }
	  showmodalenvoi(){
	   this.modalenvoi.show();
	  }
	  hidemodalenvoi(){
	   this.modalenvoi.hide();
	  }
	  showmodalvendreizi(){
	   this.modalvendreizi.show();
	  }
	  hidemodalvendreizi(){
	   this.modalvendreizi.hide();
	  }
	  showmodalinscription(){
	   this.modalinscription.show();
	  }
	  hidemodalinscription(){
	   this.modalinscription.hide();
	  }
  /**********************************/
}
