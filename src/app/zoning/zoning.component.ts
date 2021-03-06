import { Component, OnInit } from '@angular/core';
import { PostCashService } from 'app/services/postcash.service';
import { Router } from '@angular/router';
import { TntService } from 'app/services/tnt.service';
import { WizallService } from 'app/services/wizall.service';
import { OrangemoneyService } from 'app/services/orangemoney.service';
import { TigocashService } from 'app/services/tigocash.service';
import { ExpressocashService } from 'app/services/expressocash.service';
import { FacturierService } from 'app/services/facturier.service';
import { UtilsService } from 'app/services/utils.service';
import { TarifsService } from 'app/services/tarifs.service';

@Component({
  selector: 'app-zoning',
  templateUrl: './zoning.component.html',
  styleUrls: ['./zoning.component.css']
})
export class ZoningComponent implements OnInit {

  quinzeMinutes = 900000;
  private item:any;
  finich:boolean;
  constructor(private _postCashService: PostCashService, private _tntService:TntService, private router: Router, private _wizallService : WizallService, private _omService:OrangemoneyService, private _tcService: TigocashService, private expressocashwebservice : ExpressocashService, private _facturierService : FacturierService, private utilitaire : UtilsService,private _tarifsService:TarifsService) { 

  }

  ngOnInit() {
    this.finich=false;
    this.item =  JSON.parse(sessionStorage.getItem('curent'));
    console.log("Zoning comp --------- ");
    console.log(this.item);
     this.prossusSuite();
  }

  deleteTaregetDiv (event:any,i){
      if(i.etats.color=='red'){
        this.finich = true;
      }
  }

  prossusSuite(){
    let operateur= this.item.data.operateur;
    switch(operateur){
      case 1:{
              let operation= this.item.data.operation;
              switch(operation){
                case 1:{
                      this.validrechargementespece(this.item);
                      break;
                }
                case 2:{
                      this.validateachatjula(this.item);
                      break;
                }
                case 3:{
                      this.validatedetailfacturesenelec(this.item);
                      break;
                }
                case 4:{
                      this.validateachatcodewoyofal(this.item);
                      break;
                }
                default:break;
              }
                 break ;
      }

      case 2:{
           let operation=this.item.data.operation;

            switch(operation){
              case 1:{
                     this.deposer(this.item);
                     break;
                     }
              case 2:{
                     this.retirer(this.item);
                     break;
              }
              case 3:{
                     this.retraitAvecCode(this.item);
                     break;
              }
              case 4:{
                     this.retraitCpteRecep(this.item);
                     break;
              }
              case 5:{
                     this.acheterCredit(this.item);
                     break;
              }
              default :break;
            }
             break ;
      }

      case 3:{
           let operation=this.item.data.operation;

            switch(operation){
              case 1:{
                     this.deposertc(this.item);
                     break;
                     }
              case 2:{
                     this.retirertc(this.item);
                     break;
              }
              case 5:{
                      this.creditIZItc(this.item) ;
                      break ;
                    }
              case 6:{
                    console.log(this.item);
                    this.retraitaveccodetc(this.item) ;
                    break ;
                    }
              default :break;
            }
             break ;
      }


     case 4:{
           let operation=this.item.data.operation;
           console.log("here we go ...") ;
          // console.log(this.item) ;
           switch(operation){
            case 1:{
                 this.validnabon(this.item);
                 break;
            }
            case 2:{
                this.vendreDecodeur(this.item);
                break;
            }
            case 3:{
                this.vendreCarte(this.item);
                break;
            }
            default : break;
           }
           break ;
     }

     case 6:{
           let operation=this.item.data.operation;
           switch(operation){
             case 1:{
               this.cashInWizall(this.item);
               break;
             }
             case 2:{
               this.cashOutWizall(this.item);
               break;
             }
             case 5:{
               this.validationretraitbon(this.item);
               break;
             }
             case 6:{
               this.validerenvoibon(this.item);
               break;
             }
             case 7:{
               this.validerbonachat(this.item);
               break;
             }
            default : break;
           }
         break ;
     }

     case 7:{
           let operation=this.item.data.operation;
               console.log(this.item);
               console.log('E-money');
           switch(operation){
            case 1:{
                 this.cashInEmoney(this.item);
                 break;
            }
            case 2:{
                this.cashOutEmoney(this.item);
                break;
            }
            case 3:{
                this.cashOutPIN(this.item);
                break;
            }
            default : break;
           }
           break;
     }

     case 8:{
       let operation=this.item.data.operation;
       console.log('FACTURIER');

       switch(operation){
            case 1:{
                 this.paiemantsde(this.item);
                 break;
            }
            case 2:{
                this.validerrapido(this.item);
                break;
            }
            case 3:{
                this.validerwoyofal(this.item);
                break;
            }
            case 4:{
                this.validerpaimentsenelec(this.item);
                break;
            }
            case 5:{

                this.payeroolusolar(this.item);
                break;
            }
            default : break;
        }
     }

      default:break;
    }

  }

