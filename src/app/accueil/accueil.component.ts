import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {TntService} from "../services/tnt.service";
import {PostCashService} from "../services/postcash.service";
import {WizallService} from "../services/wizall.service";
import {OrangemoneyService} from "../services/orangemoney.service";
import {TigocashService} from "../services/tigocash.service";
import { ExpressocashService } from "../services/expressocash.service";
import {FacturierService} from "../services/facturier.service";
import {UtilsService} from "../services/utils.service";

import { ModalDirective } from 'ng2-bootstrap/modal';


class Article {
  public id:number;
  public nomImg:string;
  public designation:string;
  public description:string;
  public prix:number;
  public quantite:number;
}

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  articles=[];
  process=[];
   quinzeMinutes = 900000;
  registredAPIs : string [] = ['POSTECASH', 'ORANGEMONEY', 'E-MONEY', 'TIGOCASH', 'WIZALL'] ;

  authorisedToUseCRM = false ;
  load="loader";
  actif = -1 ;
  dataImpression:any;
  latitude : any ;
  longitude :any ;
  accuracy :any ;


  @ViewChild('newoperation') public newOperation:ElementRef;


  localisation : any ;
  messageGeolocation : any ;


  constructor(private _postCashService: PostCashService, private _tntService:TntService, private router: Router, private _wizallService : WizallService, private _omService:OrangemoneyService, private _tcService: TigocashService, private expressocashwebservice : ExpressocashService, private _facturierService : FacturierService, private utilitaire : UtilsService){}

/******************************************************************************************************/


  ngOnInit() {
    localStorage.removeItem('om-depot') ;
    localStorage.removeItem('om-retrait') ;

    localStorage.removeItem('tc-depot') ;
    localStorage.removeItem('tc-retrait') ;

    if (!sessionStorage.getItem('currentUser'))
       this.router.navigate(['']);
    this.processus();
  }

/*******************************************************************************************************/

geolocaliser(){
  console.log("appel") ;
  if(navigator.geolocation){
      console.log("appel geolocation") ;
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude ;
        this.longitude = position.coords.longitude ;
        this.accuracy = position.coords.accuracy ;
        console.log(this.latitude+ ' ET '+ this.longitude);
        this.utilitaire.recordGeospatialCoords({latitude:this.latitude, longitude:this.longitude, accuracy:this.accuracy}).then(response=>{
          if(response._body.match("done")){
          this.messageGeolocation = "Votre Point a été Géolocalisé." ;
          this.ouvrir() ;
          }
          console.log(response) ;

        }) ;
      }, function error(msg){alert('Veuillez activer la geolocalisation sur votre navigateur.');}, 
      {maximumAge:600000, timeout:5000, enableHighAccuracy: true} );

   }else{
       this.messageGeolocation = "Votre navigateur empêche la géolocalisation. Veuillez contacter votre conseiller clientéle pour vous aider." ;
        this.ouvrir() ;
  }
}


  @ViewChild('testContainer') public testContainer:ElementRef;

  ajouterBlock() {
    this.testContainer.nativeElement.appendChild(this.newOperation.nativeElement);
  }


  @ViewChild('viewMore') public successModal:ModalDirective;

  ouvrir(){
      this.successModal.show() ;
  }

  closeModal(){
      this.successModal.hide() ;
  }

