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

   fraisDepot = 0 ;

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
   Typebon:string;
   montantbon:string;
   codebon:string;
   messageretraitcash:boolean=false;
   errorverifcode:boolean=false;
   messageretraitcasherror:boolean=false;
   messagesecondcode:boolean=false;
   typebon=[{type:'pharmacie',prix:[10,2000,5000]},{type:'essence',prix:[1000,2000,5000]},{type:'x',prix:[10,2000,5000]},{type:'y',prix:[20000,50000,5000]}];
  constructor(private _wizallService : WizallService) {
  // this.donneeretraitbon={"status": "valid", "customer": {"phone_number": "778150416", "first_name": "Yapele Sosthene", "last_name": "KA Assane"}, "business_type": 0, "value": "100.000000", "model_voucher": {"is_cash": true, "product": "Bon Cash", "sub_product": "NA", "step_value": "1.000", "is_generic": true, "id": 3333, "is_secured": true, "minimum_value": "2000.000", "name": "Bon Cash ", "maximum_value": "3000.000", "network": "Transfert XOF", "currency_code": 952}, "recipient": {"phone_number": "775054827", "is_valid": false, "first_name": "KA Assane", "last_name": "KA Assane", "needed_kyc_infos": ["identityIsNeeded"]}, "id": 135137};
  }

  ngOnInit() {
     this.messageretraitcash=false;
     this.messageretraitcasherror=false;
     this.errorverifcode=false;
     this.messagesecondcode=false;
  }

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
  @ViewChild('modalenvoibonachat') public modalenvoibonachat:ModalDirective;
  @ViewChild('modalfraiscashin') public modalfraiscashin:ModalDirective;
  @ViewChild('modalfraisEnvoieBon') public modalfraisEnvoieBon:ModalDirective;
  


   public showmodalfraisEnvoieBon(){
      this.modalfraisEnvoieBon.show() ;
   }
   public fermermodalfraisEnvoieBon(){
      this.modalfraisEnvoieBon.hide() ;
   }

   public showmodalfraiscashin(){
      this.modalfraiscashin.show();
   }
   public fermermodalfraiscashin(){
      this.modalfraiscashin.hide();
   }

   public showmodalenvoibonachat(){
      this.modalenvoibonachat.show();
   }
   public hidemodalenvoibonachat(){
      this.modalenvoibonachat.hide();
   }
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
   reinitialiser(){
       this.prenomE=undefined;
	   this.nomE=undefined;
	   this.telE=undefined;
	   this.prenomB=undefined;
	   this.nomB=undefined;
	   this.telB=undefined;
	   this.montant=undefined;
	   this.client=undefined;
	   this.num_card=undefined;
	   this.nationalite=undefined;
	   this.secondcode=undefined;
	   this.donneeretraitbon=undefined;
	   this.messageretraitcash=false;
	   this.messageretraitcasherror=false;
	   this.errorverifcode=false;
	   this.messagesecondcode=false;
   }
   
   public validerenvoibon(){

       this.hidemodalenvoiboncash();

       sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wizall envoi de bon','operateur':6,'operation':6,prenomE:this.prenomE,nomE:this.nomE,telE:this.telE,nationalite:this.nationalite,type_piece:this.type_piece,num_card:this.num_card,montant:this.montant,prenomB:this.prenomB,nomB:this.nomB,telB:this.telB}));
      
        this.reinitialiser();
   }

   public validerbonachat(){
       //sessionStorage.setItem('curentProcess',JSON.stringify({nom:'Wizall envoi de bon',operateur:6,operation:7,prenomE:this.prenomE,nomE:this.nomE,telE:this.telE,nationalite:this.nationalite,type_piece:this.type_piece,num_card:this.num_card,montant:this.montant,prenomB:this.prenomB,nomB:this.nomB,telB:this.telB}));
      // let data={prenomE:this.prenomE,nomE:this.nomE,telE:this.telE,nationalite:this.nationalite,type_piece:this.type_piece,num_card:this.num_card,montant:this.montant,prenomB:this.prenomB,nomB:this.nomB,telB:this.telB};
       this.reinitialiser();
       this.hidemodalenvoibonachat();
      /* this._wizallService.validerbonachat(data).then(response =>{
         // let data=JSON.parse(response._body);
          console.log(response);  
       });*/
   }
   
   public showmodalretraitbon(){
      this.messageretraitcash=false;
      this.messageretraitcasherror=false;
      this.errorverifcode=false;
      this._wizallService.verifier_code_retraitbon(this.codebon).then(response => {
      let data=JSON.parse(response);
      console.log(data);
       if(response.indexOf("status")!=-1 && data.status=="valid"){
          this.errorverifcode=false;
          this.donneeretraitbon=data;
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
		 }
		 if(response.indexOf("code")!=-1 && data.error=="Token already used"){
		   this.messageretraitcasherror=true;
		   this.errorverifcode=false;
		 }
		 if(response.indexOf("code")!=-1 && data.error=="Invalid token"){
		  this.errorverifcode=true;
		  this.messageretraitcasherror=false;
		 }
    }); 
   }
   public hidemodalretraitbon(){
      this.modalretraitbon.hide();
      this.reinitialiser();
   }

    public depotmodal(){
       this.fraisDepot = this.getFrais(this.mnt) ;
       this.modaldepot.show();
    }
    public retirermodal(){
       this.modalretrait.show();
    }

    fermermodaldepot(){
      this.modaldepot.hide();
      this.reinitialiser();
    }

    fermermodalretrait(){
      this.reinitialiser();
      this.validerfirst=false;
      this.validersecond=false;
      this.modalretrait.hide();
      
    }
   
    valider_code(){
       this._wizallService.getSendSecureID(this.codebon).then( response =>{
          console.log(response);
          this.validerfirst=false;
          this.validersecond=true; 
       });
    }

    validationretraitbon(){
       console.log(this.nationalite);
       console.log(this.num_card);
       console.log(this.secondcode);

       let montantRetrait = Number(this.montant) ;

//       let data={nationalite:this.nationalite,num_card:this.num_card,type_carte:this.type_piece,codebon:this.secondcode,code_validation:this.codebon, 'montant':montantRetrait };

        console.log("Montant retrait bon :::::"+montantRetrait) ;

         let data={'nom':'Wizall retrait de bon','operateur':6,'operation':5, 'nationalite':this.nationalite,'num_card':this.num_card,'type_carte':this.type_piece,'codebon':this.secondcode,'code_validation':this.codebon, 'montant':montantRetrait };

         this.hidemodalretraitbon();


         sessionStorage.setItem('curentProcess',JSON.stringify(data) ) ;

      // sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wizall retrait de bon','operateur':6,'operation':5,'secure_id':925938,'used_value':1789,'agent_msisdn':707511503,'agent_pin':1001,'debtor_pos_id':'P1','debtor_employee_id':'V1','recipient_nationality':this.nationalite,'recipient_identity_type':'idcard','recipient_identity_number':this.num_card}));
       
/*
       this.hidemodalretraitbon();
       this._wizallService.bonDebitVoucher(data).then(response =>{
        console.log(response);
        let data=JSON.parse(response);
          if(data.timestamp!=undefined){
            this.messageretraitcash=true;
            this.messageretraitcasherror=false;
          }else{
            this.messageretraitcasherror=true;
               this.messagesecondcode=true;
          }
       });
*/

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
      this.reinitialiser();
    }

    fermersenelecmodal(){
      this.modalsenelec.hide();
      this.reinitialiser();
    }

    deposer(){
      this.fermermodaldepot() ;
      this.mnt = this.mnt + this.fraisDepot ;
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

    getFrais(montant){ 
      let frais = 0 ;

      if(montant>=1 && montant <=499) 
        frais =  25 ;

      if(montant>=500 && montant <=1100) 
        frais =  60 ;

      if(montant>=1101 && montant <=3000) 
        frais =  150 ;

      if(montant>=3001 && montant <=5000) 
        frais =  200 ;

      if(montant>=5001 && montant <=10000) 
        frais =  400 ;

      if(montant>=10001 && montant <=15000) 
        frais =  600 ;
      if(montant>=15001 && montant <=20000) 
        frais =  800 ;
      if(montant>=20001 && montant <=35000) 
        frais =  1400 ;
      if(montant>=35001 && montant <=60000) 
        frais =  2400 ;
      if(montant>=60001 && montant <=75000) 
        frais =  2625 ;
      if(montant>=75001 && montant <=100000) 
        frais =  3100 ;
      if(montant>=100001 && montant <=150000) 
        frais =  4000 ;
      if(montant>=150001 && montant <=200000) 
        frais =  6000 ;
      if(montant>=200001 && montant <=300000) 
        frais =  7500 ;
      if(montant>=300001 && montant <=400000) 
        frais =  10000 ;
      if(montant>=400001 && montant <=750000) 
        frais =  14000 ;
      if(montant>=750001 && montant <=1000000) 
        frais =  montant*0.018 ;

        return frais ;    
    }

    getFraisTransfert(montant){ 
      let frais = 0 ;

      if(montant>=2000 && montant <=3049) 
        frais =  200 ;

      if(montant>=3050 && montant <=5049) 
        frais =  400 ;

      if(montant>=5050 && montant <=10049) 
        frais =  700 ;

      if(montant>=10050 && montant <=15049) 
        frais =  1100 ;

      if(montant>=15050 && montant <=20049) 
        frais =  1300 ;

      if(montant>=20050 && montant <=25049) 
        frais =  1500 ;

      if(montant>=25050 && montant <=35049) 
        frais =  1700 ;

      if(montant>=35050 && montant <=50049) 
        frais =  1800 ;

      if(montant>=50050 && montant <=60049) 
        frais =  2300 ;

      if(montant>=60050 && montant <=75049) 
        frais =  2700 ;

      if(montant>=75050 && montant <=100049) 
        frais =  3200 ;

      if(montant>=100050 && montant <=125049) 
        frais =  3600 ;

      if(montant>=125050 && montant <=150049) 
        frais =  4000 ;

      if(montant>=150050 && montant <=200049) 
        frais =  4800 ;

      if(montant>=200050 && montant <=250049) 
        frais =  6350 ;

      if(montant>=250050 && montant <=300049) 
        frais =  8050 ;

      if(montant>=300050 && montant <=350049) 
        frais =  8450 ;

      if(montant>=350050 && montant <=400049) 
        frais =  9750 ;

      if(montant>=400050 && montant <=600049) 
        frais =  11850 ;

      if(montant>=600050 && montant <=750049) 
        frais =  13550 ;

      if(montant>=750050 && montant <=1000000) 
        frais =  21650 ;

        return frais ;    
    }


    nombreFormate(montant){   
        return Number( montant.split(".")[0] ).toLocaleString() ;    
    }

}