  /******************************************************************************************************/


validrechargementespece(objet:any){
  this._postCashService.rechargementespece('00221'+objet.data.telephone+'',''+objet.data.montant).then(postcashwebserviceList => {

    if( (typeof postcashwebserviceList.errorCode != "undefined") && postcashwebserviceList.errorCode == "0" && postcashwebserviceList.errorMessage == ""){
          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='green';
          objet.dataI = {
          apiservice:'postecash',
          service:'rechargementespece',
          infotransaction:{
            client:{
              transactionPostCash: postcashwebserviceList.transactionId,
              transactionBBS: 'Id BBS',
              telephone:'00221'+objet.data.telephone,
              montant:objet.data.montant,
            },

          },
        } ;
    }else{
          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='red';
    }
  });

}

/******************************************************************************************************/


validateachatjula(objet:any){
  this._postCashService.achatjula(objet.data.montant+'',objet.data.nbcarte+'').then(postcashwebserviceList => {
     if( (typeof postcashwebserviceList.errorCode != "undefined") && postcashwebserviceList.errorCode == "0" && postcashwebserviceList.errorMessage == ""){
     let montant = objet.data.nbcarte * objet.data.montant ;
      objet.dataI = {
           apiservice:'postecash',
           service:'achatjula',
           infotransaction:{
             client:{
               transactionPostCash: postcashwebserviceList.transactionId,
               transactionBBS: 'id BBS',
               typecarte:objet.data.montant,
               nbcarte:objet.data.nbcarte,
               montant:montant,
             },

           },
         }
      objet.etats.etat=true;
      objet.etats.load='terminated';
      objet.etats.color='green';
     }else{
          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='red';
     }
   });

}


validatedetailfacturesenelec(objet:any){
      objet.dataI = {
          apiservice:'postecash',
          service:'reglementsenelec',
          infotransaction:{
            client:{
              transactionPostCash: 40,
              transactionBBS: "transactionId BBS",
              montant:10000,
              numfacture:objet.data.facture,
              police:objet.data.police,
            },

          },
        }
    objet.etats.etat=true;
    objet.etats.load='terminated';
    objet.etats.color='green';
    /*this.detailfacturepostcash = null;
    console.log('Police et Numero Facture : '+objet.data.police+'-'+objet.data.numfacture);
    this.postcashwebservice.detailfacturesenelec(objet.data.police,objet.data.numfacture.toString()).then(postcashwebserviceList => {
      this.detailfacturepostcash = postcashwebserviceList;
      console.log(postcashwebserviceList);
    });
    */
}


/******************************************************************************************************/


validateachatcodewoyofal(objet:any){

      this._postCashService.achatcodewoyofal(objet.data.montant+'',objet.data.compteur+'').then(postcashwebserviceList => {
        if( (typeof postcashwebserviceList.errorCode != "undefined") && postcashwebserviceList.errorCode == "0" && postcashwebserviceList.errorMessage == ""){
        objet.dataI = {
            apiservice:'postecash',
            service:'achatcodewayafal',
            infotransaction:{
              client:{
                transactionPostCash: postcashwebserviceList.transactionId,
                transactionBBS: 'Id BBS',
                codewoyafal: postcashwebserviceList.code,
                montant: objet.data.montant,
                compteur: objet.data.compteur,
              },
            },
          };
          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='green';

        }else{
          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='red';
        }
      });
}

/******************************************************************************************************/


deposer(objet:any){

  console.log("Debut 1- "+JSON.stringify(objet))
  let requete = "1/"+objet.data.montant+"/"+objet.data.num ;

  if (this.repeatedInLastFifteen('om-depot', requete)==1){
    objet.etats.etat=true;
    objet.etats.load='terminated';
    objet.etats.color='red';
    objet.etats.errorCode='r';
    return 0 ;
  }


  this._omService.requerirControllerOM(requete).then( resp => {
    if (resp.status==200){
      console.log("requerirControllerOM : "+resp._body) ;
      if(resp._body.trim()=='0'){
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
        objet.etats.errorCode='0';
      }else
      if(resp._body.match('-12')){
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
        objet.etats.errorCode='-12';
      }
      else
          this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
            let donnee=rep._body.trim().toString();
            console.log("verifierReponseOM : "+donnee) ;
            if(donnee=='1'){
              objet.etats.etat=true;
              objet.etats.load='terminated';
              objet.etats.color='green';
            }
            else{
              if(donnee!='-1'){
                objet.etats.etat=true;
                objet.etats.load='terminated';
                objet.etats.color='red';
                objet.etats.errorCode=donnee;
              }else{
                let periodicVerifierOMDepot = setInterval(()=>{
                  console.log("periodicVerifierOMDepot : "+objet.etats.nbtour) ;
                  objet.etats.nbtour = objet.etats.nbtour + 1 ;
                  this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                    let donnee=rep._body.trim().toString();
                    console.log("verifierReponseOM 1 : "+donnee) ;
                    if(donnee=='1'){
                      objet.etats.etat=true;
                      objet.etats.load='terminated';
                      objet.etats.color='green';
                      clearInterval(periodicVerifierOMDepot) ;
                    }
                    else{
                      if(donnee!='-1'){
                        objet.etats.etat=true;
                        objet.etats.load='terminated';
                        objet.etats.color='red';
                        objet.etats.errorCode=donnee;
                        clearInterval(periodicVerifierOMDepot) ;
                      }
                      if(donnee=='-1' && objet.etats.nbtour>=75){
                        this._omService.demanderAnnulationOM(resp._body.trim().toString()).then(rep =>{
                          let donnee=rep._body.trim().toString();
                          console.log("demanderAnnulationOM : "+donnee) ;
                          if(donnee=="c"){
                            objet.etats.etat=true;
                            objet.etats.load='terminated';
                            objet.etats.color='red';
                            objet.etats.errorCode="c";
                            clearInterval(periodicVerifierOMDepot) ;
                          }
                          else {
                            objet.etats.etat=true;
                            objet.etats.load='terminated';
                            objet.etats.color='red';
                            objet.etats.errorCode="bad";
                            clearInterval(periodicVerifierOMDepot) ;
                          }
                        }) ;
                      }
                    }
                  });
                },2000);
              }
            }
          });
    }
    else{
      console.log("error") ;

    }
  });

}

/*********************************************************************************************************************************************************************************/ 

