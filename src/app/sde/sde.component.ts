import { Component, OnInit,ViewChild,Input,Output,EventEmitter} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
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
  refClientSDE:string;
  message:boolean=false;
  detailfacturesde:any={errorCode:0,reference_client:"",reference_facture:"",client:'nom du client',montant:1,dateecheance:"12/3/2018",service:"wizall"};
  errorMessage : any ;
  adejaclick:boolean = false;


  constructor(private _facturierService : FacturierService) {}

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
    this._facturierService.detailreglementsde(this.refClientSDE).then(response =>{
      console.log(typeof response)
      if(response.errorCode==0){
        if(typeof response.response !== 'object') {
          this.etat1=true;
          this.detailfacturesde.errorCode = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
        }
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
        console.log("je suis la")
        this.etat1=true;
        this.detailfacturesde.errorCode = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
        this.modalsde.show();
      }

    }).catch(response => {
      console.log(response);
      if(response==-11){
        this.detailfacturesde.errorCode = "Opèration annulée. La requête n'est pas parvenue au serveur. Merci de contacter le service client."
      }
      else if(response==-12){
        this.detailfacturesde.errorCode = "Impossible de se connecter au serveur du partenaire. Merci de contacter le service client."
      }
      else {
        this.detailfacturesde.errorCode = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
      }
      this.etat1=true;
      this.modalsde.show();
    });
  }

  showmodalsde(){
    this.adejaclick = false;
    this.modalsde.show();
    this.detailfactursde();
  }

  paimantsde(){
    //console.log({'nom':'SDE','operateur':8,'operation':1, 'montant':this.detailfacturesde.montant, 'reference_client':this.detailfacturesde.reference_client, 'reference_facture':this.detailfacturesde.reference_facture,'service':this.detailfacturesde.service})
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'SDE','operateur':8,'operation':1, 'montant':this.detailfacturesde.montant, 'reference_client':this.detailfacturesde.reference_client, 'reference_facture':this.detailfacturesde.reference_facture,'service':this.detailfacturesde.service}));
    this.increment();
    this.hidemodalsde();
  }


  hidemodalsde(){
    this.modalsde.hide();
    this.refClientSDE = undefined;
  }

}

