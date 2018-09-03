import {Component, OnInit, ViewChild, ElementRef,Input,Output,EventEmitter} from '@angular/core';
import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {PostCashService} from "../services/postcash.service";


@Component({
  selector: 'app-postcash',
  templateUrl: './postcash.component.html',
  styleUrls: ['./postcash.component.css'],
})
export class PostcashComponent implements OnInit {
  adejaclick:boolean = false;
  telephone:string;
    tel:number;
    montant:string;
    compte: string;
    badge: string;

    compteur:string;
    codevalidation:string;
    mt_carte:number;
    nb_carte:number;
    num_facture: string;
    police: string;
    produit: string;
    type: string;
    nom: string;
    prenom: string;
    code: string;
    frais: string;
    erreur = false ;
    errorMessage : string ;
    loading = false ;
    telephonebool:boolean=false;
    montantbool:boolean=false;
    dataImpression:any;
    codevaliadtion:boolean=false;
    facture_deja_paye:boolean = false;
    nbcartebool:boolean=false;
    mtcartebool:boolean=false;
  @Input() bbspc:number=0;
  @Output() changementPc=new EventEmitter();
  increment(){
    this.bbspc++;
    this.changementPc.emit(this.bbspc);
  }
  @ViewChild('closeBtnModalPostSenec') closeBtnModalPostSenec: ElementRef;
  @ViewChild('closeBtnModalCodeValidation') closeBtnModalCodeValidation: ElementRef;
  @ViewChild('CodeValidationRetraiModalt') CodeValidationRetraiModalt: ElementRef;
  @ViewChild('rechargementespece') public rechargementespece: ModalDirective;
  @ViewChild('achatjula') public achatjula: ModalDirective;
  @ViewChild('retraitespece') public retraitespece: ModalDirective;
  @ViewChild('retraitecarte') public retraitecarte: ModalDirective;


  modalRechargementEspece(){
    if(this.montant!=undefined && this.montant!="" && this.verif_montant(this.montant)==true && this.telephone!="" && this.telephone!=undefined && this.verif_phone_number(this.telephone)==true){
      this.rechargementespece.show();
    }else{
      if(this.montant=="" || this.montant==undefined || this.verif_montant(this.montant)!=true){
        this.montantbool=true;
      }
      if(this.telephone=="" || this.telephone==undefined || this.verif_phone_number(this.telephone)!=true){
        this.telephonebool=true;
      }
    }
  }
  hidemodalRechargementEspece(){
    this.rechargementespece.hide();
  }
  modalachatjula(){
    let chaine=this.nb_carte.toString();
    let mt=this.mt_carte.toString();
    if(chaine!=undefined && chaine!="" && this.verif_montant(chaine)==true && mt!="" && mt!=undefined && this.verif_montant(mt)==true){
        this.achatjula.show();
    }else{
      if(chaine==undefined && chaine=="" && this.verif_montant(chaine)!=true){
         this.nbcartebool=false;
      }
      if(mt==undefined || mt=="" || this.verif_montant(mt)!=true){
         this.mtcartebool=false;
      }
    }
  }
  hidemodaljula(){
    this.achatjula.hide();
  }
  modalretraitespece(){
    this.retraitespece.show();
   // this.validationretraitespece();
  }
  hidmodalretraitespece(){
    this.retraitespece.hide();
  }
  modalretraitcarte(){
    this.retraitecarte.show();
  }
  hidemodalretraitcarte(){
    this.retraitecarte.hide();
  }
  reinitialiseRbool(){
    this.telephonebool=false;
    this.montantbool=false;
    this.mtcartebool=false;
    this.nbcartebool=false;
  }

  detailfacturepostcash:any;
  detailcodevalidateretraitespece:any;

  constructor(
     private route:ActivatedRoute,
     private router: Router,
     private _postCashService: PostCashService
    ) { }