retrieveOperationInfo(item : any) : string{

  /* OM */
       if(item.data.operateur==2 ){
  
          if (item.etats.errorCode=='r')
            return "Vous venez d'effectuer la même opèration sur le même numéro." ;
  
          if (item.etats.errorCode=='c')
            return "Opèration annulée. La requête n'est pas parvenue au serveur. Veuillez recommencer." ;
  
          if (item.etats.errorCode=='0')
            return "Vous n'êtes pas autorisé à effectuer cette opèration." ;
  
          if (item.etats.errorCode=='-2')
            return "Le client a atteint le nombre maximum de transactions par jour en tant que beneficiaire" ;
          if (item.etats.errorCode=='-3')
            return "Le solde du compte du client ne lui permet pas d'effectuer cette opèration" ;
          if (item.etats.errorCode=='-4')
            return "Le beneficiaire a atteint le montant maximum autorisé par mois" ;
          if (item.etats.errorCode=='-5')
            return "Le montant maximum cumulé de transactions par semaine en tant que beneficiaire a ete atteint par le client" ;
          if (item.etats.errorCode=='-6')
            return "Le destinataire n'est pas un client orangemoney" ;
          if (item.etats.errorCode=='-7')
            return "Probléme de connexion ou code IHM invalide. Veuillez réessayer!" ;
          if (item.etats.errorCode=='-8')
            return "Le client a atteint le nombre maximum de transactions par semaine en tant que beneficiaire" ;
          if (item.etats.errorCode=='-9')
            return "Le client a atteint le nombre maximum de transactions par mois en tant que beneficiaire" ;
  
  //        if (item.etats.errorCode=='-10')
   //         return "Votre requête n'a pas pu être traitée. Vérifiez la conformité des informations saisies!" ;
  
          if (item.etats.errorCode=='-12')
            return "Service actuellement indisponible. Veuillez réessayer plus tard." ;
  
          if (item.etats.errorCode=='-13')
            return "Le code de retrait saisi est incorrect. Veuillez recommencer!" ;
  
         return "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client." ;
      }
  
  /* TC */
       if(item.data.operateur==3 ){
  
          if (item.etats.errorCode=='r')
            return "Vous venez d'effectuer la même opèration sur le même numéro." ;
  
          if (item.etats.errorCode=='c')
            return "Opèration annulée. La requête n'est pas parvenue au serveur. Veuillez recommencer." ;
  
          if (item.etats.errorCode=='0')
            return "Vous n'êtes pas autorisé à effectuer cette opèration." ;
  
          if (item.etats.errorCode=='-2')
            return "Numéro Invalide." ;
          if (item.etats.errorCode=='-3')
            return "Le compte de l'utilisateur ne dispose pas de permissions suffisantes pour recevoir un dépot." ;
          if (item.etats.errorCode=='-4')
            return "Le beneficiaire a atteint le montant maximum autorisé par mois" ;
          if (item.etats.errorCode=='-5')
            return "Le montant maximum cumulé de transactions par semaine en tant que beneficiaire a ete atteint par le client" ;
          if (item.etats.errorCode=='-6')
            return "Le destinataire n'est pas un client orangemoney" ;
          if (item.etats.errorCode=='-7')
            return "Probléme de connexion ou code IHM invalide. Veuillez réessayer!" ;
          if (item.etats.errorCode=='-8')
            return "Le client a atteint le nombre maximum de transactions par semaine en tant que beneficiaire" ;
          if (item.etats.errorCode=='-9')
            return "Le client a atteint le nombre maximum de transactions par mois en tant que beneficiaire" ;
  
  //        if (item.etats.errorCode=='-10')
   //         return "Votre requête n'a pas pu être traitée. Vérifiez la conformité des informations saisies!" ;
  
          if (item.etats.errorCode=='-12')
            return "Service actuellement indisponible. Veuillez réessayer plus tard." ;
  
          if (item.etats.errorCode=='-13')
            return "Le code de retrait saisi est incorrect. Veuillez recommencer!" ;
  
         return "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client." ;
      }
  
  
       if(item.data.operateur==4 ){
  
          if (item.etats.errorCode=='0')
            return "Vous n'êtes pas autorisé à effectuer cette opèration." ;
         return "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client." ;
      }
  
      /* WIZALL */
      if(item.data.operateur==6 ){
        if (item.etats.errorCode=='-12' || item.etats.errorCode==-12)
          return "Impossible de se connecter au serveur du partenaire. Merci de contacter le service client.";
        else if (item.etats.errorCode=='-11' || item.etats.errorCode==-11)
          return "Opèration annulée. La requête n'est pas parvenue au serveur. Merci de contacter le service client." ;
        else if (item.etats.errorCode=='-1' || item.etats.errorCode==-1)
          return "Impossible de se connecter au serveur du partenaire. Merci de réessayer plus tard." ;
        else if (item.etats.errorCode=='500' || item.etats.errorCode==500)
          return "Une erreur a empêché le traitement de votre requête. Réessayez plus tard ou contactez le service client." ;
        else if (item.etats.errorCode=='400' || item.etats.errorCode==400)
          return "Facture dèja payée." ;
        else if (item.etats.errorCode && (typeof item.etats.errorCode == 'string'))
          return item.etats.errorCode;
        return "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client." ;
      }
  
      /* EXPRESSO */
      if(item.data.operateur==7 ){
  
        if (item.etats.errorCode=='-1' || item.etats.errorCode=='1')
          return "Impossible de se connecter au serveur du partenaire. Merci de réessayer plus tard." ;
        if (item.etats.errorCode=='2')
          return "Cette requête n'est pas authorisée" ;
        if (item.etats.errorCode=='51')
          return "Le numéro du destinataire n'est pas authorisé à recevoir de transfert." ;
        if (item.etats.errorCode=='3')
          return "Numéro de téléphone invalide." ;
        if (item.etats.errorCode=='2')
          return "Cette requête n'est pas authorisée" ;
        if (item.etats.errorCode=='7')
          return "Votre compte a été verrouillé, contactez le service client." ;
        if (item.etats.errorCode=='9')
          return "Votre compte est à l'état inactif." ;
  
        return "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client." ;
      }
  
      /* FACTURIER */
      if(item.data.operateur==8 ){
        if (item.etats.errorCode=='-12' || item.etats.errorCode==-12)
          return "Impossible de se connecter au serveur du partenaire. Merci de contacter le service client.";
        else if (item.etats.errorCode=='-11' || item.etats.errorCode==-11)
          return "Opèration annulée. La requête n'est pas parvenue au serveur. Merci de contacter le service client." ;
        else if (item.etats.errorCode=='-1' || item.etats.errorCode==-1)
          return "Impossible de se connecter au serveur du partenaire. Merci de réessayer plus tard." ;
        else if (item.etats.errorCode && (typeof item.etats.errorCode == 'string')) return item.etats.errorCode;
        return "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client." ;
      }
  
  
    }

/******************************************************************************************************/

 retirer(objet:any){
   console.log("*******************************")
  let requete = "2/"+objet.data.numclient+"/"+objet.data.montant ;

  if (this.repeatedInLastFifteen('om-retrait', requete)==1){
    objet.etats.etat=true;
    objet.etats.load='terminated';
    objet.etats.color='red';
    objet.etats.errorCode='r';
    return 0 ;
  }

  this._omService.requerirControllerOM(requete).then( resp => {
    if (resp.status==200){

      console.log("For this 'retrait', we just say : "+resp._body) ;

      if(resp._body.trim()=='0'){
         objet.etats.etat=true;
         objet.etats.load='terminated';
         objet.etats.color='red';
         objet.etats.errorCode='0';
      }else
          if(resp._body.match('-12')){
             objet.etats.etat=true;
             objet.etats.load='terminated';
             objet.etats.color='red';
             objet.etats.errorCode='-12';
          }
          else
            this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
              let donnee=rep._body.trim().toString();
              console.log("Inside verifier retrait: "+donnee) ;
              if(donnee=='1'){
                 objet.etats.etat=true;
                 objet.etats.load='terminated';
                 objet.etats.color='green';
              }
              else{
                if(donnee!='-1'){
                 objet.etats.etat=true;
                 objet.etats.load='terminated';
                 objet.etats.color='red';
                 objet.etats.errorCode=donnee;
                }else{
                    let periodicVerifierOMRetirer = setInterval(()=>{
                      objet.etats.nbtour = objet.etats.nbtour + 1 ;
                    this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                      let donnee=rep._body.trim().toString();
                      console.log("Inside verifier retrait: "+donnee) ;
                      if(donnee=='1'){
                         objet.etats.etat=true;
                         objet.etats.load='terminated';
                         objet.etats.color='green';
                         clearInterval(periodicVerifierOMRetirer) ;
                      }
                      else{
                        if(donnee!='-1'){
                         objet.etats.etat=true;
                         objet.etats.load='terminated';
                         objet.etats.color='red';
                         objet.etats.errorCode=donnee;
                         clearInterval(periodicVerifierOMRetirer) ;
                        }
                          if(donnee=='-1' && objet.etats.nbtour>=75){
                            this._omService.demanderAnnulationOM(resp._body.trim().toString()).then(rep =>{
                              let donnee=rep._body.trim().toString();
                               if(donnee=="c"){
                                 objet.etats.etat=true;
                                 objet.etats.load='terminated';
                                 objet.etats.color='red';
                                 objet.etats.errorCode="c";
                                 clearInterval(periodicVerifierOMRetirer) ;
                               }
                              else {
                                objet.etats.etat=true;
                                objet.etats.load='terminated';
                                objet.etats.color='red';
                                objet.etats.errorCode="bad";
                                clearInterval(periodicVerifierOMRetirer) ;
                              }
                            });
                          }
                      }
                    });
                    },2000);
                }
              }
            });
    }
    else{
      console.log("error") ;
      }
  });

}

