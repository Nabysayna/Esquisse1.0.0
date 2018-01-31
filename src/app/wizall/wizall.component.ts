import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import {WizallWebService} from "../webServiceClients/Wizall/wizall.service";

@Component({
  selector: 'app-wizall',
  templateUrl: './wizall.component.html',
  styleUrls: ['./wizall.component.css']
})
export class WizallComponent implements OnInit {

   mnt : string;
   mntSDE : string ;
   mntSENELEC : string;
   numclient : string;
   refclientsde : string ;
   refFactureSDE : string  ;
   numpolice : string ;
   numFactureSenelec :string;
   echeance : string ;
   refclient : string ;
   nomclient : string ;
   statuspayment : boolean ;

  constructor(private wizallwebservice: WizallWebService) {}

  ngOnInit() {}

  reinitialise(){
   this.mnt=undefined;
   this.numclient=undefined;
  }



  @ViewChild('modaldepot') public modaldepot:ModalDirective;
  @ViewChild('modalretrait') public modalretrait:ModalDirective;
  @ViewChild('modalsde') public modalsde:ModalDirective;
  @ViewChild('modalsenelec') public modalsenelec:ModalDirective;

    public depotmodal(){
       this.modaldepot.show();
    }
    public retirermodal(){
       this.modalretrait.show();
    }

    fermermodaldepot(){
      this.modaldepot.hide();
    }

    fermermodalretrait(){
      this.modalretrait.hide();
    }

    public sdemodal(){
      this.wizallwebservice.intouchRecupereFactureSde( Number(this.refclientsde) ).then( response =>{
       this.mntSDE = response[0].montant ;
       this.refclient = response[0].reference_client ;
       this.echeance = response[0].date_echeance ;
       this.numFactureSenelec = response[0].reference_facture ;
       this.statuspayment = response[0].statuspayment ;
       this.modalsde.show();
      });
    }

    public senelecmodal(){       
      this.wizallwebservice.intouchRecupereFactureSenelec(this.numpolice.toString()).then( response =>{
       this.mntSENELEC = response[0].montant ;
       this.refclient = response[0].client;
       this.echeance = response[0].dateecheance ;
       this.numpolice = response[0].police ;
       this.numFactureSenelec = response[0].numfacture ;
       this.statuspayment = response[0].statuspayment ;
       this.modalsenelec.show() ;
      });
    }

    fermersdemodal(){
      this.modalsde.hide();
    }

    fermersenelecmodal(){
      this.modalsenelec.hide();
    }

    deposer(){
      this.fermermodaldepot() ;
      sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wizall depot','operateur':6,'operation':1,'montant':this.mnt,'num':this.numclient}));
    }

    retirer(){
      this.fermermodalretrait() ;
      sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wizall retrait','operateur':6,'operation':2,'montant':this.mnt,'num':this.numclient}));
    }

    payerSDE(){
      this.fermersdemodal() ;
      sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wizall SDE','operateur':6,'operation':3,'montant':this.mntSDE,'refclient':this.refclientsde,'refFacture':this.refFactureSDE}));
    }

    payerSenelec(){
       this.fermersenelecmodal() ;
       let montant = Number(this.mntSENELEC) ;
       sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wizall Senelec','operateur':6,'operation':4,'montant':montant,'police':this.numpolice, 'numfacture':this.numFactureSenelec}));
    }

}