/******************************************************************************************************/

  processus(){

    setInterval(()=>{

    if(sessionStorage.getItem('curentProcess')!="" && sessionStorage.getItem('curentProcess')!=undefined){
      let mag=JSON.parse(sessionStorage.getItem('curentProcess')).operateur;
      let infoOperation:any;
     if(mag==5){
          infoOperation={'etat':false,'id':this.process.length,'load':'fa fa-shopping-cart fa-2x pull-left','color':'', 'errorCode':'*'};
      }
     else{
           infoOperation={'etat':false,'id':this.process.length,'load':'loader','color':'', 'errorCode':'*', nbtour:0};
      }
      let sesion={'data':JSON.parse(sessionStorage.getItem('curentProcess')),'etats':infoOperation,'dataI':''};
     // var newprocess={'operation':sesion.operation,'montant':sesion.montant,'num':sesion.num};

     if(sesion.data.operateur==5){
        this.articles.push(sesion);
        sessionStorage.setItem('panier',JSON.stringify(this.articles));
        console.log(this.articles);
        if(this.articles.length==1){
          this.process.push(sesion);
        }
      }
      else{
           this.process.push(sesion);
      }

      console.log(sesion.etats.id);
      sessionStorage.removeItem('curentProcess');
      var operateur=sesion.data.operateur;
      switch(operateur){
        case 1:{
                var operation=sesion.data.operation;
                switch(operation){
                  case 1:{
                        this.validrechargementespece(sesion);
                        break;
                  }
                  case 2:{
                        this.validateachatjula(sesion);
                        break;
                  }
                  case 3:{
                        this.validatedetailfacturesenelec(sesion);
                        break;
                  }
                  case 4:{
                        this.validateachatcodewoyofal(sesion);
                        break;
                  }
                  default:break;
                }
                   break ;
        }

        case 2:{
             var operation=sesion.data.operation;

              switch(operation){
                case 1:{
                       this.deposer(sesion);
                       break;
                       }
                case 2:{
                       this.retirer(sesion);
                       break;
                }
                case 3:{
                       this.retraitAvecCode(sesion);
                       break;
                }
                case 4:{
                       this.retraitCpteRecep(sesion);
                       break;
                }
                case 5:{
                       this.acheterCredit(sesion);
                       break;
                }
                default :break;
              }
               break ;
        }

        case 3:{
             var operation=sesion.data.operation;

              switch(operation){
                case 1:{
                       this.deposertc(sesion);
                       break;
                       }
                case 2:{
                       this.retirertc(sesion);
                       break;
                }
                case 5:{
                        this.creditIZItc(sesion) ;
                        break ;
                       }
                default :break;
              }
               break ;
        }


       case 4:{
             var operation=sesion.data.operation;
             console.log("here we go ...") ;
             console.log(sesion) ;
             switch(operation){
              case 1:{
                   this.validnabon(sesion);
                   break;
              }
              case 2:{
                  this.vendreDecodeur(sesion);
                  break;
              }
              case 3:{
                  this.vendreCarte(sesion);
                  break;
              }
              default : break;
             }
             break ;
       }

       case 6:{
             var operation=sesion.data.operation;
         console.log(sesion);
         console.log('Willa');
             switch(operation){
              case 1:{
                   this.cashInWizall(sesion);
                   break;
              }
              case 2:{
                  this.cashOutWizall(sesion);
                  break;
              }
              case 3:{
                  this.payerSDEWizall(sesion);
                  break;
              }
              case 4:{
                  this.payerSenelecWizall(sesion);
                  break;
              }
              case 5:{
                 this.validationretraitbon(sesion);
                 break;
              }
              case 6:{
                
                  this.validerenvoibon(sesion);
                  break;
              }
              case 7:{
                 
                  this.validerbonachat(sesion);
                  break;
              }
              default : break;
             }
           break ;
       }

       case 7:{
             var operation=sesion.data.operation;
         console.log(sesion);
         console.log('E-money');
             switch(operation){
              case 1:{
                   this.cashInEmoney(sesion);
                   break;
              }
              case 2:{
                  this.cashOutEmoney(sesion);
                  break;
              }
              case 3:{
                  this.cashOutPIN(sesion);
                  break;
              }
              default : break;
             }
       }

       case 8:{
         var operation=sesion.data.operation;
         console.log(sesion);
         console.log('FACTURIER');

         switch(operation){
              case 1:{
                   this.paiemantsde(sesion);
                   break;
              }
              case 2:{
                  this.validerrapido(sesion);
                  break;
              }
              case 3:{
                  this.validerwoyofal(sesion);
                  break;
              }
              case 4:{
                  this.validerpaimentsenelec(sesion);
                  break;
              }
              case 5:{
                  this.payeroolusolar(sesion);
                  break;
              }
              default : break;
          }
       }

        default:break;
      }
    }
    else{
     console.log('not nice');
    }
  },3000);

  }