/******************************************************************************************************/


 retraitAvecCode(objet:any){
  let requete = "3/"+objet.data.coderetrait+"/"+objet.data.prenom+"/"+objet.data.nomclient+"/"+objet.data.date+"/"+objet.data.cni+"/"+objet.data.num+"/"+objet.data.montant;

  if (this.repeatedInLastFifteen('om-retraitcode', requete)==1) requete = requete+'R' ;

  this._omService.requerirControllerOM(requete).then( resp => {
    if (resp.status==200){
        console.log("For this 'retrait-code', we just say : "+resp._body) ;

      if(resp._body.trim()=='0'){
         objet.etats.etat=true;
         objet.etats.load='terminated';
         objet.etats.color='red';
         objet.etats.errorCode='0';
      }
      else if(resp._body.match('-12')){
             objet.etats.etat=true;
             objet.etats.load='terminated';
             objet.etats.color='red';
             objet.etats.errorCode='-12';
          }
      else
        this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
          let donnee=rep._body.trim().toString();
          console.log("Inside verifier retrait: "+donnee) ;
          if(donnee=='1'){
                 objet.etats.etat=true;
                 objet.etats.load='terminated';
                 objet.etats.color='green';
              }
          else {
            if (donnee != '-1') {
                  objet.etats.etat = true;
                  objet.etats.load = 'terminated';
                  objet.etats.color = 'red';
                  objet.etats.errorCode = donnee;
                }
            else {
              let periodicVerifierOMRetraitCode = setInterval(()=>{
                objet.etats.nbtour = objet.etats.nbtour + 1 ;
                this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                  var donnee=rep._body.trim().toString();
                  console.log("Inside verifier retrait: "+donnee) ;
                  if(donnee=='1'){
                    objet.etats.etat=true;
                    objet.etats.load='terminated';
                    objet.etats.color='green';
                    clearInterval(periodicVerifierOMRetraitCode) ;
                  }else
                  if(donnee!='-1'){
                    objet.etats.etat=true;
                    objet.etats.load='terminated';
                    objet.etats.color='red';
                    objet.etats.errorCode=donnee;
                    clearInterval(periodicVerifierOMRetraitCode) ;
                  }
                  if(donnee=='-1' && objet.etats.nbtour>=75){
                    this._omService.demanderAnnulationOM(resp._body.trim().toString()).then(rep =>{
                      let donnee=rep._body.trim().toString();
                      if(donnee=="c"){
                        objet.etats.etat=true;
                        objet.etats.load='terminated';
                        objet.etats.color='red';
                        objet.etats.errorCode="c";
                        clearInterval(periodicVerifierOMRetraitCode) ;
                      }
                      else {
                        objet.etats.etat=true;
                        objet.etats.load='terminated';
                        objet.etats.color='red';
                        objet.etats.errorCode="bad";
                        clearInterval(periodicVerifierOMRetraitCode) ;
                      }
                    }) ;
                  }
                });
              },2000);
            }
          }
        });
    }
    else{
      console.log("error") ;
    }
  });

}


/******************************************************************************************************/


retraitCpteRecep(objet:any){

  let requete = "4/"+objet.data.numclient+"/"+objet.data.montant;
  if (this.repeatedInLastFifteen('om-retraitcptercpt', requete)==1)
         requete = requete+'R' ;

  this._omService.requerirControllerOM(requete).then( resp => {
    if (resp.status==200){
      if (resp._body.trim().toString()=='1'){
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='green';
        //this.etats.process[objet.id]=objet;
      }
    }
    else
      console.log("error") ;
  });
}

/******************************************************************************************************/


acheterCredit(objet:any){

  let requete = "5/"+objet.data.numclient+"/"+objet.data.montant;
  console.log("Achat de crédit avec : "+requete) ;

  if (this.repeatedInLastFifteen('om-vente-credit', requete)==1)
         requete = requete+'R' ;

  this._omService.requerirControllerOM(requete).then( resp => {
    if (resp.status==200){

          if(resp._body.trim()=='0'){
             objet.etats.etat=true;
             objet.etats.load='terminated';
             objet.etats.color='red';
             objet.etats.errorCode='0';
          }else
          if(resp._body.trim()=='-12'){
             objet.etats.etat=true;
             objet.etats.load='terminated';
             objet.etats.color='red';
             objet.etats.errorCode='-12';
          }
          else
            this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
              let donnee=rep._body.trim().toString();
              console.log("Inside verifier depot : "+donnee) ;
              if(donnee=='1'){
                 objet.etats.etat=true;
                 objet.etats.load='terminated';
                 objet.etats.color='green';
              }
              else{
                if(donnee!='-1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='red';
                   objet.etats.errorCode=donnee;
                 }else{
                      let periodicVerifierOMAcheterCredit = setInterval(()=>{
                      objet.etats.nbtour = objet.etats.nbtour + 1 ;
                      this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                        let donnee=rep._body.trim().toString();
                        console.log("Inside verifier depot : "+donnee) ;
                        if(donnee=='1'){
                           objet.etats.etat=true;
                           objet.etats.load='terminated';
                           objet.etats.color='green';
                           clearInterval(periodicVerifierOMAcheterCredit) ;
                        }
                        else{
                          if(donnee!='-1'){
                           objet.etats.etat=true;
                           objet.etats.load='terminated';
                           objet.etats.color='red';
                           objet.etats.errorCode=donnee;
                           clearInterval(periodicVerifierOMAcheterCredit) ;
                          }
                          if(donnee=='-1' && objet.etats.nbtour>=75){
                            this._omService.demanderAnnulationOM(resp._body.trim().toString()).then(rep =>{
                              let donnee=rep._body.trim().toString();
                               if(donnee=="c"){
                                 objet.etats.etat=true;
                                 objet.etats.load='terminated';
                                 objet.etats.color='red';
                                 objet.etats.errorCode="c";
                                 clearInterval(periodicVerifierOMAcheterCredit) ;
                                 }
                              else{
                                objet.etats.etat=true;
                                objet.etats.load='terminated';
                                objet.etats.color='red';
                                objet.etats.errorCode="bad";
                                clearInterval(periodicVerifierOMAcheterCredit) ;
                              }
                            }) ;
                          }
                        }
                      });
                      },2000);
                 }
              }
            });
    }
    else{
      console.log("error") ;

      }
  });

}


/******************************************************************************************************/



