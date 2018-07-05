import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {PostCashService} from "../services/postcash.service";


@Component({
  selector: 'app-postcash',
  templateUrl: './postcash.component.html',
  styleUrls: ['./postcash.component.css'],
})
export class PostcashComponent implements OnInit {
  adejaclick:boolean = false;
  telephone:number;
    tel:number;
    montant:number;
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

    dataImpression:any;
    codevaliadtion:boolean=false;
    facture_deja_paye:boolean = false;

  @ViewChild('closeBtnModalPostSenec') closeBtnModalPostSenec: ElementRef;
  @ViewChild('closeBtnModalCodeValidation') closeBtnModalCodeValidation: ElementRef;
  @ViewChild('CodeValidationRetraiModalt') CodeValidationRetraiModalt: ElementRef;

  detailfacturepostcash:any;
  detailcodevalidateretraitespece:any;

  constructor(
     private route:ActivatedRoute,
     private router: Router,
     private _postCashService: PostCashService
    ) { }

    ngOnInit():void { }

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
    }

  private closeModalPostSenec(): void { this.closeBtnModalPostSenec.nativeElement.click(); }
  private closeModalCodeValidation(): void { this.closeBtnModalCodeValidation.nativeElement.click(); }




  validrechargementespece(){
    this.errorMessage =  undefined;
    this.loading = true ;
    this._postCashService.rechargementespece('00221'+this.telephone+'',''+this.montant).then(postcashwebserviceList => {
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
    });
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
      this.loading = true ;
      this._postCashService.achatjula(this.mt_carte+'',this.nb_carte+'').then(postcashwebserviceList => {

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
          this.router.navigate(['accueil/impression']);
        }else{
          this.erreur = true ;
          this.errorMessage = postcashwebserviceList.errorMessage;
        }
      });
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
    this.loading = true ;
    this.erreur = false;
    this._postCashService.retraitespece('00221'+this.telephone+'',''+this.montant).then(postcashwebserviceList => {
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
    });
  }

  validatedebitercarte(){
    console.log("validateretraitespecesanscarte");
    this.errorMessage =  undefined;
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
        sessionStorage.setItem('dataImpression', JSON.stringify(this.dataImpression));
        this.router.navigate(['accueil/impression']);
      }else{
        this.erreur = true ;
        this.errorMessage = postcashwebserviceList.errorMessage;
      }
    });
  }
}