/******************************************************************************************************/

   totalpanier(){
		  let total=0;
		  for(let i=0;i<this.articles.length;i++){
			 total+=this.articles[i].data.prix*this.articles[i].data.quantite;
			 }
			return total;
      }
  deposer(objet:any){

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
           console.log("For this 'depot', we just say : "+resp._body) ;
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

           setTimeout(()=>{
              this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                var donnee=rep._body.trim().toString();
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
                        var periodicVerifier = setInterval(()=>{
                        objet.etats.nbtour = objet.etats.nbtour + 1 ;
                        this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                          var donnee=rep._body.trim().toString();
                          console.log("Inside verifier depot : "+donnee) ;
                          if(donnee=='1'){
                             objet.etats.etat=true;
                             objet.etats.load='terminated';
                             objet.etats.color='green';
                             clearInterval(periodicVerifier) ;
                          }
                          else{
                            if(donnee!='-1'){
                             objet.etats.etat=true;
                             objet.etats.load='terminated';
                             objet.etats.color='red';
                             objet.etats.errorCode=donnee;
                             clearInterval(periodicVerifier) ;
                            }
                            if(donnee=='-1' && objet.etats.nbtour>=70){
                              this._omService.demanderAnnulationOM(resp._body.trim().toString()).then(rep =>{
                                var donnee=rep._body.trim().toString();
                                 if(donnee=="c"){
                                   objet.etats.etat=true;
                                   objet.etats.load='terminated';
                                   objet.etats.color='red';
                                   objet.etats.errorCode="c";
                                   clearInterval(periodicVerifier) ;
                                   }
                              }) ;
                            }
                          }
                        });
                        },2000);
                   }
                }
              });

           },5000);
      }
      else{
        console.log("error") ;

        }
    });

  }


/******************************************************************************************************/

   retirer(objet:any){
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

           setTimeout(()=>{

              this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                var donnee=rep._body.trim().toString();
                console.log("Inside verifier retrait: "+donnee) ;
                if(donnee=='1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='green';
                   clearInterval(periodicVerifier) ;
                }
                else{
                  if(donnee!='-1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='red';
                   objet.etats.errorCode=donnee;
                   clearInterval(periodicVerifier) ;
                  }else{
                      var periodicVerifier = setInterval(()=>{
                        objet.etats.nbtour = objet.etats.nbtour + 1 ;
                      this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                        var donnee=rep._body.trim().toString();
                        console.log("Inside verifier retrait: "+donnee) ;
                        if(donnee=='1'){
                           objet.etats.etat=true;
                           objet.etats.load='terminated';
                           objet.etats.color='green';
                           clearInterval(periodicVerifier) ;
                        }
                        else{
                          if(donnee!='-1'){
                           objet.etats.etat=true;
                           objet.etats.load='terminated';
                           objet.etats.color='red';
                           objet.etats.errorCode=donnee;
                           clearInterval(periodicVerifier) ;
                          }
                            if(donnee=='-1' && objet.etats.nbtour>=70){
                              this._omService.demanderAnnulationOM(resp._body.trim().toString()).then(rep =>{
                                var donnee=rep._body.trim().toString();
                                 if(donnee=="c"){
                                   objet.etats.etat=true;
                                   objet.etats.load='terminated';
                                   objet.etats.color='red';
                                   objet.etats.errorCode="c";
                                   clearInterval(periodicVerifier) ;
                                   }
                              }) ;
                            }
                        }
                      });
                      },2000);
                  }
                }
              });

           },20000);
      }
      else{
        console.log("error") ;

        }
    });

  }