validnabon(objet:any){

  this._tntService.abonner(objet.data.token, objet.data.prenom,objet.data.nomclient, objet.data.tel,objet.data.cni, objet.data.chip, objet.data.carte, objet.data.duree, objet.data.typedebouquet).then( response =>
    {

      let montant:number = 0;
      let typedebouquet = "" ;
      response = JSON.parse(response) ;
      if(response.response=="ok"){

         objet.etats.etat=true;
         objet.etats.load='terminated';
         objet.etats.color='green';

        this._tarifsService.getTarifTntAbon({typedemande:'abonne',typedebouquet:Number(objet.data.typedebouquet),duree:Number(objet.data.duree)})
          .subscribe(
            data => {
              console.log(data);
              if(data.errorCode){
                typedebouquet = data.message.typedebouquetLetter;
                montant = data.message.montant
              }
              else{
                typedebouquet = data.errorMessage;
              }
            },
            error => console.log(error),
            () => {
              objet.dataI = {
                apiservice:'tnt',
                service:'abonnement',
                infotransaction:{
                  client:{
                    transactionBBS: response.idtransactionbbs,
                    prenom:objet.data.prenom,
                    nom:objet.data.nomclient,
                    telephone:objet.data.tel,
                    carte:objet.data.carte,
                    chip:objet.data.chip,
                    typebouquet:typedebouquet,
                    montant: montant,
                    duree:objet.data.duree
                  },

                },
              }
            }
          );


      }else{
         objet.etats.etat=true;
         objet.etats.load='terminated';
         objet.etats.color='red';
         objet.etats.errorCode='0';
    }

    });

}

/******************************************************************************************************/


 vendreDecodeur(objet:any){

  this._tntService.vendreDecodeur(objet.data.token, objet.data.prenom,objet.data.nomclient,objet.data.tel, objet.data.adresse, objet.data.region, objet.data.cni,objet.data.chip,objet.data.carte, objet.data.duree, objet.data.typedebouquet, objet.data.montant).then( response =>
    {
      if(response=="ok"){

         objet.dataI = {
          apiservice:'tnt',
          service:'ventedecodeur',
          infotransaction:{
              client:{
              transactionBBS: 'Id BBS',
              prenom:objet.data.prenom,
              nom:objet.data.nomclient,
              telephone:objet.data.tel,
              chip:objet.data.chip,
              carte:objet.data.carte,
              montant:objet.data.montant,
              typedebouquet:objet.data.typedebouquet,
            },

          },
        } ;

        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='green';

      }else{
         objet.etats.etat=true;
         objet.etats.load='terminated';
         objet.etats.color='red';
         objet.etats.errorCode='0';
      }

    });
}


/******************************************************************************************************/


 vendreCarte(objet:any){
  this._tntService.vendreCarte('55555', objet.data.prenom, objet.data.nomclient,objet.data.tel,objet.data.tel, objet.data.region,objet.data.cni,objet.data.carte, 5000).then( response =>{
      if(response=="ok"){
        objet.dataI = {
          apiservice:'tnt',
          service:'ventecarte',
         infotransaction:{
            client:{
            transactionBBS: 'Id BBS',
            prenom:objet.data.prenom,
            nom:objet.data.nom,
            telephone:objet.data.tel,
            carte:objet.data.carte,
            montant:5000,
          },

        },
      };
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='green';
      }
      else{
         objet.etats.etat=true;
         objet.etats.load='terminated';
         objet.etats.color='red';
         objet.etats.errorCode='0';
      }
  });
}


/**********************************
  TIGO CASH

**********************************/

deposertc(objet:any){

  console.log("Debut 1- "+JSON.stringify(objet))
  let requete = "1/"+objet.data.num+"/"+objet.data.montant ;
  if (this.repeatedInLastFifteen('tc-depot', requete)==1){
    objet.etats.etat=true;
    objet.etats.load='terminated';
    objet.etats.color='red';
    objet.etats.errorCode='r';
    return 0 ;
  }
  this._tcService.requerirControllerTC(requete).then( resp => {
    if (resp.status==200){
      console.log("requerirControllerTC : "+resp._body) ;
      if(resp._body.trim()=='0'){
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
        objet.etats.errorCode='0';
      }else
      if(resp._body.match('-12')){
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
        objet.etats.errorCode='-12';
      }
      else
          this._tcService.verifierReponseTC(resp._body.trim().toString()).then(rep =>{
            let donnee=rep._body.trim().toString();
            console.log("verifierReponseTC : "+donnee) ;
            if(donnee=='1'){
              objet.etats.etat=true;
              objet.etats.load='terminated';
              objet.etats.color='green';
            }
            else{
              if(donnee!='-1'){
                objet.etats.etat=true;
                objet.etats.load='terminated';
                objet.etats.color='red';
                objet.etats.errorCode=donnee;
              }else{
                let periodicVerifierTCDepot = setInterval(()=>{
                  console.log("periodicVerifierTCDepot : "+objet.etats.nbtour) ;
                  objet.etats.nbtour = objet.etats.nbtour + 1 ;
                  this._tcService.verifierReponseTC(resp._body.trim().toString()).then(rep =>{
                    let donnee=rep._body.trim().toString();
                    console.log("verifierReponseTC 1 : "+donnee) ;
                    if(donnee=='1'){
                      objet.etats.etat=true;
                      objet.etats.load='terminated';
                      objet.etats.color='green';
                      clearInterval(periodicVerifierTCDepot) ;
                    }
                    else{
                      if(donnee!='-1'){
                        objet.etats.etat=true;
                        objet.etats.load='terminated';
                        objet.etats.color='red';
                        objet.etats.errorCode=donnee;
                        clearInterval(periodicVerifierTCDepot) ;
                      }
                      if(donnee=='-1' && objet.etats.nbtour>=100){
                        this._tcService.demanderAnnulationTC(resp._body.trim().toString()).then(rep =>{
                          console.log("demanderAnnulationTC : "+rep._body.trim().toString()) ;
                          let donnee=rep._body.trim().toString();
                          if(donnee=="c"){
                            objet.etats.etat=true;
                            objet.etats.load='terminated';
                            objet.etats.color='red';
                            objet.etats.errorCode="c";
                            clearInterval(periodicVerifierTCDepot) ;
                          }
                          else {
                            objet.etats.etat=true;
                            objet.etats.load='terminated';
                            objet.etats.color='red';
                            objet.etats.errorCode="bad";
                            clearInterval(periodicVerifierTCDepot) ;
                          }
                        }) ;
                      }
                    }
                  });
                },2000);
              }
            }
          });
    }
    else{
      console.log("error") ;

    }
  });

}

