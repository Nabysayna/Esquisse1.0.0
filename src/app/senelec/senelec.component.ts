import { Component, OnInit,ViewChild } from '@angular/core';
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

  message:boolean=false;
  errorMessage : any ;

  service:string;
  detailfacturesenelec:any={errorCode:0,police:12545555,numeroFacture:156665,nom_client:'nom du client',montant:50000,dateecheance:"12/3/2018"};
  police:string;
  num_facture:string;
  dataImpression:any;
  constructor(private router: Router, private _facturierService : FacturierService) { }

  /******************************************************************************************************/


  ngOnInit() {


  }

  @ViewChild('modalsenelec') public modalsenelec:ModalDirective;
  /******************************************************************************************************/
  showmodalsenelec(){
    this.detailfactsenelec();
  }
  hidemodalsenelec(){
    this.modalsenelec.hide();
    this.police = undefined;
    this.num_facture = undefined;
  }
  detailfactsenelec(){
    this.detailfacturesenelec={errorCode:0,police:5,numeroFacture:5,nomclient:'nom du client',montant:1,dateecheance:"12/3/2018",service:"12/3/2018"};
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
  }

  validerpaimentsenelec(){
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Facturier senelec','operateur':8,'operation':4,'montant':this.detailfacturesenelec.montant,'police':this.police,'num_facture':this.num_facture,'service':this.detailfacturesenelec.service}));
    this.hidemodalsenelec();
  }


}