/******************************************************************************************************/


   retraitAvecCode(objet:any){
    let requete = "3/"+objet.data.coderetrait+"/"+objet.data.prenom+"/"+objet.data.nomclient+"/"+objet.data.date+"/"+objet.data.cni+"/"+objet.data.num+"/"+objet.data.montant;

    if (this.repeatedInLastFifteen('om-retraitcode', requete)==1)
           requete = requete+'R' ;

    this._omService.requerirControllerOM(requete).then( resp => {
      if (resp.status==200){
          console.log("For this 'retrait-code', we just say : "+resp._body) ;

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

           setTimeout(()=>{

              this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                var donnee=rep._body.trim().toString();
                console.log("Inside verifier retrait: "+donnee) ;
                if(donnee=='1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='green';
                   clearInterval(periodicVerifier) ;
                }
                else
                  if(donnee!='-1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='red';
                   objet.etats.errorCode=donnee;
                   clearInterval(periodicVerifier) ;
                  }else
                var periodicVerifier = setInterval(()=>{
                objet.etats.nbtour = objet.etats.nbtour + 1 ;
                this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                  var donnee=rep._body.trim().toString();
                  console.log("Inside verifier retrait: "+donnee) ;
                  if(donnee=='1'){
                     objet.etats.etat=true;
                     objet.etats.load='terminated';
                     objet.etats.color='green';
                     clearInterval(periodicVerifier) ;
                  }else
                    if(donnee!='-1'){
                       objet.etats.etat=true;
                       objet.etats.load='terminated';
                       objet.etats.color='red';
                       objet.etats.errorCode=donnee;
                       clearInterval(periodicVerifier) ;
                    }
                    if(donnee=='-1' && objet.etats.nbtour>=70){
                      this._omService.demanderAnnulationOM(resp._body.trim().toString()).then(rep =>{
                        var donnee=rep._body.trim().toString();
                         if(donnee=="c"){
                           objet.etats.etat=true;
                           objet.etats.load='terminated';
                           objet.etats.color='red';
                           objet.etats.errorCode="c";
                           clearInterval(periodicVerifier) ;
                           }
                      }) ;
                    }
                });
                },2000);
              });
             },5000);
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
           setTimeout(()=>{
              this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                var donnee=rep._body.trim().toString();
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
                        var periodicVerifier = setInterval(()=>{
                        objet.etats.nbtour = objet.etats.nbtour + 1 ;
                        this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                          var donnee=rep._body.trim().toString();
                          console.log("Inside verifier depot : "+donnee) ;
                          if(donnee=='1'){
                             objet.etats.etat=true;
                             objet.etats.load='terminated';
                             objet.etats.color='green';
                             clearInterval(periodicVerifier) ;
                          }
                          else{
                            if(donnee!='-1'){
                             objet.etats.etat=true;
                             objet.etats.load='terminated';
                             objet.etats.color='red';
                             objet.etats.errorCode=donnee;
                             clearInterval(periodicVerifier) ;
                            }
                            if(donnee=='-1' && objet.etats.nbtour>=70){
                              this._omService.demanderAnnulationOM(resp._body.trim().toString()).then(rep =>{
                                var donnee=rep._body.trim().toString();
                                 if(donnee=="c"){
                                   objet.etats.etat=true;
                                   objet.etats.load='terminated';
                                   objet.etats.color='red';
                                   objet.etats.errorCode="c";
                                   clearInterval(periodicVerifier) ;
                                   }
                              }) ;
                            }
                          }
                        });
                        },2000);
                   }
                }
              });

           },5000);
      }
      else{
        console.log("error") ;

        }
    });

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


/******************************************************************************************************/


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

     	   this.process.splice(etat.etats.id,1);
         for (let i=0 ; i<this.process.length ; i++){
          if(this.process[i].etats.id > etat.etats.id)
            this.process[i].etats.id = this.process[i].etats.id - 1 ;
         }
    	   console.log(etat.etats.id);
    }
  }
}