/******************************************************************************************************/

 retirertc(objet:any){
  let requete = "2/"+objet.data.num+"/"+objet.data.montant ;

  if (this.repeatedInLastFifteen('tc-retrait', requete)==1){
    objet.etats.etat=true;
    objet.etats.load='terminated';
    objet.etats.color='red';
    objet.etats.errorCode='r';
    return 0 ;
  }

  this._tcService.requerirControllerTC(requete).then( resp => {
    if (resp.status==200){

      console.log("For this 'retrait', we just say : "+resp._body) ;

      if(resp._body.trim()=='0'){
         objet.etats.etat=true;
         objet.etats.load='terminated';
         objet.etats.color='red';
         objet.etats.errorCode='0';
      }else
          if(resp._body.match('-12')){
             objet.etats.etat=true;
             objet.etats.load='terminated';
             objet.etats.color='red';
             objet.etats.errorCode='-12';
          }
          else
            this._tcService.verifierReponseTC(resp._body.trim().toString()).then(rep =>{
              let donnee=rep._body.trim().toString();
              console.log("Inside verifier retrait: "+donnee) ;
              if(donnee=='1'){
                 objet.etats.etat=true;
                 objet.etats.load='terminated';
                 objet.etats.color='green';
              }
              else{
                if(donnee!='-1'){
                 objet.etats.etat=true;
                 objet.etats.load='terminated';
                 objet.etats.color='red';
                 objet.etats.errorCode=donnee;
                }else{
                  let periodicVerifierTCRetirer = setInterval(()=>{
                    console.log("periodicVerifierTCRetirer : "+objet.etats.nbtour) ;
                    objet.etats.nbtour = objet.etats.nbtour + 1 ;
                    this._tcService.verifierReponseTC(resp._body.trim().toString()).then(rep =>{
                      let donnee=rep._body.trim().toString();
                      console.log("Inside verifier retrait: "+donnee) ;
                      if(donnee=='1'){
                         objet.etats.etat=true;
                         objet.etats.load='terminated';
                         objet.etats.color='green';
                         clearInterval(periodicVerifierTCRetirer) ;
                      }
                      else{
                        if(donnee!='-1'){
                         objet.etats.etat=true;
                         objet.etats.load='terminated';
                         objet.etats.color='red';
                         objet.etats.errorCode=donnee;
                         clearInterval(periodicVerifierTCRetirer) ;
                        }
                        if(donnee=='-1' && objet.etats.nbtour>=100){
                          this._tcService.demanderAnnulationTC(resp._body.trim().toString()).then(rep =>{
                            console.log("demanderAnnulationTC : "+rep._body.trim().toString()) ;
                            let donnee=rep._body.trim().toString();
                            if(donnee=="c"){
                              objet.etats.etat=true;
                              objet.etats.load='terminated';
                              objet.etats.color='red';
                              objet.etats.errorCode="c";
                              clearInterval(periodicVerifierTCRetirer) ;
                            }
                            else {
                              objet.etats.etat=true;
                              objet.etats.load='terminated';
                              objet.etats.color='red';
                              objet.etats.errorCode="bad";
                              clearInterval(periodicVerifierTCRetirer) ;
                            }
                          }) ;
                        }
                      }
                    });
                    },2000);
                }
              }
            });
    }
    else{
      console.log("error") ;

      }
  });

}

retraitaveccodetc(objet:any){
  let requete = "4/"+objet.data.coderetrait+"/"+objet.data.typepiece+"/"+objet.data.numeropiece+"/"+objet.data.montant+"/"+objet.data.num;
  console.log(requete);
  if (this.repeatedInLastFifteen('tc-retrait', requete)==1){
    objet.etats.etat=true;
    objet.etats.load='terminated';
    objet.etats.color='red';
    objet.etats.errorCode='r';
    return 0 ;
  }

  this._tcService.requerirControllerTC(requete).then( resp => {
    if (resp.status==200){

      console.log("For this 'retrait', we just say : "+resp._body) ;

      if(resp._body.trim()=='0'){
         objet.etats.etat=true;
         objet.etats.load='terminated';
         objet.etats.color='red';
         objet.etats.errorCode='0';
      }else
          if(resp._body.match('-12')){
             objet.etats.etat=true;
             objet.etats.load='terminated';
             objet.etats.color='red';
             objet.etats.errorCode='-12';
          }
          else
            this._tcService.verifierReponseTC(resp._body.trim().toString()).then(rep =>{
              let donnee=rep._body.trim().toString();
              console.log("Inside verifier retrait: "+donnee) ;
              if(donnee=='1'){
                 objet.etats.etat=true;
                 objet.etats.load='terminated';
                 objet.etats.color='green';
              }
              else{
                if(donnee!='-1'){
                 objet.etats.etat=true;
                 objet.etats.load='terminated';
                 objet.etats.color='red';
                 objet.etats.errorCode=donnee;
                }else{
                  let periodicVerifierTCRetraitCode = setInterval(()=>{
                    console.log("periodicVerifierTCRetraitCode : "+objet.etats.nbtour) ;
                    objet.etats.nbtour = objet.etats.nbtour + 1 ;
                    this._tcService.verifierReponseTC(resp._body.trim().toString()).then(rep =>{
                      let donnee=rep._body.trim().toString();
                      console.log("Inside verifier retrait: "+donnee) ;
                      if(donnee=='1'){
                         objet.etats.etat=true;
                         objet.etats.load='terminated';
                         objet.etats.color='green';
                         clearInterval(periodicVerifierTCRetraitCode) ;
                      }
                      else{
                        if(donnee!='-1'){
                         objet.etats.etat=true;
                         objet.etats.load='terminated';
                         objet.etats.color='red';
                         objet.etats.errorCode=donnee;
                         clearInterval(periodicVerifierTCRetraitCode) ;
                        }
                        if(donnee=='-1' && objet.etats.nbtour>=100){
                          this._tcService.demanderAnnulationTC(resp._body.trim().toString()).then(rep =>{
                            console.log("demanderAnnulationTC : "+rep._body.trim().toString()) ;
                            let donnee=rep._body.trim().toString();
                            if(donnee=="c"){
                              objet.etats.etat=true;
                              objet.etats.load='terminated';
                              objet.etats.color='red';
                              objet.etats.errorCode="c";
                              clearInterval(periodicVerifierTCRetraitCode) ;
                            }
                            else {
                              objet.etats.etat=true;
                              objet.etats.load='terminated';
                              objet.etats.color='red';
                              objet.etats.errorCode="bad";
                              clearInterval(periodicVerifierTCRetraitCode) ;
                            }
                          }) ;
                        }
                      }
                    });
                    },2000);
                }
              }
            });
         }
    else{
      console.log("error") ;

      }
  });

}

 creditIZItc(objet:any){
  let requete = "5/"+objet.data.num+"/"+objet.data.montant ;

  this._tcService.requerirControllerTC(requete).then( resp => {
    if (resp.status==200){

      console.log("For this 'retrait', we just say : "+resp._body) ;

      if(resp._body.trim()=='0'){
         objet.etats.etat=true;
         objet.etats.load='terminated';
         objet.etats.color='red';
         objet.etats.errorCode='0';
      }else
          if(resp._body.match('-12')){
             objet.etats.etat=true;
             objet.etats.load='terminated';
             objet.etats.color='red';
             objet.etats.errorCode='-12';
          }
          else
            this._tcService.verifierReponseTC(resp._body.trim().toString()).then(rep =>{
              let donnee=rep._body.trim().toString();
              console.log("Inside verifier retrait: "+donnee) ;
              if(donnee=='1'){
                 objet.etats.etat=true;
                 objet.etats.load='terminated';
                 objet.etats.color='green';
              }
              else{
                if(donnee!='-1'){
                 objet.etats.etat=true;
                 objet.etats.load='terminated';
                 objet.etats.color='red';
                 objet.etats.errorCode=donnee;
                }else{
                  let periodicVerifierTCRechargeIZI = setInterval(()=>{
                    console.log("periodicVerifierTCRechargeIZI : "+objet.etats.nbtour) ;
                    objet.etats.nbtour = objet.etats.nbtour + 1 ;
                    this._tcService.verifierReponseTC(resp._body.trim().toString()).then(rep =>{
                      let donnee=rep._body.trim().toString();
                      console.log("Inside verifier retrait: "+donnee) ;
                      if(donnee=='1'){
                         objet.etats.etat=true;
                         objet.etats.load='terminated';
                         objet.etats.color='green';
                         clearInterval(periodicVerifierTCRechargeIZI) ;
                      }
                      else{
                        if(donnee!='-1'){
                         objet.etats.etat=true;
                         objet.etats.load='terminated';
                         objet.etats.color='red';
                         objet.etats.errorCode=donnee;
                         clearInterval(periodicVerifierTCRechargeIZI) ;
                        }
                        if(donnee=='-1' && objet.etats.nbtour>=100){
                          this._tcService.demanderAnnulationTC(resp._body.trim().toString()).then(rep =>{
                            console.log("demanderAnnulationTC : "+rep._body.trim().toString()) ;
                            let donnee=rep._body.trim().toString();
                            if(donnee=="c"){
                              objet.etats.etat=true;
                              objet.etats.load='terminated';
                              objet.etats.color='red';
                              objet.etats.errorCode="c";
                              clearInterval(periodicVerifierTCRechargeIZI) ;
                            }
                            else {
                              objet.etats.etat=true;
                              objet.etats.load='terminated';
                              objet.etats.color='red';
                              objet.etats.errorCode="bad";
                              clearInterval(periodicVerifierTCRechargeIZI) ;
                            }
                          }) ;
                        }
                      }
                    });
                    },2000);
                }
              }
            });
    }
    else{
      console.log("error") ;

      }
  });

}

