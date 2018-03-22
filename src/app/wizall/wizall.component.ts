import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import {WizallService} from "../services/wizall.service";


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
   etat=false;
   validerfirst:boolean;
   validersecond:boolean;
   bon:string;
   prenomE:string;
   nomE:string;
   telE:string;
   prenomB:string;
   nomB:string;
   telB:string;
   montant:string;
   client:any;
   num_card:string;
   nationalite:string;
   secondcode:string;
   donneeretraitbon:any;
   type_piece:string;
   typebon=[{type:'pharmacie',prix:[10,2000,5000]},{type:'essence',prix:[1000,2000,5000]},{type:'x',prix:[10,2000,5000]},{type:'y',prix:[20000,50000,5000]}];
  constructor(private _wizallService : WizallService) {
  // this.donneeretraitbon={"status": "valid", "customer": {"phone_number": "778150416", "first_name": "Yapele Sosthene", "last_name": "KA Assane"}, "business_type": 0, "value": "100.000000", "model_voucher": {"is_cash": true, "product": "Bon Cash", "sub_product": "NA", "step_value": "1.000", "is_generic": true, "id": 3333, "is_secured": true, "minimum_value": "2000.000", "name": "Bon Cash ", "maximum_value": "3000.000", "network": "Transfert XOF", "currency_code": 952}, "recipient": {"phone_number": "775054827", "is_valid": false, "first_name": "KA Assane", "last_name": "KA Assane", "needed_kyc_infos": ["identityIsNeeded"]}, "id": 135137};
  }

  ngOnInit() {}

  reinitialise(){
   this.mnt=undefined;
   this.numclient=undefined;
  }
  recuperePrix(){
    
  }
  
 // this.client=JSON.parse(this.donneeretraitbon.customer);
  //console.log(this.donneeretraitbon);
  
  @ViewChild('modaldepot') public modaldepot:ModalDirective;
  @ViewChild('modalretrait') public modalretrait:ModalDirective;
  @ViewChild('modalsde') public modalsde:ModalDirective;
  @ViewChild('modalsenelec') public modalsenelec:ModalDirective;
  @ViewChild('modalretraitbon') public modalretraitbon:ModalDirective;
  @ViewChild('modalretraitbonachat') public modalretraitbonachat:ModalDirective;
  @ViewChild('modalenvoiboncash') public modalenvoiboncash:ModalDirective;
  
  
  public showmodalenvoiboncash(){
      this.modalenvoiboncash.show();
  }
  public hidemodalenvoiboncash(){
      this.modalenvoiboncash.hide();
  }
  
   public showmodalretraitbonachat(){
      console.log(this.donneeretraitbon);
      
      this.modalretraitbonachat.show();
   }
   public hidemodalretraitbonachat(){
      this.modalretraitbonachat.hide();
   }
   
   public validerenvoibon(){
       sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wizall envoi de bon','operateur':6,'operation':6}));
       this.hidemodalenvoiboncash();
   }
  
   public showmodalretraitbon(){
      this._wizallService.verifier_code_retraitbon().then(response => {
          this.donneeretraitbon=response;
          console.log(this.donneeretraitbon);
		  this.prenomE=this.donneeretraitbon.customer.first_name;
		  this.nomE=this.donneeretraitbon.customer.last_name;
		  this.telE=this.donneeretraitbon.customer.phone_number;
		  this.prenomB=this.donneeretraitbon.recipient.first_name;
		  this.nomB=this.donneeretraitbon.recipient.last_name;
		  this.telB=this.donneeretraitbon.recipient.phone_number;
		  this.montant=this.donneeretraitbon.value;
		  this.validerfirst=true;
		  this.validersecond=false;
		  this.modalretraitbon.show();
      }); 
   }
   public hidemodalretraitbon(){
      this.modalretraitbon.hide();
   }

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
      this.validerfirst=false;
      this.validersecond=false;
      this.modalretrait.hide();
      
    }
    /*
        $data = array("secure_id"=>"925938","used_value"=>"1789","agent_msisdn"=>"707511503",
            "agent_pin"=>"1001","debtor_pos_id"=>"P1","debtor_employee_id"=>"V1","recipient_nationality"=>"SN",
            "recipient_identity_type"=>"idcard","recipient_identity_number"=>"1392199000128"
      );
       
    
    */
    valider_code(){
       this.validerfirst=false;
       this.validersecond=true; 
    }
    validationretraitbon(){
       console.log(this.nationalite);
       console.log(this.num_card);
       console.log(this.secondcode);
       sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wizall retrait de bon','operateur':6,'operation':5,'secure_id':925938,'used_value':1789,'agent_msisdn':707511503,'agent_pin':1001,'debtor_pos_id':'P1','debtor_employee_id':'V1','recipient_nationality':this.nationalite,'recipient_identity_type':'idcard','recipient_identity_number':this.num_card}));
       this.hidemodalretraitbon();
    }

    public sdemodal(){
      this._wizallService.intouchRecupereFactureSde( Number(this.refclientsde) ).then( response =>{
        console.log(response._);
       if(response._.nil!="true"){
		   this.mntSDE = response[0].montant ;
		   this.refclientsde = response[0].reference_client ;
		   this.nomclient = response[0].reference_client ;
		   this.echeance = response[0].date_echeance ;
		   this.refFactureSDE = response[0].reference_facture ;
		   this.statuspayment = response[0].statuspayment ;
		   this.etat=true;
		   this.modalsde.show();
       }
       else{
           this.etat=false;
           this.modalsde.show();
       }
      });

    }

    public senelecmodal(){
      this._wizallService.intouchRecupereFactureSenelec(this.numpolice.toString()).then( response =>{
       console.log(response.length);
       if(response.length!=0){
		   this.mntSENELEC = response[0].montant ;
		   this.refclient = response[0].client;
		   this.echeance = response[0].dateecheance ;
		   this.numpolice = response[0].police ;
		   this.numFactureSenelec = response[0].numfacture ;
		   this.statuspayment = response[0].statuspayment ;
		   this.etat=true;
		   this.modalsenelec.show() ;
       }
       else{
           this.etat=false;
           this.modalsenelec.show();
       }
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