/******************************************************************************************************/



  validnabon(objet:any){

    this._tntService.abonner(objet.data.token, objet.data.prenom,objet.data.nomclient, objet.data.tel,objet.data.cni, objet.data.chip, objet.data.carte, objet.data.duree, objet.data.typedebouquet).then( response =>
      {

        let typedebouquet = "" ;
        response = JSON.parse(response) ;
        console.log(response);
        if(response.response=="ok"){

           objet.etats.etat=true;
           objet.etats.load='terminated';
           objet.etats.color='green';

          let montant:number = 0;
          if(objet.data.typedebouquet == 1){
            montant = 5000 * objet.data.duree;
            typedebouquet = 'Maanaa';
          }
          if(objet.data.typedebouquet == 2){
            montant = 3000 * objet.data.duree;
            typedebouquet = 'Boul khool';
          }
          if(objet.data.typedebouquet == 3){
            montant = 8000 * objet.data.duree;
            typedebouquet = 'Maanaa & Boul khool';
          }

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

/******************************************************************************************************/
/******************************************************************************************************/

    cashInWizall(objet : any){
      console.log('cashInWizall');
      this._wizallService.intouchCashin("test 1", objet.data.num, objet.data.montant).then( response =>{
              console.log(response) ;
              if(response.commission!=undefined){
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
      });
    }

    cashOutWizall(objet : any){
      console.log('cashOutWizall');
      this._wizallService.intouchCashout(objet.data.num, objet.data.montant).then( response =>{
              response = JSON.parse(JSON.parse(response._body)) ;
              console.log(response) ;
              if(response.commission!=undefined){
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
      });
    }
    
    validerenvoibon(objet:any){
        this._wizallService.validerenvoiboncash(objet).then(response =>{
               console.log(response.code);
               let data =JSON.parse(response.code);
               console.log(data);
               if(response.code.indexOf("status")!=-1 && data.status=="valid"){
      				   objet.etats.etat=true;
      				   objet.etats.load='terminated';
      				   objet.etats.color='green';
               }
               if(response.code.indexOf("code")!=-1 && data.code==500){
                  objet.etats.etat=true;
                  objet.etats.load='terminated';
                  objet.etats.color='red';
               }
              
         });
    }

    validationretraitbon(objet:any){
        console.log("Retrait de bon via Accueil!");
        console.log(objet);
       this._wizallService.bonDebitVoucher(objet.data).then(response =>{
        console.log(response);
        let data=JSON.parse(response);
          if( data.timestamp != undefined ){
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


    validerbonachat(objet:any){
        this._wizallService.validerbonachat(objet).then(response =>{
               console.log(response);
               objet.etats.etat=true;
               objet.etats.load='terminated';
               objet.etats.color='green';
              
               
         });
    }
    payerSDEWizall(objet : any){
      console.log('payerSDEWizall');
      this._wizallService.intouchPayerFactureSde(objet.data.montant, objet.data.refclient, objet.data.refFacture).then( response =>{
        if(response=="ok"){
          objet.dataI = {
            apiservice:'wizall',
            service:'senelec',
           infotransaction:{
              client:{
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
           objet.etats.errorCode=response.code;
        }
      });
    }

    payerSenelecWizall(objet : any){
      console.log('payerSenelecWizall');
      this._wizallService.intouchPayerFactureSenelec(objet.data.montant, objet.data.police, objet.data.numfacture).then( response =>{
        if(response=="ok"){
          objet.dataI = {
            apiservice:'wizall',
            service:'senelec',
           infotransaction:{
              client:{
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
           objet.etats.errorCode=response.code;
        }

      });
    }


/******************************************************************************************************/

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

/****************************************************************************************************/


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

    }


     if(item.data.operateur==4 ){

        if (item.etats.errorCode=='0')
          return "Vous n'êtes pas autorisé à effectuer cette opèration." ;
    }

     if(item.data.operateur==6 ){

        if (item.etats.errorCode=='500')
          return "Une erreur a empêché le traitement de votre requête. Réessayez plus tard ou contactez le service client." ;

        if (item.etats.errorCode=='400')
          return "Facture dèja payée." ;
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

          return "Votre requête n'a pas pu être traitée. Merci de réssayer plus tard ou contacter le service client." ;  
    }


  }

/**********************************
  TIGO CASH

**********************************/

  deposertc(objet:any){

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
           console.log("For this 'depot', we just say : "+resp._body) ;
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

           setTimeout(()=>{
              this._tcService.verifierReponseTC(resp._body.trim().toString()).then(rep =>{
                var donnee=rep._body.trim().toString();
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
                        var periodicVerifier = setInterval(()=>{
                        objet.etats.nbtour = objet.etats.nbtour + 1 ;
                        this._tcService.verifierReponseTC(resp._body.trim().toString()).then(rep =>{
                          var donnee=rep._body.trim().toString();
                          console.log("Inside verifier depot : "+donnee) ;
                          if(donnee=='1'){
                             objet.etats.etat=true;
                             objet.etats.load='terminated';
                             objet.etats.color='green';
                             clearInterval(periodicVerifier) ;
                          }
                          else{
                            if(donnee!='-1'){
                             objet.etats.etat=true;
                             objet.etats.load='terminated';
                             objet.etats.color='red';
                             objet.etats.errorCode=donnee;
                             clearInterval(periodicVerifier) ;
                            }
                            if(donnee=='-1' && objet.etats.nbtour>=70){
                              this._tcService.demanderAnnulationTC(resp._body.trim().toString()).then(rep =>{
                                var donnee=rep._body.trim().toString();
                                 if(donnee=="c"){
                                   objet.etats.etat=true;
                                   objet.etats.load='terminated';
                                   objet.etats.color='red';
                                   objet.etats.errorCode="c";
                                   clearInterval(periodicVerifier) ;
                                   }
                              }) ;
                            }
                          }
                        });
                        },2000);
                   }
                }
              });

           },5000);
      }
      else{
        console.log("error") ;

        }
    });

  }


/******************************************************************************************************/

   retirertc(objet:any){
    let requete = "2/"+objet.data.numclient+"/"+objet.data.montant ;

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

           setTimeout(()=>{

              this._tcService.verifierReponseTC(resp._body.trim().toString()).then(rep =>{
                var donnee=rep._body.trim().toString();
                console.log("Inside verifier retrait: "+donnee) ;
                if(donnee=='1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='green';
                   clearInterval(periodicVerifier) ;
                }
                else{
                  if(donnee!='-1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='red';
                   objet.etats.errorCode=donnee;
                   clearInterval(periodicVerifier) ;
                  }else{
                      var periodicVerifier = setInterval(()=>{
                      this._tcService.verifierReponseTC(resp._body.trim().toString()).then(rep =>{
                        var donnee=rep._body.trim().toString();
                        console.log("Inside verifier retrait: "+donnee) ;
                        if(donnee=='1'){
                           objet.etats.etat=true;
                           objet.etats.load='terminated';
                           objet.etats.color='green';
                           clearInterval(periodicVerifier) ;
                        }
                        else{
                          if(donnee!='-1'){
                           objet.etats.etat=true;
                           objet.etats.load='terminated';
                           objet.etats.color='red';
                           objet.etats.errorCode=donnee;
                           clearInterval(periodicVerifier) ;
                          }
                        }
                      });
                      },2000);
                  }
                }
              });

           },20000);
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

           setTimeout(()=>{

              this._tcService.verifierReponseTC(resp._body.trim().toString()).then(rep =>{
                var donnee=rep._body.trim().toString();
                console.log("Inside verifier retrait: "+donnee) ;
                if(donnee=='1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='green';
                   clearInterval(periodicVerifier) ;
                }
                else{
                  if(donnee!='-1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='red';
                   objet.etats.errorCode=donnee;
                   clearInterval(periodicVerifier) ;
                  }else{
                      var periodicVerifier = setInterval(()=>{
                      this._tcService.verifierReponseTC(resp._body.trim().toString()).then(rep =>{
                        var donnee=rep._body.trim().toString();
                        console.log("Inside verifier retrait: "+donnee) ;
                        if(donnee=='1'){
                           objet.etats.etat=true;
                           objet.etats.load='terminated';
                           objet.etats.color='green';
                           clearInterval(periodicVerifier) ;
                        }
                        else{
                          if(donnee!='-1'){
                           objet.etats.etat=true;
                           objet.etats.load='terminated';
                           objet.etats.color='red';
                           objet.etats.errorCode=donnee;
                           clearInterval(periodicVerifier) ;
                          }
                        }
                      });
                      },2000);
                  }
                }
              });

           },20000);
      }
      else{
        console.log("error") ;

        }
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


  public cashOutEmoney(objet){
    this.expressocashwebservice.confirmCashout(objet.data.transactionReference, objet.data.OTP).then(expressocashwebserviceList => {

       console.log(expressocashwebserviceList);
       
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
    });

  }


  public cashOutPIN(objet){
    this.expressocashwebservice.pinCashout(objet.data.pin, objet.data.cni).then(expressocashwebserviceList => {
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


/*********************************************************************/



/*************************** FACTURIERS ******************************/

  paiemantsde(objet){
    this._facturierService.paimentsde(objet.data.mntsde,objet.data.refclientsde,objet.data.refFactureSDE,'sde').then( response =>{
      console.log(response) ;

        if( (typeof response.errorCode != "undefined") && response.errorCode == "0" && response.errorMessage == ""){
        objet.dataI = {
          apiservice:'postecash',
          service:'achatcodewayafal',
          infotransaction:{
            client:{
              transactionPostCash: response.transactionId,
              transactionBBS: 'Id BBS',
               referenceclient: objet.data.refclientsde,
               montant: objet.data.mntsde,
               refFacture: objet.data.refFactureSDE,
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

  validerrapido(objet){
    console.log(objet);
    this._facturierService.validerrapido(objet.data.numclient,objet.data.montant,objet.data.badge).then(response =>{
      console.log(response);
      if(response.errorCode==0){
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

  payeroolusolar(objet){
    this._facturierService.payeroolusolar("00221"+objet.data.telephone.toString(),objet.data.compte,objet.data.montant).then(response =>{
      response = JSON.parse(response);

      console.log(response);
/*
      if(response.errorCode==0){
          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='green';
      }else{
          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='red';
      }      
*/
    });
  }

   validerpaimentsenelec(objet){
    this._facturierService.validerpaimentsenelec(objet.data.montant,objet.data.police,objet.data.num_facture,objet.data.service).then(response =>{
        console.log(response) ;
     });  
   }

  validerwoyofal(objet){
    this._facturierService.validerwoyofal(objet.data.montant, objet.data.compteur).then(response =>{
        console.log(response) ;
        if( (typeof response.errorCode != "undefined") && response.errorCode == "0" && response.errorMessage == ""){
        objet.dataI = {
            apiservice:'postecash',
            service:'achatcodewayafal',
            infotransaction:{
              client:{
                transactionPostCash: response.transactionId,
                transactionBBS: 'x-x-x',
                codewoyafal: response.code,
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