/******************************************************************************************************/

  /************************************ Debut Wizall ******************************************************************/

  cashInWizall(objet : any){
    console.log('cashInWizall');
    this._wizallService.intouchCashin("test 1", objet.data.num, objet.data.montant).then( response =>{
      if(typeof response !== 'object') {
        objet.etats.errorCode = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
      }
      else if(response.commission!=undefined){
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='green';
      }
      else{
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
        objet.etats.errorCode=500;
      }
    }).catch(response => {
      objet.etats.errorCode == response;
      objet.etats.etat=true;
      objet.etats.load='terminated';
      objet.etats.color='red';
    });
  }

  cashOutWizall(objet : any){
    console.log('cashOutWizall');
    this._wizallService.intouchCashout(objet.data.num, objet.data.montant).then( response =>{
      console.log("*************************") ;
      if(typeof response !== 'object') {
        objet.etats.errorCode = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
      }
      else if(response.commission!=undefined){
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='green';
      }
      else{
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
        objet.etats.errorCode=500;
      }
    }).catch(response => {
      objet.etats.errorCode == response;
      objet.etats.etat=true;
      objet.etats.load='terminated';
      objet.etats.color='red';
    });
  }

  validerenvoibon(objet:any){
    this._wizallService.validerenvoiboncash(objet).then(response =>{
      console.log("Envoi de bon via Accueil!");
      if(typeof response !== 'object') {
        objet.etats.errorCode = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
      }
      else if(response.status=="valid"){
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='green';
      }
      else if(response.code !== undefined && JSON.parse(response.code).status && JSON.parse(response.code).status=="valid"){
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='green';
      }
      else if(response.code !== undefined && JSON.parse(response.code).code && JSON.parse(response.code).code==500){
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
        objet.etats.errorCode = JSON.parse(response.code).error
      }
      else{
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
      }
    }).catch(response => {
      objet.etats.errorCode == response;
      objet.etats.etat=true;
      objet.etats.load='terminated';
      objet.etats.color='red';
    });
  }

  validationretraitbon(objet:any){
    this._wizallService.bonDebitVoucher(objet.data).then(response =>{
      console.log("Retrait de bon via Accueil!");
      if(typeof response !== 'object') {
        objet.etats.errorCode = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
      }
      else if( response.timestamp != undefined ){
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='green';
      }else{
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
        objet.etats.errorCode = 500

      }
    }).catch(response => {
      objet.etats.errorCode == response;
      objet.etats.etat=true;
      objet.etats.load='terminated';
      objet.etats.color='red';
    });

  }

  validerbonachat(objet:any){
    this._wizallService.validerbonachat(objet).then(response =>{
      objet.etats.etat=true;
      objet.etats.load='terminated';
      objet.etats.color='green';
    });
  }


/******************************** E-MONEY ************************************/

public cashInEmoney(objet){
  this.expressocashwebservice.cashin(objet.data.numclient, objet.data.mnt).then(expressocashwebserviceList => {
    if(!expressocashwebserviceList.match("cURL Error #:")){
      let infoDepot = JSON.parse(JSON.parse(expressocashwebserviceList));
      console.log(infoDepot) ;
      if(infoDepot.status==0){
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='green';
      }
      else{
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
        objet.etats.errorCode=infoDepot.status.toString();
      }
    }
    else{
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
       objet.etats.errorCode="-100";
    }
  });

}

public cashOutEmoney(objet:any){
  this.expressocashwebservice.confirmCashout(objet.data.transactionReference, objet.data.OTP,parseInt(objet.data.montant),objet.data.tel).then(expressocashwebserviceList => {
     console.log(expressocashwebserviceList);
    if(expressocashwebserviceList!="" && typeof expressocashwebserviceList!='boolean'){
        if(!expressocashwebserviceList.match("cURL Error #:")){
      let infoRetraitsimpleconfirm = JSON.parse(JSON.parse(expressocashwebserviceList));
      if(infoRetraitsimpleconfirm.status==0){
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='green';
      }
      else{
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
        objet.etats.errorCode=infoRetraitsimpleconfirm.status.toString();
      }
        }
       else{
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
        objet.etats.errorCode="-100";
      }
    }else{
     console.log("vide ou bool");
   }
  });

}