    ngOnInit():void { }
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
      this.telephone = undefined ;
      this.montant = undefined ;
      this.compteur = undefined ;
      this.nb_carte = undefined ;
      this.mt_carte = undefined ;
      this.num_facture = undefined ;
      this.police = undefined ;
      this.erreur = false ;
      this.isselectretraitespeceaveccarte = false;
      this.codevalidation = undefined;
      this.reinitialiseRbool();
    }

  private closeModalPostSenec(): void { this.closeBtnModalPostSenec.nativeElement.click(); }
  private closeModalCodeValidation(): void { this.closeBtnModalCodeValidation.nativeElement.click(); }




  validrechargementespece(){
    this.errorMessage =  undefined;
    this.loading = true ;
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'rechargement espece','operateur':1,'operation':1,'montant':this.montant,'telephone':this.telephone}));
    this.increment();
    this.loading = false ;
    this.hidemodalRechargementEspece();
    this.reinitialiser();
    /*this._postCashService.rechargementespece('00221'+this.telephone+'',''+this.montant).then(postcashwebserviceList => {
      this.loading = false ;
      postcashwebserviceList = JSON.parse( JSON.parse(postcashwebserviceList._body) ) ;
      console.log(postcashwebserviceList) ;

      if( (typeof postcashwebserviceList.errorCode != "undefined") && postcashwebserviceList.errorCode == "0" && postcashwebserviceList.errorMessage == ""){
        this.dataImpression = {
          apiservice:'postecash',
          service:'rechargementespece',
          infotransaction:{
            client:{
              transactionPostCash: postcashwebserviceList.transactionId,
              transactionBBS: 'Id BBS',
              telephone:'00221'+this.telephone,
              montant:this.montant,
            },

          },
        }
        sessionStorage.setItem('dataImpression', JSON.stringify(this.dataImpression));
        this.router.navigate(['accueil/impression']);
      }else{
        this.erreur = true ;
        this.errorMessage = postcashwebserviceList.errorMessage;
      }
    });*/
  }

  validateachatcodewoyofal(){
      //console.log(this.montant+'-'+this.compteur);
      this.loading = true ;
      this._postCashService.achatcodewoyofal(this.montant+'',this.compteur+'').then(postcashwebserviceList => {
          this.loading = false ;
        if( (typeof postcashwebserviceList.errorCode != "undefined") && postcashwebserviceList.errorCode == "0" && postcashwebserviceList.errorMessage == ""){
          this.dataImpression = {
            apiservice:'postecash',
            service:'achatcodewayafal',
            infotransaction:{
              client:{
                transactionPostCash: postcashwebserviceList.transactionId,
                transactionBBS: 'Id BBS',
                codewoyafal: postcashwebserviceList.code,
                montant: this.montant,
                compteur: this.compteur,
              },
            },
          }
          sessionStorage.setItem('dataImpression', JSON.stringify(this.dataImpression));
          this.router.navigate(['accueil/impression']);
        }else{
          this.erreur = true ;
          this.errorMessage = postcashwebserviceList.errorMessage;
        }

      });
    }

  validatedetailfacturesenelec(){
      this.detailfacturepostcash = null;
      console.log('Police et Numero Facture : '+this.police+'-'+this.num_facture);
      this.loading = true ;
      this._postCashService.detailfacturesenelec(this.police,this.num_facture.toString()).then(postcashwebserviceList => {
        this.loading = false ;
        this.detailfacturepostcash = postcashwebserviceList;
        console.log(postcashwebserviceList);
      });
    }

  validatereglementsenelec(){
      //console.log(this.police+'-'+this.num_facture);
      this.loading = true ;
      this._postCashService.reglementsenelec(this.police+'', this.num_facture, this.detailfacturepostcash.montant).then(postcashwebserviceList => {
          this.loading = false ;
        if( (typeof postcashwebserviceList.errorCode != "undefined") && postcashwebserviceList.errorCode == "0" && postcashwebserviceList.errorMessage == ""){
          this.loading = false ;
          this.dataImpression = {
            apiservice:'postecash',
            service:'reglementsenelec',
            infotransaction:{
              client:{
                transactionPostCash: postcashwebserviceList.transactionId,
                transactionBBS: 'Id BBS',
                police: this.police,
                facture: this.num_facture,
                montant: postcashwebserviceList.montant_reel,

              },

            },
          }
          sessionStorage.setItem('dataImpression', JSON.stringify(this.dataImpression));
          this.increment();
          this.router.navigate(['accueil/impression']);
        }else{
          this.police = undefined;
          this.num_facture = undefined;
          this.erreur = true ;
          this.errorMessage = postcashwebserviceList.errorMessage;
          this.closeModalPostSenec();
        }

      });
      this.closeModalPostSenec();
    }

  validateachatjula(){
     // this.loading = true ;
      sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'achat jula','operateur':1,'operation':2,'montant':this.nb_carte,'nbcarte':this.nb_carte}));
      this.increment();
      this.reinitialiser();
     // this.loading = false ;
      /* this._postCashService.achatjula(this.mt_carte+'',this.nb_carte+'').then(postcashwebserviceList => {

        this.loading = false ;
        this.erreur = false;
        postcashwebserviceList = JSON.parse(postcashwebserviceList) ;

        if( (typeof postcashwebserviceList.errorCode != "undefined") && postcashwebserviceList.errorCode == "0" && postcashwebserviceList.errorMessage == ""){
          this.loading = false ;
          this.dataImpression = {
            apiservice:'postecash',
            service:'achatjula',
            infotransaction:{
              client:{
                transactionPostCash: postcashwebserviceList.transactionId,
                transactionBBS: "transactionId BBS",
                typecarte:this.mt_carte,
                nbcarte:this.nb_carte,
                montant:this.nb_carte * this.mt_carte,
              },

            },
          }
          sessionStorage.setItem('dataImpression', JSON.stringify(this.dataImpression));
         // this.increment();
          this.router.navigate(['accueil/impression']);
        }else{
          this.erreur = true ;
          this.errorMessage = postcashwebserviceList.errorMessage;
        }
      });*/
    }

  isselectretraitespeceaveccarte:boolean=true

  public selectretraitespeceaveccarte(){
    this.telephone = undefined ;
    this.montant = undefined ;
  }

  payeroolusolar(){
    this.loading = true ;
    this.erreur = false;
    this._postCashService.payeroolusolar('00221'+this.telephone+'', this.compte, ''+this.montant).then(postcashwebserviceList => {
      this.loading = false ;
      if( (typeof postcashwebserviceList.errorCode != "undefined") && postcashwebserviceList.errorCode == "0" && postcashwebserviceList.errorMessage == ""){
        this.dataImpression = {
          apiservice:'postecash',
          service:'rechargementespece',
          infotransaction:{
            client:{
              transactionPostCash: postcashwebserviceList.transactionId,
              transactionBBS: 'Id BBS',
              telephone:'00221'+this.telephone,
              montant:this.montant,
            },

          },
        }
        sessionStorage.setItem('dataImpression', JSON.stringify(this.dataImpression));
       // this.increment();
        this.router.navigate(['accueil/impression']);
      }else{
        this.erreur = true ;
        this.errorMessage = postcashwebserviceList.errorMessage;
      }
    });
  }


  CodeValidation(){
    console.log("CodeValidation");
    this.errorMessage =  undefined;
    this.loading = true ;
    this.erreur = false;
    this._postCashService.codeValidation('00221'+this.telephone+'',''+this.montant).then(postcashwebserviceList => {
      this.loading = false ;
      console.log(postcashwebserviceList);
      if( (typeof postcashwebserviceList.errorCode != "undefined") && postcashwebserviceList.errorCode == "0" && postcashwebserviceList.errorMessage == ""){
        this.codevaliadtion = true;
        this.erreur = false ;
      }else{
        this.erreur = true ;
        this.errorMessage = postcashwebserviceList.errorMessage;
      }

    });
  }

  validationretraitespece(){
    console.log("validationretraitespeceaveccarte");
    this.errorMessage =  undefined;
   // this.loading = true ;
    this.erreur = false;
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'retrait espece','operateur':1,'operation':3,'montant':this.montant,'telephone':this.telephone}));
    this.increment();
    this.hidmodalretraitespece();
    this.reinitialiser();
   // this.loading=false;
    /*this._postCashService.retraitespece('00221'+this.telephone+'',''+this.montant).then(postcashwebserviceList => {
      this.loading = false ;
      postcashwebserviceList = JSON.parse(postcashwebserviceList) ;
      console.log(postcashwebserviceList);
      if( (typeof postcashwebserviceList.errorCode != "undefined") && postcashwebserviceList.errorCode == "0" && postcashwebserviceList.errorMessage == ""){
        this.dataImpression = {
          apiservice:'postecash',
          service:'retraitaveccarte',
          infotransaction:{
            client:{
              transactionPostCash: postcashwebserviceList.transactionId,
              transactionBBS: 'Id BBS',
              telephone:'00221'+this.telephone,
              montant:this.montant,
            },

          },
        }
        sessionStorage.setItem('dataImpression', JSON.stringify(this.dataImpression));
        this.router.navigate(['accueil/impression']);
      }else{
        this.erreur = true ;
        this.errorMessage = postcashwebserviceList.errorMessage;
      }
    });*/
  }

  validatedebitercarte(){
    console.log("validateretraitespecesanscarte");
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'retrait carte','operateur':1,'operation':4,'montant':this.montant,'telephone':this.telephone,'codevalidation':this.codevaliadtion}));
    this.increment();
    this.hidemodalretraitcarte();
    this.reinitialiser();
   /* this.errorMessage =  undefined;
    this.loading = true ;
    this.erreur = false;
    this._postCashService.debitercarte('00221'+this.telephone+'',''+this.montant,''+ this.codevalidation).then(postcashwebserviceList => {
      this.loading = false ;
      postcashwebserviceList = JSON.parse(postcashwebserviceList) ;
      console.log(postcashwebserviceList) ;
      if( (typeof postcashwebserviceList.errorCode != "undefined") && postcashwebserviceList.errorCode == "0" && postcashwebserviceList.errorMessage == ""){
        this.dataImpression = {
          apiservice:'postecash',
          service:'retraitsanscarte',
          infotransaction:{
            client:{
              transactionPostCash: postcashwebserviceList.transactionId,
              transactionBBS: 'Id BBS',
              telephone:'00221'+this.telephone,
              montant:this.montant,
              code:this.codevalidation,
            },

          },
        }
        this.hidemodalretraitcarte();
        sessionStorage.setItem('dataImpression', JSON.stringify(this.dataImpression));
        this.router.navigate(['accueil/impression']);
      }else{
        this.erreur = true ;
        this.errorMessage = postcashwebserviceList.errorMessage;
      }
    });*/
  }
}
