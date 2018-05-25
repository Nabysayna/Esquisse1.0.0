import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Router, CanActivate } from '@angular/router';
import {FacturierService} from "../services/facturier.service";


@Component({
  selector: 'app-sde',
  templateUrl: './sde.component.html',
  styleUrls: ['./sde.component.css']
})
export class SdeComponent implements OnInit {
  etat1:boolean=false;
  etat2:boolean=false;
  etat3:boolean=false;
  etat4:boolean=false;
  refClientSDE:any;
  message:boolean=false;
  detailfacturesde:any={errorCode:0,reference_client:"",reference_facture:"",client:'nom du client',montant:1,dateecheance:"12/3/2018",service:"wizall"};
  errorMessage : any ;

   constructor(private _facturierService : FacturierService,private router: Router) {}

/******************************************************************************************************/


  ngOnInit() {
    console.log("sde")
  }

  @ViewChild('modalsde') public modalsde:ModalDirective;

  detailfactursde(){
    this.detailfacturesde={errorCode:0,reference_client:"",reference_facture:"",client:'nom du client',montant:1,echeance:"12/3/2018",service:"wizall"};
    this.etat1=false;
    this.etat2=false;
    this.etat3=false;
    this.etat4=false;
    this._facturierService.detailreglementsde(this.refClientSDE).then(response =>{

      response = {
        errorCode: 0,
        typeservice: "wizall",
        response: [{
          reference_client: "108000039700",
          reference_facture: "000039701061701",
          nom: "BBS",
          prenom: "TEST",
          montant: "548",
          date_echeance: "10/07/2017",
          statuspayment: false
        }],
      }

      if(response.errorCode==0){
        if(typeof response.response !== 'object') this.etat4=true;
        else if(response.response.length==0) this.etat3=true;
        else{
          let une = response.response[0];
          this.etat2=true;
          this.detailfacturesde.service = response.typeservice;
          this.detailfacturesde.reference_client = une.reference_client;
          this.detailfacturesde.reference_facture=une.reference_facture;
          this.detailfacturesde.client=une.prenom+" "+une.nom;
          this.detailfacturesde.echeance=une.date_echeance;
          this.detailfacturesde.montant=une.montant;
        }
        this.modalsde.show();
      }else{
        this.etat1=true;
        this.detailfacturesde.errorCode=response.errorMessage;
        this.modalsde.show();
      }

    });
  }

  showmodalsde(){
    this.modalsde.show();
    this.detailfactursde();
  }

  paimantsde(){
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'SDE','operateur':8,'operation':1, 'montant':this.detailfacturesde.montant, 'reference_client':this.detailfacturesde.reference_client, 'reference_facture':this.detailfacturesde.reference_facture,'service':this.detailfacturesde.service}));
    this.hidemodalsde();
  }


  hidemodalsde(){
    this.modalsde.hide();
    this.refClientSDE = undefined;
    //this.detailfacturesde = null;
  }

}