public cashOutPIN(objet:any){
  this.expressocashwebservice.pinCashout(objet.data.pin, objet.data.cni,objet.data.montant,objet.data.tel).then(expressocashwebserviceList => {
    console.log(expressocashwebserviceList);
    if(!expressocashwebserviceList.match("cURL Error #:")){
      let infoRetraitaveccodeconfirm = JSON.parse(JSON.parse(expressocashwebserviceList));
      if(infoRetraitaveccodeconfirm.status==0){
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='green';
      }
      else{
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
        objet.etats.errorCode=infoRetraitaveccodeconfirm.status.toString();
      }
    }
    else{
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
        objet.etats.errorCode="-100";
    }
  });
}


  /***************************Debut FACTURIERS ******************************/

  paiemantsde(objet){
   /* this._facturierService.paimentsde(Number(objet.data.montant),objet.data.reference_client,objet.data.reference_facture,objet.data.service).then( resp =>{
      console.log("********************************************************")
      console.log(resp) ;

      if( (typeof resp !== 'object') && (typeof resp !== 'number') && (typeof resp === 'string') && !resp.match("transactionid")) {
        objet.etats.errorCode = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
      }
      else if( ( typeof resp.transactionid != "undefined" ) ||  ((typeof resp === 'string') && resp.match("transactionid"))){
        objet.dataI = {
          apiservice:'facturier',
          service:'sde',
          infotransaction:{
            client:{
              transactionApi: resp.transactionid,
              transactionBBS: 'x-x-x-x',
              reference_client: resp.reference_client,
              reference_facture: resp.reference_facture,
              client: resp.prenom+" "+resp.nom,
              date_echeance: resp.date_echeance,
              montant: resp.montant,
            },

          },
        }
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='green';

      }else{
        objet.etats.errorCode = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
      }
    }).catch(response => {
      objet.etats.errorCode = response;
      objet.etats.etat=true;
      objet.etats.load='terminated';
      objet.etats.color='red';
    });*/
  }

  validerrapido(objet){
    console.log(objet);
    this._facturierService.validerrapido(objet.data.numclient,objet.data.montant,objet.data.badge).then(response =>{
      console.log(response);
      if(typeof response !== 'object') {
        objet.etats.errorCode = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
      }
      else if(response.errorCode==0){
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='green';
      }else{
        objet.etats.errorCode = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
      }
    }).catch(response => {
      console.log(response);
      objet.etats.errorCode = response;
      objet.etats.etat=true;
      objet.etats.load='terminated';
      objet.etats.color='red';
    });
  }

  payeroolusolar(objet){
    this._facturierService.payeroolusolar("00221"+objet.data.telephone.toString(),objet.data.compte,objet.data.montant).then(response =>{
      console.log(response);
      let Response = JSON.parse(response);
      console.log(Response);

      if(Response.errorCode==0){
          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='green';
      }else{
          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='red';
          objet.etats.errorCode=Response.errorMessage;
      }
    });
  }

  validerpaimentsenelec(objet){
   /* this._facturierService.validerpaimentsenelec(objet.data.montant,objet.data.police,objet.data.num_facture,objet.data.service).then(resp =>{
      if(typeof resp !== 'object') {
        objet.etats.errorCode = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
      }
      else if( typeof resp.transactionid != "undefined" ){
        objet.dataI = {
          apiservice:'facturier',
          service:'senelec',
          infotransaction:{
            client:{
              transactionApi: resp.transactionid,
              transactionBBS: 'x-x-x-x',
              police: resp.police,
              numfacture: resp.numfacture,
              client: resp.client,
              montant: resp.montant,
              dateecheance: resp.dateecheance,
            },

          },
        }
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='green';

      }else{
        objet.etats.errorCode = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
      }
    }).catch(response => {
      console.log(response);
      objet.etats.errorCode = response;
      objet.etats.etat=true;
      objet.etats.load='terminated';
      objet.etats.color='red';
    });*/
  }

  validerwoyofal(objet){
   /* this._facturierService.validerwoyofal(objet.data.montant, objet.data.compteur).then(response =>{
      console.log(response) ;
      if(typeof response !== 'object') {
        objet.etats.errorCode = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
      }
      else if( (typeof response.errorCode != "undefined") && response.errorCode == "0" && response.errorMessage == ""){
        objet.dataI = {
          apiservice:'facturier',
          service:'achatcodewayafal',
          infotransaction:{
            client:{
              transactionPostCash: response.transactionId,
              transactionBBS: 'x-x-x-x',
              codewoyafal: response.code,
              montant: objet.data.montant,
              compteur: objet.data.compteur,
            },
          },
        };
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='green';
      }
      else if(typeof response.errorMessage == "string"){
        objet.etats.errorCode = response.errorMessage
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
      }
      else{
        objet.etats.errorCode = "Votre requête n'a pas pu être traitée correctement. Merci de contacter le service client."
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
      }
    }).catch(response => {
      console.log(response);
      objet.etats.errorCode = response;
      objet.etats.etat=true;
      objet.etats.load='terminated';
      objet.etats.color='red';
    });*/
  }

  /**************************************FIN****************************************/

  repeatedInLastFifteen(operation : any, incomingRequest : any) : number{

    let today = Number( Date.now() ) ;
    let omOps = [] ;
    console.log(localStorage.getItem(operation)) ;

    if (localStorage.getItem(operation)==null ){
      localStorage.setItem(operation, JSON.stringify([{requete:incomingRequest, tstamp:today}]) );
      return 0 ;
    }else{
      omOps = JSON.parse( localStorage.getItem(operation) ) ;
      for (let i=0 ; i<omOps.length ; i++){
        if (omOps[i].requete==incomingRequest){
          let ilYa15Minutes = today - this.quinzeMinutes;

          let diff =  today - omOps[i].tstamp  ;

//          console.log("Diff vaut "+diff) ;

          if (  diff < this.quinzeMinutes ){
            return 1 ;
          }else{
            omOps[i].tstamp = today ;
            localStorage.setItem(operation, JSON.stringify(omOps) );
            return 0;
          }
        }
      }
      omOps.push({requete:incomingRequest, tstamp:today}) ;
      localStorage.setItem(operation, JSON.stringify(omOps) );
      return 0 ;
    }
  }
/******************************************************************************************************/


finprocess(etat:any,imprime:any){
  if(etat.data.operateur==5){
      this.router.navigate(['/accueil','panier']);
    }
 if(etat.etats.etat==true){

 if(etat.etats.etat==true){

   if(etat.data.operateur!=2 && etat.data.operateur!=6 && etat.data.operateur!=3 && etat.data.operateur!=1 && etat.etats.color=='green'){

     sessionStorage.setItem('dataImpression', JSON.stringify(imprime));
     this.router.navigate(['accueil']);
     setTimeout(()=>this.router.navigate(['accueil/impression']),100);
    }

     }
     console.log(etat.etats.id);
  }
}


/*********************************/
/*********************************/

    annulerOperation(){
      console.log("Opèration annulée ...") ;
    }

    color(i:number):string{
      if(i%2==0){
        return "border-left:2px solid green";
      }
      else{
        return "border-left:2px solid blue";
      }
    }

    getFormatted( designation) : string {
      if(designation.length>16)
        return designation.substring(0, 13)+'...' ;

      return designation ;
    }

    currency(prix:number){
    return Number(prix).toLocaleString();
    }
}

