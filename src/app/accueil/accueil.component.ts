import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import {TntService} from "../services/tnt.service";
import {PostCashService} from "../services/postcash.service";
import {WizallService} from "../services/wizall.service";
import {OrangemoneyService} from "../services/orangemoney.service";
import {TigocashService} from "../services/tigocash.service";
import { ExpressocashService } from "../services/expressocash.service";
import {FacturierService} from "../services/facturier.service";
import {UtilsService} from "../services/utils.service";
import {AuthService} from "../services/auth.service";
import {TarifsService} from "../services/tarifs.service";
import { AirtimeService } from "../services/airtime.service";

import { ModalDirective } from 'ng2-bootstrap/modal';
import { ZoningComponent } from 'app/zoning/zoning.component';
//import { clearInterval } from 'timers';


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
  styleUrls: ['./accueil.component.css'],

})

export class AccueilComponent implements OnInit {
 // export class AccueilComponent implements OnInit,AfterViewInit {
  articles=[];
  process=[];
  om:boolean=false;
  tc:boolean=false;
  em:boolean=false;
  pc:boolean=false;
  wizall:boolean=false;
  Tnt:boolean=false;
  Sde:boolean=false;
  rapido:boolean=false;
  woyofal:boolean=false;
  senelec:boolean=false;
  oolu:boolean=false;
  gestionReporting:boolean=false;
  guide:boolean=false;
  pret:boolean=false;
  ecom:boolean=false;
  airtime:boolean=false;
  wari:boolean=false;
  zuulu:boolean=false;
  impression:boolean=false;
  canal:boolean=false;

  indexOp:number=0;
  quinzeMinutes = 900000;
  registredAPIs : string [] = ['POSTECASH', 'ORANGEMONEY', 'E-MONEY', 'TIGOCASH', 'WIZALL','WARI'] ;
  oms=[
       {"style":{'display':'block','visibility':'visible','background-color': 'grey','color':'white','border-radius': '10px 10px 10px 10px','margin-bottom': '2px'},"class":"col-xs-2 col-sm-2 loader","etat":0},
       {"style":{'display':'block','visibility':'visible','background-color': 'grey','color':'white','border-radius': '10px 10px 10px 10px','margin-bottom': '2px'},"class":"row loader","etat":0},
       {"style":{'display':'block','visibility':'visible','background-color': 'grey','color':'white','border-radius': '10px 10px 10px 10px','margin-bottom': '2px'},"class":"row loader","etat":0},
       {"style":{'display':'block','visibility':'visible','background-color': 'grey','color':'white','border-radius': '10px 10px 10px 10px','margin-bottom': '2px'},"class":"row loader","etat":0}
      ];
  authorisedToUseCRM = false ;
  load="loader";
  dataImpression:any;
  latitude : any ;
  longitude :any ;
  accuracy :any ;
  processLength:number=0;
  /*nav bar top*/
  message : string  ;
  autorisedUser = 0 ;
  solde : number ;
  s:number=0;
  currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  
  
  /**/

  @ViewChild('newoperation') public newOperation:ElementRef;


  localisation : any ;
  messageGeolocation : any ;
  sessionGlob:any;

  constructor(private _postCashService: PostCashService, private _tntService:TntService, private router: Router, private _wizallService : WizallService, private _omService:OrangemoneyService, private _tcService: TigocashService, private expressocashwebservice : ExpressocashService, private _facturierService : FacturierService, private utilitaire : UtilsService,private _tarifsService:TarifsService,private _utilsService:UtilsService,private _authService:AuthService,private airtimeService:AirtimeService){}
 // constructor(private _postCashService: PostCashService, private _tntService:TntService, private router: Router, private _wizallService : WizallService, private _omService:OrangemoneyService, private _tcService: TigocashService, private expressocashwebservice : ExpressocashService, private _facturierService : FacturierService, private utilitaire : UtilsService,private _tarifsService:TarifsService,private airtimeService:AirtimeService){}

  //constructor(private componentFactoryResolver: ComponentFactoryResolver,private _postCashService: PostCashService, private _tntService:TntService, private router: Router, private _wizallService : WizallService, private _omService:OrangemoneyService, private _tcService: TigocashService, private expressocashwebservice : ExpressocashService, private _facturierService : FacturierService, private utilitaire : UtilsService,private _tarifsService:TarifsService){}
  //constructor(private _postCashService: PostCashService, private _tntService:TntService, private router: Router, private _wizallService : WizallService, private _omService:OrangemoneyService, private _tcService: TigocashService, private expressocashwebservice : ExpressocashService, private _facturierService : FacturierService, private utilitaire : UtilsService,private _tarifsService:TarifsService,private _utilsService:UtilsService,private _authService:AuthService){}

/******************************************************************************************************/


  ngOnInit() {
   // localStorage.removeItem('om-depot') ;
   // localStorage.removeItem('om-retrait') ;

    localStorage.removeItem('tc-depot') ;
    localStorage.removeItem('tc-retrait') ;
    this.ecom=true;

    if (!sessionStorage.getItem('currentUser'))
       this.router.navigate(['']);
      // this.processus();
      this._utilsService.isDepotCheckAuthorized().subscribe(
        data => {
          data = JSON.parse(data)
          if(data.estautorise==1) this.autorisedUser = data.estautorise ;
          this.retrieveAlerteMessage() ;
        },
        error => alert(error),
        () => {
          this.updateCaution() ;
        }
      )
    
  }
  retrieveAlerteMessage(){
    var periodicVerifier = setInterval(()=>{
      this._utilsService.consulterLanceurDalerte().subscribe(
        data => {
          this.message=data.message;
        },
        error => alert(error),
        () => {
          console.log(3)
        }
      )
    },60000);
  }

  updateCaution(){
    console.log("updateCaution 1");
    if ( this.autorisedUser == 1)
      this._utilsService.checkCaution().subscribe(
        data => {
          this.solde = data ;
          console.log("Le solde vaut "+data) ;
        },
        error => alert(error),
        () => {
          console.log(3)
        }
      )
  }
  deconnexion(){
    console.log("deconnexion ----------")
    this._authService.deconnexion().subscribe(
      response => {
        if (response==1){
          sessionStorage.removeItem('currentUser');
          sessionStorage.clear();
          this.router.navigate(['']);
        } else
          console.log("Echec deconnexion!") ;
      },
      error => console.log(error),
      () => console.log("Here Dashboard deconnexion")
    )
  }
  getSold(){}
  afficheApi(api:string){
      if(api=='ORANGEMONEY'){
          this.om=true;
          this.tc=false;
          this.em=false;
          this.pc=false;
          this.wizall=false;
          this.Tnt=false;
          this.Sde=false;
          this.rapido=false;
          this.woyofal=false;
          this.senelec=false;
          this.oolu=false;
          this.gestionReporting=false;
          this.pret=false;
          this.guide=false;
          this.ecom=false;
          this.airtime=false;
          this.wari=false;
          this.zuulu=false;
          this.impression=false;
          this.canal=false;

      }
      if(api=='CANAL'){
        this.om=false;
        this.tc=false;
        this.em=false;
        this.pc=false;
        this.wizall=false;
        this.Tnt=false;
        this.Sde=false;
        this.rapido=false;
        this.woyofal=false;
        this.senelec=false;
        this.oolu=false;
        this.gestionReporting=false;
        this.pret=false;
        this.guide=false;
        this.ecom=false;
        this.airtime=false;
        this.wari=false;
        this.zuulu=false;
        this.canal=true;
    }
      if(api=="TIGOCASH"){
          this.tc=true;
          this.om=false;
          this.em=false;
          this.pc=false;
          this.wizall=false;
          this.canal=false;
          this.Tnt=false;
          this.Sde=false;
          this.rapido=false;
          this.woyofal=false;
          this.senelec=false;
          this.oolu=false;
          this.gestionReporting=false;
          this.pret=false;
          this.guide=false;
          this.ecom=false;
          this.airtime=false;
          this.wari=false;
          this.zuulu=false;
          this.impression=false;

      }
      if(api=="POSTECASH"){
          this.pc=true;
          this.tc=false;
          this.om=false;
          this.em=false
          this.wizall=false;
          this.canal=false;
          this.Tnt=false;
          this.Sde=false;
          this.rapido=false;
          this.woyofal=false;
          this.senelec=false;
          this.oolu=false;
          this.gestionReporting=false;
          this.pret=false;
          this.guide=false;
          this.ecom=false;
          this.airtime=false;
          this.wari=false;
          this.zuulu=false;
          this.impression=false;
      }
      if(api=="E-MONEY"){
        this.em=true;
        this.pc=false;
        this.tc=false;
        this.om=false;
        this.wizall=false;
        this.canal=false;

        this.Tnt=false;
        this.Sde=false;
        this.rapido=false;
        this.woyofal=false;
        this.senelec=false;
        this.oolu=false;
        this.gestionReporting=false;
        this.pret=false;
        this.guide=false;
        this.ecom=false;
        this.airtime=false;
        this.wari=false;
        this.zuulu=false;
        this.impression=false;

      }
      if(api=="WIZALL"){
        this.wizall=true;
        this.em=false;
        this.pc=false;
        this.canal=false;
        this.tc=false;
        this.om=false;
        this.Tnt=false;
        this.Sde=false;
        this.rapido=false;
        this.woyofal=false;
        this.senelec=false;
        this.oolu=false;
        this.gestionReporting=false;
        this.pret=false;
        this.guide=false;
        this.ecom=false;
        this.airtime=false;
        this.wari=false;
        this.zuulu=false;
        this.impression=false;
      }
      if(api=="TNT"){
        this.Tnt=true;
        this.wizall=false;
        this.em=false;
        this.canal=false;
        this.pc=false;
        this.tc=false;
        this.om=false;
        this.Sde=false;
        this.rapido=false;
        this.woyofal=false;
        this.senelec=false;
        this.oolu=false;
        this.gestionReporting=false;
        this.pret=false;
        this.guide=false;
        this.ecom=false;
        this.airtime=false;
        this.wari=false;
        this.zuulu=false;
        this.impression=false;

      }
      if(api=="SDE"){
        this.Sde=true;
        this.Tnt=false;
        this.wizall=false;
        this.em=false;
        this.pc=false;
        this.canal=false;
        this.tc=false;
        this.om=false;
        this.rapido=false;
        this.woyofal=false;
        this.senelec=false;
        this.oolu=false;
        this.gestionReporting=false;
        this.pret=false;
        this.guide=false;
        this.ecom=false;
        this.airtime=false;
        this.wari=false;
        this.zuulu=false;
        this.impression=false;

      }
      if(api=="RAPIDO"){
        this.rapido=true;
        this.Sde=false;
        this.Tnt=false;
        this.wizall=false;
        this.em=false;
        this.pc=false;
        this.tc=false;
        this.canal=false;
        this.om=false;
        this.woyofal=false;
        this.senelec=false;
        this.oolu=false;
        this.gestionReporting=false;
        this.pret=false;
        this.guide=false;
        this.ecom=false;
        this.airtime=false;
        this.wari=false;
        this.zuulu=false;
        this.impression=false;

      }
      if(api=="WOYOFAL"){
        this.woyofal=true;
        this.rapido=false;
        this.Sde=false;
        this.Tnt=false;
        this.wizall=false;
        this.em=false;
        this.pc=false;
        this.tc=false;
        this.canal=false;
        this.om=false;
        this.senelec=false;
        this.oolu=false;
        this.gestionReporting=false;
        this.pret=false;
        this.guide=false;
        this.ecom=false;
        this.airtime=false;
        this.wari=false;
        this.zuulu=false;
        this.impression=false;

      }
      if(api=="SENELEC"){
        this.senelec=true;
        this.woyofal=false;
        this.rapido=false;
        this.Sde=false;
        this.Tnt=false;
        this.wizall=false;
        this.em=false;
        this.pc=false;
        this.canal=false;
        this.tc=false;
        this.om=false;
        this.oolu=false;
        this.gestionReporting=false;
        this.pret=false;
        this.guide=false;
        this.ecom=false;
        this.airtime=false;
        this.wari=false;
        this.zuulu=false;
        this.impression=false;

      }
      if(api=="OOLU"){
        this.oolu=true;
        this.senelec=false;
        this.woyofal=false;
        this.rapido=false;
        this.Sde=false;
        this.Tnt=false;
        this.wizall=false;
        this.em=false;
        this.pc=false;
        this.tc=false;
        this.om=false;
        this.gestionReporting=false;
        this.pret=false;
        this.guide=false;
        this.ecom=false;
        this.airtime=false;
        this.canal=false;
        this.wari=false;
        this.zuulu=false;
        this.impression=false;

      }
    if(api=="GESTIONREPORTING"){
        this.gestionReporting=true;
        this.oolu=false;
        this.senelec=false;
        this.woyofal=false;
        this.rapido=false;
        this.Sde=false;
        this.Tnt=false;
        this.wizall=false;
        this.em=false;
        this.pc=false;
        this.tc=false;
        this.om=false;
        this.canal=false;
        this.pret=false;
        this.guide=false;
        this.ecom=false;
        this.airtime=false;
        this.wari=false;
        this.zuulu=false;
        this.impression=false;

    }
    if(api=="DEMANDEPRET"){
        this.pret=true;
        this.gestionReporting=false;
        this.oolu=false;
        this.senelec=false;
        this.woyofal=false;
        this.rapido=false;
        this.Sde=false;
        this.Tnt=false;
        this.wizall=false;
        this.em=false;
        this.canal=false;
        this.pc=false;
        this.tc=false;
        this.om=false;
        this.guide=false;
        this.ecom=false;
        this.airtime=false;
        this.wari=false;
        this.zuulu=false;
        this.impression=false;

    }
    if(api=="GUIDEUTILISATION"){
      this.guide=true;
      this.pret=false;
      this.gestionReporting=false;
      this.oolu=false;
      this.senelec=false;
      this.woyofal=false;
      this.rapido=false;
      this.Sde=false;
      this.Tnt=false;
      this.canal=false;
      this.wizall=false;
      this.em=false;
      this.pc=false;
      this.tc=false;
      this.om=false;
      this.ecom=false;
      this.airtime=false;
      this.wari=false;
      this.zuulu=false;
      this.impression=false;

    }
    if(api=="ECOMMERCE"){
      this.ecom=true;
      this.guide=false;
      this.pret=false;
      this.gestionReporting=false;
      this.oolu=false;
      this.senelec=false;
      this.woyofal=false;
      this.rapido=false;
      this.Sde=false;
      this.canal=false;
      this.Tnt=false;
      this.wizall=false;
      this.em=false;
      this.pc=false;
      this.tc=false;
      this.om=false;
      this.airtime=false;
      this.wari=false;
      this.zuulu=false;
      this.impression=false;

    }
    if(api=="AIRTIME"){
      console.log("airtime");
      this.airtime=true;
      this.ecom=false;
      this.guide=false;
      this.pret=false;
      this.gestionReporting=false;
      this.oolu=false;
      this.senelec=false;
      this.canal=false;
      this.woyofal=false;
      this.rapido=false;
      this.Sde=false;
      this.Tnt=false;
      this.wizall=false;
      this.em=false;
      this.pc=false;
      this.tc=false;
      this.om=false;
      this.wari=false;
      this.zuulu=false;
      this.impression=false;

    }
    if(api=="WARI"){
      console.log("wari");
      this.canal=false;
      this.wari=true;
      this.airtime=false;
      this.ecom=false;
      this.guide=false;
      this.pret=false;
      this.gestionReporting=false;
      this.oolu=false;
      this.senelec=false;
      this.woyofal=false;
      this.rapido=false;
      this.Sde=false;
      this.Tnt=false;
      this.wizall=false;
      this.em=false;
      this.pc=false;
      this.tc=false;
      this.om=false;
      this.zuulu=false;
      this.impression=false;

    }
    if(api=="ZUULU"){
      console.log("zuulu");
      this.zuulu=true;
      this.wari=false;
      this.airtime=false;
      this.ecom=false;
      this.guide=false;
      this.pret=false;
      this.gestionReporting=false;
      this.oolu=false;
      this.senelec=false;
      this.woyofal=false;
      this.rapido=false;
      this.Sde=false;
      this.Tnt=false;
      this.wizall=false;
      this.canal=false;
      this.em=false;
      this.pc=false;
      this.tc=false;
      this.om=false;
      this.impression=false;

    }
  }
  beus(){
     
     // this.om[0].style.visibility='visible';
      this.om[0].style["background-color"]='green';
      this.om[0].style["display"]='block';
      this.om[1].style.visibility='visible';
      this.om[1].style["background-color"]='green';
      this.om[1].style["display"]='block';
      this.om[2].style.visibility='visible';
      this.om[2].style["background-color"]='green';
      this.om[2].style["display"]='block';
      this.om[3].style.visibility='visible';
      this.om[3].style["background-color"]='green';
      this.om[3].style["display"]='block';
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
  @ViewChild('waitingmodal') public waitingmodal:ModalDirective;

  ouvrir(){
      this.successModal.show() ;
  }

  closeModal(){
      this.successModal.hide() ;
  }
  orangeMoney($event){
     // console.log("fila wara change");
     // console.log($event);
      
        let infoOperation:any;
        if(sessionStorage.getItem('curentProcess')!="" && sessionStorage.getItem('curentProcess')!=undefined){
          infoOperation={'etat':false,'id':this.process.length,'load':'loader','color':'', 'errorCode':'*', nbtour:0};
          let sesion={'data':JSON.parse(sessionStorage.getItem('curentProcess')),'etats':infoOperation,'dataI':''};
          let operateur=sesion.data.operateur;
          sessionStorage.removeItem('curentProcess');
          if(operateur==2){
          let operation=sesion.data.operation;
          this.process.push(sesion);
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
              sessionStorage.removeItem('curentProcess');
            }
        }
      console.log("youpi");
    
  }
  tigocash($event){
    let infoOperation:any;
    if(sessionStorage.getItem('curentProcess')!="" && sessionStorage.getItem('curentProcess')!=undefined){
      infoOperation={'etat':false,'id':this.process.length,'load':'loader','color':'', 'errorCode':'*', nbtour:0};
      let sesion={'data':JSON.parse(sessionStorage.getItem('curentProcess')),'etats':infoOperation,'dataI':''};
      let operateur=sesion.data.operateur;
      console.log("ok na");
      this.process.push(sesion);
      sessionStorage.removeItem('curentProcess');
      if(operateur==3){
        let operation=sesion.data.operation;
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
          case 6:{
                console.log(sesion);
                this.retraitaveccodetc(sesion) ;
                break ;
                }
          default :break;
        }
      }
    }

  }
  expresso($event){
    console.log($event);
    let infoOperation:any;
    if(sessionStorage.getItem('curentProcess')!="" && sessionStorage.getItem('curentProcess')!=undefined){
      infoOperation={'etat':false,'id':this.process.length,'load':'loader','color':'', 'errorCode':'*', nbtour:0};
      let sesion={'data':JSON.parse(sessionStorage.getItem('curentProcess')),'etats':infoOperation,'dataI':''};
      let operateur=sesion.data.operateur;
      this.process.push(sesion);
      sessionStorage.removeItem('curentProcess');
      if(operateur==7){
          let operation=sesion.data.operation;
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
   }
  }
  postcash($event){
    let infoOperation:any;
    if(sessionStorage.getItem('curentProcess')!="" && sessionStorage.getItem('curentProcess')!=undefined){
      infoOperation={'etat':false,'id':this.process.length,'load':'loader','color':'', 'errorCode':'*', nbtour:0};
      let sesion={'data':JSON.parse(sessionStorage.getItem('curentProcess')),'etats':infoOperation,'dataI':''};
      let operateur=sesion.data.operateur;
      this.process.push(sesion);
      sessionStorage.removeItem('curentProcess');
      if(operateur==1){
        let operation=sesion.data.operation;
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
               // this.validatedetailfacturesenelec(sesion);
                this.validationretraitespece(sesion);
                break;
          }
          case 4:{
                //this.validateachatcodewoyofal(sesion);
                this.validatedebitercarte(sesion);
                break;
          }
          default:break;
        }
        

      }
    }

  }
  Wizall($event){
    console.log("bakh na");
    let infoOperation:any;
    if(sessionStorage.getItem('curentProcess')!="" && sessionStorage.getItem('curentProcess')!=undefined){
      infoOperation={'etat':false,'id':this.process.length,'load':'loader','color':'', 'errorCode':'*', nbtour:0};
      let sesion={'data':JSON.parse(sessionStorage.getItem('curentProcess')),'etats':infoOperation,'dataI':''};
      let operateur=sesion.data.operateur;
      this.process.push(sesion);
      sessionStorage.removeItem('curentProcess');
      if(operateur==6){
          let operation=sesion.data.operation;
          switch(operation){
            case 1:{
              this.cashInWizall(sesion);
              break;
            }
            case 2:{
              this.cashOutWizall(sesion);
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
      }
   }
  }
  tnt($event){
    let infoOperation:any;
    if(sessionStorage.getItem('curentProcess')!="" && sessionStorage.getItem('curentProcess')!=undefined){
      infoOperation={'etat':false,'id':this.process.length,'load':'loader','color':'', 'errorCode':'*', nbtour:0};
      let sesion={'data':JSON.parse(sessionStorage.getItem('curentProcess')),'etats':infoOperation,'dataI':''};
      let operateur=sesion.data.operateur;
      this.process.push(sesion);
      sessionStorage.removeItem('curentProcess');
      let operation=sesion.data.operation;
             console.log("here we go ...") ;
            // console.log(sesion) ;
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
    }

  }
  facturier(){
    let infoOperation:any;
    if(sessionStorage.getItem('curentProcess')!="" && sessionStorage.getItem('curentProcess')!=undefined){
      infoOperation={'etat':false,'id':this.process.length,'load':'loader','color':'', 'errorCode':'*', nbtour:0};
      let sesion={'data':JSON.parse(sessionStorage.getItem('curentProcess')),'etats':infoOperation,'dataI':''};
      let operateur=sesion.data.operateur;
      this.process.push(sesion);
      let operation=sesion.data.operation;
      sessionStorage.removeItem('curentProcess');
      if(operateur==8){
        let operation=sesion.data.operation;
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
    }

  }
  Airtime($event){
     let infoOperation:any;
     if(sessionStorage.getItem('curentProcess')!="" && sessionStorage.getItem('curentProcess')!=undefined){
		  infoOperation={'etat':false,'id':this.process.length,'load':'loader','color':'', 'errorCode':'*', nbtour:0};
		  let sesion={'data':JSON.parse(sessionStorage.getItem('curentProcess')),'etats':infoOperation,'dataI':''};
		  let operateur=sesion.data.operateur;
		  this.process.push(sesion);
		  let operation=sesion.data.operation;
		  if(operateur==9){
		     if(sesion.data.operation==1){
		        this.validerAirtime(sesion);
			  }
		  }
	  }
  }

/******************************************************************************************************/

  processus(){
   
    setInterval(()=>{

    if(sessionStorage.getItem('curentProcess')!="" && sessionStorage.getItem('curentProcess')!=undefined){
      let mag=JSON.parse(sessionStorage.getItem('curentProcess')).operateur;
      let infoOperation:any;
     if(mag=='5'){
          infoOperation={'etat':false,'id':this.process.length,'load':'fa fa-shopping-cart fa-2x pull-left','color':'', 'errorCode':'*'};
          console.log("mag = "+mag);
        }
     else{
          
           console.log(this.om[0].style);
           this.om[0].style["background-color"]='blue';
           console.log(this.om[0].style);
           console.log('doug na..........');
           infoOperation={'etat':false,'id':this.process.length,'load':'loader','color':'', 'errorCode':'*', nbtour:0};
           console.log("mag = infoOperation");
           //this.beus();
           console.log(this.om);
      }
      let sesion={'data':JSON.parse(sessionStorage.getItem('curentProcess')),'etats':infoOperation,'dataI':''};
     // var newprocess={'operation':sesion.operation,'montant':sesion.montant,'num':sesion.num};

    /* if(sesion.data.operateur==5){
        this.articles.push(sesion);
        sessionStorage.setItem('panier',JSON.stringify(this.articles));
        if(this.articles.length==1){
          this.process.push(sesion);
        }
        else{
            infoOperation={'etat':false,'id':this.process.length,'load':'loader','color':'', 'errorCode':'*', nbtour:0};
            sesion={'data':JSON.parse(sessionStorage.getItem('curentProcess')),'etats':infoOperation,'dataI':''};
            sessionStorage.removeItem('curentProcess');
        }
        console.log("session======>"+JSON.stringify(sesion));
        if(sesion.data.operateur==5){
          this.articles.push(sesion);
          sessionStorage.setItem('panier',JSON.stringify(this.articles));
          if(this.articles.length==1){
            this.process.push(sesion);
          }
        }
        else{
           this.process.push(sesion);
      }*/

     // console.log(sesion.etats.id);

        let operateur=sesion.data.operateur;
      switch(operateur){
        case 1:{
                let operation=sesion.data.operation;
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
                        this.validationretraitespece(sesion);
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
             let operation=sesion.data.operation;

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
             let operation=sesion.data.operation;

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
                case 6:{
                      console.log(sesion);
                      this.retraitaveccodetc(sesion) ;
                      break ;
                      }
                default :break;
              }
               break ;
        }
       case 4:{
             let operation=sesion.data.operation;
             console.log("here we go ...") ;
            // console.log(sesion) ;
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
             let operation=sesion.data.operation;
             switch(operation){
               case 1:{
                 this.cashInWizall(sesion);
                 break;
               }
               case 2:{
                 this.cashOutWizall(sesion);
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
             let operation=sesion.data.operation;
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
             break;
       }
       case 8:{
         let operation=sesion.data.operation;
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

   // console.log("Debut 1- "+JSON.stringify(objet))
    let requete = "1/"+objet.data.montant+"/"+objet.data.num ;
    let id:number=this.repeatedInLastFifteen('om-depot', requete);
   // console.log("id bi ="+id);
    if (id==-1){
      objet.etats.etat=true;
      objet.etats.load='terminated';
      objet.etats.color='red';
      objet.etats.errorCode='r';
     // console.log("indexOp bi la ="+this.indexOp);
     // id=this.indexOp;
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
          this.updateOpInLastedFifteen('om-depot',id);
         
        }else
        if(resp._body.match('-12')){
          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='red';
          objet.etats.errorCode='-12';
         
        }
        else{
          setTimeout(()=>{
            this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
              let donnee=rep._body.trim().toString();
            //  console.log("verifierReponseOM : "+donnee) ;
              if(donnee=='1'){
                objet.etats.etat=true;
                objet.etats.load='terminated';
                objet.etats.color='green';
               // this.addOpInLastedFifteen('om-depot',requete);
                this.updateCaution();
              
              }
              else{
                if(donnee!='-1'){
                  objet.etats.etat=true;
                  objet.etats.load='terminated';
                  objet.etats.color='red';
                  objet.etats.errorCode=donnee;
                  this.updateOpInLastedFifteen('om-depot',id);
                  this.updateOpInLastedFifteen('om-depot',id);
                
                }
                else{
                  let periodicVerifierOMDepot = setInterval(()=>{
                    //console.log("periodicVerifierTCDepot : "+objet.etats.nbtour) ;
                    objet.etats.nbtour = objet.etats.nbtour + 1 ;
                    this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                      let donnee=rep._body.trim().toString();
                      //console.log("verifierReponseOM 1 : "+donnee) ;
                      if(donnee=='1'){
                        objet.etats.etat=true;
                        objet.etats.load='terminated';
                        objet.etats.color='green';
                        this.updateCaution();
                       // this.addOpInLastedFifteen('om-depot',requete);
                        clearInterval(periodicVerifierOMDepot) ;
                      }
                      else{
                        if(donnee!='-1'){
                          objet.etats.etat=true;
                          objet.etats.load='terminated';
                          objet.etats.color='red';
                          objet.etats.errorCode=donnee;
                          this.updateOpInLastedFifteen('om-depot',id);
                          clearInterval(periodicVerifierOMDepot) ;
                        }
                        if(donnee=='-1'){
                          if(donnee=='-1' && objet.etats.nbtour>=5)
                          this._omService.demanderAnnulationOM(resp._body.trim().toString()).then(rep =>{
                            let donnee=rep._body.trim().toString();
                           // console.log("demanderAnnulationOM : "+donnee) ;
                            if(donnee=="c"){
                              objet.etats.etat=true;
                              objet.etats.load='terminated';
                              objet.etats.color='red';
                              objet.etats.errorCode="c";
                             // this.om[0].style["background-color"]='red';
                              this.updateOpInLastedFifteen('om-depot',id);
                              clearInterval(periodicVerifierOMDepot) ;
                            }
                            else if(donnee!='w'){
                              objet.etats.etat=true;
                              objet.etats.load='wait';
                              objet.etats.color='yellow';
                              objet.etats.errorCode=donnee;
                              this.updateOpInLastedFifteen('om-depot',id);
                              clearInterval(periodicVerifierOMDepot) ;
                            }
                            else {
                              objet.etats.etat=true;
                              objet.etats.load='terminated';
                              objet.etats.color='red';
                              objet.etats.errorCode="bad";
                             // this.om[0].style["background-color"]='red';
                              this.updateOpInLastedFifteen('om-depot',id);
                              clearInterval(periodicVerifierOMDepot) ;
                            }
                          }) ;
                        }
                      }
                    });
                  },10000);
                }
              }
            });
          },30000);
          }
      }
      else{
        console.log("error") ;

      }
    });

  }
 
/******************************************************************************************************/

   retirer(objet:any){
     console.log("*************rasta******************")
    let requete = "2/"+objet.data.numclient+"/"+objet.data.montant ;
    let id=this.repeatedInLastFifteen('om-retrait', requete);
    if (id==-1){
      objet.etats.etat=true;
      objet.etats.load='terminated';
      objet.etats.color='red';
      objet.etats.errorCode='r';
      this.waitingmodal.hide();
      return 0 ;
    }
   // console.log('avant om service');
    this._omService.requerirControllerOM(requete).then( resp => {
      console.log('avant resp.status'+resp);
      if (resp.status==200){

     //    console.log("For this 'retrait', we just say : "+resp._body) ;

        if(resp._body.trim()=='0'){
           objet.etats.etat=true;
           objet.etats.load='terminated';
           objet.etats.color='red';
           objet.etats.errorCode='0';
           this.updateOpInLastedFifteen('om-retrait',id);
           this.waitingmodal.hide();
        }else
            if(resp._body.match('-12')){
               objet.etats.etat=true;
               objet.etats.load='terminated';
               objet.etats.color='red';
               objet.etats.errorCode='-12';
               this.updateOpInLastedFifteen('om-retrait',id);
               this.waitingmodal.hide();
            }
            else{
              setTimeout(()=>{
               // console.log('si set time ou bila');
                this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                let donnee=rep._body.trim().toString();
              //  console.log("Inside verifier retrait: "+donnee) ;
                if(donnee=='1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='green';
                   this.updateCaution();
                }
                else{
                  if(donnee!='-1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='red';
                   objet.etats.errorCode=donnee;
                   this.updateOpInLastedFifteen('om-retrait',id);
                   this.waitingmodal.hide();
                  }
                  else{
                 //       console.log('avant set interval bi');
                        let periodicVerifierOMRetirer = setInterval(()=>{
                        objet.etats.nbtour = objet.etats.nbtour + 1 ;
                   //     console.log('si set interval bi');
                        this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                        let donnee=rep._body.trim().toString();
                     //   console.log("Inside verifier retrait: "+donnee) ;
                        if(donnee=='1'){
                           objet.etats.etat=true;
                           objet.etats.load='terminated';
                           objet.etats.color='green';
                           this.updateCaution();
                           clearInterval(periodicVerifierOMRetirer) ;
                        }
                        else{
                          if(donnee!='-1'){
                           objet.etats.etat=true;
                           objet.etats.load='terminated';
                           objet.etats.color='red';
                           objet.etats.errorCode=donnee;
                           this.updateOpInLastedFifteen('om-retrait',id);
                           clearInterval(periodicVerifierOMRetirer) ;
                           this.waitingmodal.hide();
                          }
                            if(donnee=='-1' && objet.etats.nbtour>=1){
                              //console.log('avant demande annulation');
                              let respo = resp._body.trim().toString();
                              this._omService.demanderAnnulationOM(respo).then(rep =>{
                                let donnee=rep._body.trim().toString();
                                  console.log('apres demande annulation');
                                  console.log(donnee);
                                  if(donnee=='w'){
                                    objet.etats.etat=true;
                                    objet.etats.load='wait';
                                    objet.etats.color='yellow';
                                    objet.etats.errorCode=donnee;
                                    this.updateOpInLastedFifteen('om-retrait',id);
                                    this.retrieveOperationInfo(objet);
                                    this.waitingmodal.show();
                                    clearInterval(periodicVerifierOMRetirer) ;                                    this.postDemanderAnnulationOM(objet,resp._body.trim().toString());
                                    this.postDemanderAnnulationOM(objet,respo);
                                  }
                                  else{
                                   objet.etats.etat=true;
                                   objet.etats.load='terminated';
                                   objet.etats.color='red';
                                   objet.etats.errorCode="c";
                                   this.updateOpInLastedFifteen('om-retrait',id);
                                   clearInterval(periodicVerifierOMRetirer) ;
                                   this.waitingmodal.hide();
                                 }
                              });
                            }
                        }
                      });
                      },10000);
                    
                  }
                }
              });
             },60000);
            }
      }
      else{
        console.log("error") ;
        }
    });

  }

  postDemanderAnnulationOM(objet:any,resp:string){
      let timerInterval  = setInterval(
        ()=>{
          this._omService.postDemanderAnnulationOM(resp).then(rep => {
            let donnee=rep._body.trim().toString();
            console.log('apres demande post annulation');
            console.log(donnee);
            if(donnee=='1'){
                clearInterval(timerInterval) ;
                objet.etats.etat=true;
                objet.etats.load='terminated';
                objet.etats.color='green';
                objet.etats.errorCode=donnee;
                this.retrieveOperationInfo(objet);
            }
            else if(donnee!='-1'){
                clearInterval(timerInterval) ;
                objet.etats.etat=true;
                objet.etats.load='terminated';
                objet.etats.color='red';
                objet.etats.errorCode=donnee;
                this.retrieveOperationInfo(objet);
            }

          });
        },10000)
  }
/******************************************************************************************************/


   retraitAvecCode(objet:any){
    let requete = "3/"+objet.data.coderetrait+"/"+objet.data.prenom+"/"+objet.data.nomclient+"/"+objet.data.date+"/"+objet.data.cni+"/"+objet.data.num+"/"+objet.data.montant;
    let id=this.repeatedInLastFifteen('om-retraitcode', requete);
    if (id==-1){ 
      requete = requete+'R';
    }

    this._omService.requerirControllerOM(requete).then( resp => {
      if (resp.status==200){
          console.log("For this 'retrait-code', we just say : "+resp._body) ;

        if(resp._body.trim()=='0'){
           objet.etats.etat=true;
           objet.etats.load='terminated';
           objet.etats.color='red';
           objet.etats.errorCode='0';
           this.updateOpInLastedFifteen('om-retraitcode',id);
        }
        else if(resp._body.match('-12')){
               objet.etats.etat=true;
               objet.etats.load='terminated';
               objet.etats.color='red';
               objet.etats.errorCode='-12';
               this.updateOpInLastedFifteen('om-retraitcode',id);
            }
        else{
          setTimeout(()=>{
            this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
            let donnee=rep._body.trim().toString();
           // console.log("Inside verifier retrait: "+donnee) ;
            if(donnee=='1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='green';
                   this.updateCaution();
                }
            else {
              if (donnee != '-1') {
                    objet.etats.etat = true;
                    objet.etats.load = 'terminated';
                    objet.etats.color = 'red';
                    objet.etats.errorCode = donnee;
                    this.updateOpInLastedFifteen('om-retraitcode',id);
              }
              else {
                let periodicVerifierOMRetraitCode = setInterval(()=>{
                  objet.etats.nbtour = objet.etats.nbtour + 1 ;
                  this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                    var donnee=rep._body.trim().toString();
                   // console.log("Inside verifier retrait: "+donnee) ;
                    if(donnee=='1'){
                      objet.etats.etat=true;
                      objet.etats.load='terminated';
                      objet.etats.color='green';
                      this.updateCaution();
                      clearInterval(periodicVerifierOMRetraitCode) ;
                    }else
                    if(donnee!='-1'){
                      objet.etats.etat=true;
                      objet.etats.load='terminated';
                      objet.etats.color='red';
                      objet.etats.errorCode=donnee;
                      clearInterval(periodicVerifierOMRetraitCode) ;
                      this.updateOpInLastedFifteen('om-retraitcode',id);
                    }
                    if(donnee=='-1' && objet.etats.nbtour>=5){
                      this._omService.demanderAnnulationOM(resp._body.trim().toString()).then(rep =>{
                        let donnee=rep._body.trim().toString();
                        if(donnee!='w'){
                          objet.etats.etat=true;
                          objet.etats.load='wait';
                          objet.etats.color='yellow';
                          objet.etats.errorCode=donnee;
                          this.updateOpInLastedFifteen('om-retraitcode',id);
                        }
                        else{
                          objet.etats.etat=true;
                          objet.etats.load='terminated';
                          objet.etats.color='red';
                          objet.etats.errorCode="c";
                          clearInterval(periodicVerifierOMRetraitCode) ;
                          this.updateOpInLastedFifteen('om-retraitcode',id);
                        }
                      }) ;
                    }
                  });
                },10000);
              }
            
            }
          });
        },30000);
       }
      }
      else{
        console.log("error") ;
      }
    });

  }


/******************************************************************************************************/


  retraitCpteRecep(objet:any){

    let requete = "4/"+objet.data.numclient+"/"+objet.data.montant;
    let id=this.repeatedInLastFifteen('om-retraitcptercpt', requete);
    if (id==1)
           requete = requete+'R' ;

    this._omService.requerirControllerOM(requete).then( resp => {
      if (resp.status==200){
        if (resp._body.trim().toString()=='1'){
          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='green';
          this.updateCaution();
          //this.etats.process[objet.id]=objet;
        }
      }
      else{
        console.log("error") ;
        this.updateOpInLastedFifteen('om-retraitcptercpt',id);
      }
    });
  }

/******************************************************************************************************/


  acheterCredit(objet:any){

    let requete = "5/"+objet.data.numclient+"/"+objet.data.montant;
   // console.log("Achat de crédit avec : "+requete) ;
    let id=this.repeatedInLastFifteen('om-vente-credit', requete);
    if (id==-1)
           requete = requete+'R' ;

    this._omService.requerirControllerOM(requete).then( resp => {
      if (resp.status==200){

            if(resp._body.trim()=='0'){
               objet.etats.etat=true;
               objet.etats.load='terminated';
               objet.etats.color='red';
               objet.etats.errorCode='0';
               this.updateOpInLastedFifteen('om-vente-credit',id);
            }else
            if(resp._body.trim()=='-12'){
               objet.etats.etat=true;
               objet.etats.load='terminated';
               objet.etats.color='red';
               objet.etats.errorCode='-12';
               this.updateOpInLastedFifteen('om-vente-credit',id);
            }
            else{
              setTimeout(()=>{
              this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                let donnee=rep._body.trim().toString();
                console.log("Inside verifier depot : "+donnee) ;
                if(donnee=='1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='green';
                   this.updateCaution();
                }
                else{
                  if(donnee!='-1'){
                     objet.etats.etat=true;
                     objet.etats.load='terminated';
                     objet.etats.color='red';
                     objet.etats.errorCode=donnee;
                     this.updateOpInLastedFifteen('om-vente-credit',id);
                   
                  }
                  else{
                        let periodicVerifierOMAcheterCredit = setInterval(()=>{
                        objet.etats.nbtour = objet.etats.nbtour + 1 ;
                        this._omService.verifierReponseOM(resp._body.trim().toString()).then(rep =>{
                          let donnee=rep._body.trim().toString();
                          console.log("Inside verifier depot : "+donnee) ;
                          if(donnee=='1'){
                             objet.etats.etat=true;
                             objet.etats.load='terminated';
                             objet.etats.color='green';
                             this.updateCaution();
                             clearInterval(periodicVerifierOMAcheterCredit) ;
                          }
                          else{
                            if(donnee!='-1'){
                             objet.etats.etat=true;
                             objet.etats.load='terminated';
                             objet.etats.color='red';
                             objet.etats.errorCode=donnee;
                             clearInterval(periodicVerifierOMAcheterCredit) ;
                             this.updateOpInLastedFifteen('om-vente-credit',id);
                            }
                            if(donnee=='-1' && objet.etats.nbtour>=5){
                              console.log('avant anulation')
                              this._omService.demanderAnnulationOM(resp._body.trim().toString()).then(rep =>{
                                let donnee=rep._body.trim().toString();
                                 console.log('si bir annulation bi');
                                
                                if(donnee!='w'){
                                  objet.etats.etat=true;
                                  objet.etats.load='wait';
                                  objet.etats.color='yellow';
                                  objet.etats.errorCode=donnee;
                                  this.updateOpInLastedFifteen('om-vente-credit',id);
                                }
                                else {
                                   objet.etats.etat=true;
                                   objet.etats.load='terminated';
                                   objet.etats.color='red';
                                   objet.etats.errorCode="c";
                                   clearInterval(periodicVerifierOMAcheterCredit) ;
                                   this.updateOpInLastedFifteen('om-vente-credit',id);
                                   //929992
                                }
                              }) ;
                            }
                          }
                        });
                        },10000);
                   }
                }
              });
            },30000);
          }
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
          this.updateCaution();
      }else{
            objet.etats.etat=true;
            objet.etats.load='terminated';
            objet.etats.color='red';
      }
    });

  }

  validationretraitespece(objet:any){
    console.log("validationretraitespeceaveccarte");
   // objet.etats.etat=true;
   // objet.etats.load='terminated';
   // objet.etats.color='green';
    this._postCashService.retraitespece('00221'+objet.data.telephone+'',''+objet.data.montant).then(postcashwebserviceList => {
      postcashwebserviceList = JSON.parse(postcashwebserviceList) ;
      console.log(postcashwebserviceList);
      if( (typeof postcashwebserviceList.errorCode != "undefined") && postcashwebserviceList.errorCode == "0" && postcashwebserviceList.errorMessage == ""){
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='green';
        this.updateCaution();
        this.dataImpression = {
          apiservice:'postecash',
          service:'retraitaveccarte',
          infotransaction:{
            client:{
              transactionPostCash: postcashwebserviceList.transactionId,
              transactionBBS: 'Id BBS',
              telephone:'00221'+objet.data.telephone,
              montant:objet.data.montant,
            },

          },
        }
        sessionStorage.setItem('dataImpression', JSON.stringify(this.dataImpression));
       // this.router.navigate(['accueil/impression']);
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
         this.updateCaution();
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
     this.updateCaution();
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
          this.updateCaution();

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
					 this.airtime=false;
					  this.ecom=false;
					  this.guide=false;
					  this.pret=false;
					  this.gestionReporting=false;
					  this.oolu=false;
					  this.senelec=false;
					  this.woyofal=false;
					  this.rapido=false;
					  this.Sde=false;
					  this.Tnt=false;
					  this.wizall=false;
					  this.em=false;
					  this.pc=false;
					  this.tc=false;
					  this.om=false;
					  this.wari=false;
					  this.zuulu=false;
					  this.impression=true;
					// this.router.navigate(['accueil']);
					 //setTimeout(()=>this.router.navigate(['accueil/impression']),100);
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

        let montant:number = 0;
        let typedebouquet = "" ;
        response = JSON.parse(response) ;
        if(response.response=="ok"){

           objet.etats.etat=true;
           objet.etats.load='terminated';
           objet.etats.color='green';
           this.updateCaution();
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
          this.updateCaution();
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
          this.updateCaution();
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
        this.updateCaution();
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
        this.updateCaution();
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
        this.updateCaution();
      }
      else if(response.code !== undefined && JSON.parse(response.code).status && JSON.parse(response.code).status=="valid"){
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='green';
        this.updateCaution();
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
        this.updateCaution();
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
      this.updateCaution();
    });
  }

  /************************************ FIN WIZALL ******************************************************************/

/******************************************************************************************************/

  repeatedInLastFifteen(operation : any, incomingRequest : any) : number{

    let today = Number( Date.now() ) ;
    let omOps = [] ;
    console.log(localStorage.getItem(operation)) ;

    if (localStorage.getItem(operation)==null ){
      localStorage.setItem(operation, JSON.stringify([{requete:incomingRequest, tstamp:today,bool:false}]) );
      this.indexOp=0;
      return 0 ;
    }else{
      omOps = JSON.parse( localStorage.getItem(operation) ) ;
      for (let i=0 ; i<omOps.length ; i++){
        if (omOps[i].requete==incomingRequest){
          console.log(omOps[i]);
          let ilYa15Minutes = today - this.quinzeMinutes;

          let diff =  today - omOps[i].tstamp  ;

//          console.log("Diff vaut "+diff) ;

          if (  diff < this.quinzeMinutes && omOps[i].bool==false ){
            this.indexOp=i;
            return -1 ;
          }else{
            if(omOps[i].bool==true || diff > this.quinzeMinutes){
              omOps[i].tstamp = today ;
              this.indexOp=i;
              console.log("sama cas bi : "+i);
              localStorage.setItem(operation, JSON.stringify(omOps) );
              return i;
            }
          }
        }
      }
      omOps.push({requete:incomingRequest, tstamp:today,bool:false}) ;
      this.indexOp=omOps.length-1;
      localStorage.setItem(operation, JSON.stringify(omOps) );
      return omOps.length-1 ;
    }
  }
 /* repeatedInLastFifteen(operation : any, incomingRequest : any) : number{
    let today = Number( Date.now() ) ;
    let omOps = [] ;
    console.log(localStorage.getItem(operation)) ;
      omOps = JSON.parse( localStorage.getItem(operation) ) ;
      if(omOps!=null && omOps!=undefined){
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
     // omOps[0]={requete:incomingRequest, tstamp:today}
     // let newop=[{requete:incomingRequest, tstamp:today}]
     // localStorage.setItem(operation, JSON.stringify(newop) );
      return 0 ;
    }else{
     // omOps.push({requete:incomingRequest, tstamp:today}) ;
     // let newop=[{requete:incomingRequest, tstamp:today}];
     // localStorage.setItem(operation, JSON.stringify(newop) );
      return 0 ;
    }
  }*/
 /* addOpInLastedFifteen(operation:any,request:any){
    let today = Number( Date.now() ) ;
    let omOps=[];
    if (localStorage.getItem(operation)==null ){
      localStorage.setItem(operation, JSON.stringify([{requete:request, tstamp:today}]) );
    }else{
      omOps = JSON.parse( localStorage.getItem(operation) ) ;
      let lastOp={requete:request,stamp:today};
      omOps.push(lastOp);
      localStorage.setItem(operation, JSON.stringify(omOps) );
    }

  }*/
  updateOpInLastedFifteen(operation:any,id:number){
    let omOps = JSON.parse( localStorage.getItem(operation) ) ;
    console.log("updateOpInLastedFifteen id="+id);
    omOps[id].bool=true;
    localStorage.setItem(operation, JSON.stringify(omOps) );
  }

/****************************************************************************************************/


retrieveOperationInfo(item : any) : string{

/* OM */
     if(item.data.operateur==2 ){

        if (item.etats.errorCode=='r')
          return "Vous venez d'effectuer la même opèration sur le même numéro." ;

        if (item.etats.errorCode=='c')
          return "Opèration annulée. La requête n'est pas parvenue au serveur. Veuillez recommencer." ;

        if (item.etats.errorCode=='w')
          return "Faites patienter le client ; votre requete est en cours de traitement." ;

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
        if (item.etats.errorCode=='w')
          return "Votre requête est en cour de traitement , merci de faire patienter le client." ;
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
    if(item.data.operateur==9){
		if(item.etats.errorCode=='-3' || item.etats.errorCode==-3){
			return "Service Indisponible Veuillez Reessayer Plus Tard";
		}
		if(item.etats.errorCode=="-7" || item.etats.errorCode==-7){
			return "Service Indisponible Veuillez Reessayer Plus Tard";
		}
		if(item.etats.errorCode=="2" || item.etats.errorCode==2){
			return "Votre requete est en cour de traitement";
		}
		if(item.etats.errorCode=="1" || item.etats.errorCode==1){
			return "Operation Reussie";
		}
    
    }


  }

/**********************************
  TIGO CASH

**********************************/

  deposertc(objet:any){

    console.log("Debut 1- "+JSON.stringify(objet))
    let requete = "1/"+objet.data.num+"/"+objet.data.montant ;
    let id=this.repeatedInLastFifteen('tc-depot', requete);
    if (id==-1){
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
          this.updateOpInLastedFifteen('tc-depot',id);
        }else
        if(resp._body.match('-12')){
          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='red';
          objet.etats.errorCode='-12';
          this.updateOpInLastedFifteen('tc-depot',id);
        }
        else{
          setTimeout(()=>{
            this._tcService.verifierReponseTC(resp._body.trim().toString()).then(rep =>{
              let donnee=rep._body.trim().toString();
              console.log("verifierReponseTC : "+donnee) ;
              if(donnee=='1'){
                objet.etats.etat=true;
                objet.etats.load='terminated';
                objet.etats.color='green';
                this.updateCaution();
              }
              else{
                if(donnee!='-1'){
                  objet.etats.etat=true;
                  objet.etats.load='terminated';
                  objet.etats.color='red';
                  objet.etats.errorCode=donnee;
                  this.updateOpInLastedFifteen('tc-depot',id);
                } else{
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
                        this.updateCaution();
                        clearInterval(periodicVerifierTCDepot) ;
                      }
                      else{
                        if(donnee!='-1'){
                          objet.etats.etat=true;
                          objet.etats.load='terminated';
                          objet.etats.color='red';
                          objet.etats.errorCode=donnee;
                          clearInterval(periodicVerifierTCDepot) ;
                          this.updateOpInLastedFifteen('tc-depot',id);
                        }
                        if(donnee=='-1' && objet.etats.nbtour>=9){
                          this._tcService.demanderAnnulationTC(resp._body.trim().toString()).then(rep =>{
                            console.log("demanderAnnulationTC : "+rep._body.trim().toString()) ;
                            let donnee=rep._body.trim().toString();
                            if(donnee=="c"){
                              objet.etats.etat=true;
                              objet.etats.load='terminated';
                              objet.etats.color='red';
                              objet.etats.errorCode="c";
                              clearInterval(periodicVerifierTCDepot) ;
                              this.updateOpInLastedFifteen('tc-depot',id);
                            }
                          }) ;
                        }
                      }
                    });
                  },10000);
                }
              }
            });
          },30000);
        }
      }
      else{
        console.log("error") ;

      }
    });

  }

  /******************************************************************************************************/

   retirertc(objet:any){
    let requete = "2/"+objet.data.num+"/"+objet.data.montant ;
    let id=this.repeatedInLastFifteen('tc-retrait', requete);
    if (id==-1){
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
           this.updateOpInLastedFifteen('tc-retrait',id);
        }else
            if(resp._body.match('-12')){
               objet.etats.etat=true;
               objet.etats.load='terminated';
               objet.etats.color='red';
               objet.etats.errorCode='-12';
               this.updateOpInLastedFifteen('tc-retrait',id);
            }
            else{
              setTimeout(()=>{
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
                   this.updateOpInLastedFifteen('tc-retrait',id);
                  }
                  else{
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
                           this.updateOpInLastedFifteen('tc-retrait',id);
                          }
                          if(donnee=='-1' && objet.etats.nbtour>=5){
                            this._tcService.demanderAnnulationTC(resp._body.trim().toString()).then(rep =>{
                              console.log("demanderAnnulationTC : "+rep._body.trim().toString()) ;
                              let donnee=rep._body.trim().toString();
                              if(donnee=="c"){
                                objet.etats.etat=true;
                                objet.etats.load='terminated';
                                objet.etats.color='red';
                                objet.etats.errorCode="c";
                                clearInterval(periodicVerifierTCRetirer) ;
                                this.updateOpInLastedFifteen('tc-retrait',id);
                              }
                            }) ;
                          }
                        }
                      });
                      },10000);
                  }
                }
              });
            },60000);
          }
      }
      else{
        console.log("error") ;

        }
    });

  }

  retraitaveccodetc(objet:any){
    let requete = "4/"+objet.data.coderetrait+"/"+objet.data.typepiece+"/"+objet.data.numeropiece+"/"+objet.data.montant+"/"+objet.data.num;
    console.log(requete);
    let id=this.repeatedInLastFifteen('tc-retrait', requete);
    
    if (id==-1){
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
           this.updateOpInLastedFifteen('tc-retrait',id);
        }else
            if(resp._body.match('-12')){
               objet.etats.etat=true;
               objet.etats.load='terminated';
               objet.etats.color='red';
               objet.etats.errorCode='-12';
               this.updateOpInLastedFifteen('tc-retrait',id);
            }
            else{
              setTimeout(()=>{
              this._tcService.verifierReponseTC(resp._body.trim().toString()).then(rep =>{
                let donnee=rep._body.trim().toString();
                console.log("Inside verifier retrait: "+donnee) ;
                if(donnee=='1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='green';
                   this.updateCaution();
                }
                else{
                  if(donnee!='-1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='red';
                   objet.etats.errorCode=donnee;
                   this.updateOpInLastedFifteen('tc-retrait',id);
                  }
                  else{
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
                           this.updateCaution();
                           clearInterval(periodicVerifierTCRetraitCode) ;
                        }
                        else{
                          if(donnee!='-1'){
                           objet.etats.etat=true;
                           objet.etats.load='terminated';
                           objet.etats.color='red';
                           objet.etats.errorCode=donnee;
                           clearInterval(periodicVerifierTCRetraitCode) ;
                           this.updateOpInLastedFifteen('tc-retrait',id);
                          }
                          if(donnee=='-1' && objet.etats.nbtour>=9){
                            this._tcService.demanderAnnulationTC(resp._body.trim().toString()).then(rep =>{
                              console.log("demanderAnnulationTC : "+rep._body.trim().toString()) ;
                              let donnee=rep._body.trim().toString();
                              if(donnee=="c"){
                                objet.etats.etat=true;
                                objet.etats.load='terminated';
                                objet.etats.color='red';
                                objet.etats.errorCode="c";
                                clearInterval(periodicVerifierTCRetraitCode) ;
                                this.updateOpInLastedFifteen('tc-retrait',id);
                              }
                            }) ;
                          }
                        }
                      });
                      },10000);
                  }
                }
              });
            },30000);
          }
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
            else{
              setTimeout(()=>{
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
                  }
                  else{
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
                          if(donnee=='-1' && objet.etats.nbtour>=9){
                            this._tcService.demanderAnnulationTC(resp._body.trim().toString()).then(rep =>{
                              console.log("demanderAnnulationTC : "+rep._body.trim().toString()) ;
                              let donnee=rep._body.trim().toString();
                              if(donnee=="c"){
                                objet.etats.etat=true;
                                objet.etats.load='terminated';
                                objet.etats.color='red';
                                objet.etats.errorCode="c";
                                this.updateCaution();
                                clearInterval(periodicVerifierTCRechargeIZI) ;
                              }
                            }) ;
                          }
                        }
                      });
                      },10000);
                  }
                }
              });
            },30000);
          }
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
          this.updateCaution();
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
          this.updateCaution();
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
          this.updateCaution();
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



  /***************************Debut FACTURIERS ******************************/

  paiemantsde(objet){
    this._facturierService.paimentsde(objet.data.reference_client,objet.data.telephone,objet.data.reference_facture,objet.data.montant).then( resp =>{
      console.log("********************************************************");
      let serverResponse=resp["_body"].trim();
      setTimeout(()=>{
		this._facturierService.getReponse(serverResponse).then(tontou =>{
			let TonTou=tontou["_body"].trim();
			if(TonTou!="no"){
					switch(parseInt(TonTou)){
						case 200:{
							let donnees=TonTou.split("#");
							objet.dataI = {
							apiservice:'facturier',
							service:'sde',
							infotransaction:{
							client:{
							  transactionApi: 256665,
							  transactionBBS: 'x-x-x-x',
							  reference_client: objet.data.reference_client,
							  reference_facture: objet.data.reference_facture,
							  client: "",
							  date_echeance: objet.data.echeance,
							  montant: objet.data.montant,
							 },

							},
						   };
							objet.etats.etat=true;
							objet.etats.load='terminated';
							objet.etats.color='green';
							this.updateCaution();
							break;
						}
						case 400:{
							objet.etats.errorCode = "Votre requête n'a pas pu être traitée correctement. Veulliez reessayer plus tard."
							objet.etats.etat=true;
							objet.etats.load='terminated';
							objet.etats.color='red';
							break;
						}
						case 600:{
							objet.etats.errorCode = "Numero facture ou reference incorrect"
							objet.etats.etat=true;
							objet.etats.load='terminated';
							objet.etats.color='red';
							break;
						}
						case 700:{
							objet.etats.errorCode = "Facture deja payée."
							objet.etats.etat=true;
							objet.etats.load='terminated';
							objet.etats.color='red';
							break;
						}
						case 800:{
						    objet.etats.color='orange';
						    objet.etats.errorCode='Votre requete est en cour de traitement veuillez patienter svp.';
							break;
						}
						default :{
							break;
						}
					}
			}else{
			     let timer=setInterval(()=>{
					this._facturierService.getReponse(serverResponse).then(reponse =>{
						let rep=reponse["_body"].trim();
						if(rep!="no"){
							switch(parseInt(rep)){
								case 200:{
									//let donnees=TonTou.split("#");
									objet.dataI = {
									apiservice:'facturier',
									service:'sde',
									infotransaction:{
									client:{
									  transactionApi: 256665,
									  transactionBBS: 'x-x-x-x',
									  reference_client: objet.data.reference_client,
									  reference_facture: objet.data.reference_facture,
									  client: "bbs invest",
									  date_echeance: objet.data.echeance,
									  montant: objet.data.montant,
									 },

									},
								   };
									objet.etats.etat=true;
									objet.etats.load='terminated';
									objet.etats.color='green';
									this.updateCaution();
									clearInterval(timer);
									break;
									
								}
								case 400:{
									objet.etats.errorCode = "Votre requête n'a pas pu être traitée correctement. Veulliez reessayer plus tard."
									objet.etats.etat=true;
									objet.etats.load='terminated';
									objet.etats.color='red';
									clearInterval(timer);
									break;
								}
								case 600:{
									objet.etats.errorCode = "Numero facture ou reference incorrect"
									objet.etats.etat=true;
									objet.etats.load='terminated';
									objet.etats.color='red';
									clearInterval(timer);
									break;
								}
								case 700:{
									objet.etats.errorCode = "Facture deja payée."
									objet.etats.etat=true;
									objet.etats.load='terminated';
									objet.etats.color='red';
									clearInterval(timer);
									break;
								}
							   case 800:{
									objet.etats.color='orange';
									objet.etats.errorCode='Votre requete est en cour de traitement veuillez patienter svp.';
									break;
						        }
							  default :{
									break;
								}
					}
							
						}
					});
					
			     },5000);
			}
			
		});
      },10000);
    }).catch(response => {
      objet.etats.errorCode = response;
      objet.etats.etat=true;
      objet.etats.load='terminated';
      objet.etats.color='red';
    });
    
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
        this.updateCaution();
        this.dataImpression = {
          apiservice:'facturier',
          service:'rapido',
          infotransaction:{
            client:{
              transactionBBS: 'x-x-x-x',
              badge: objet.data.badge,
              numclient: objet.data.numclient,
              montant: objet.data.montant,
              transactionID:response.transactionid
            },

          },
        }
        sessionStorage.setItem('dataImpression', JSON.stringify(this.dataImpression));
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
          this.updateCaution();
      }else{
          objet.etats.etat=true;
          objet.etats.load='terminated';
          objet.etats.color='red';
          objet.etats.errorCode=Response.errorMessage;
      }
    });
  }

 /* validerpaimentsenelec(objet){
    this._facturierService.validerpaimentsenelec(objet.data.montant,objet.data.police,objet.data.num_facture,objet.data.service).then(resp =>{
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
        this.updateCaution();

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
  }*/
   validerpaimentsenelec(objet){
		this._facturierService.validerpaimentsenelec(objet.data.police,objet.data.num_facture,objet.data.montant,objet.data.telephone).then(reponse =>{
      console.log(reponse);
      let tontou=reponse["_body"].trim();
      setTimeout(()=>{
        this._facturierService.getReponse(tontou).then(rep =>{
          let Tontou=rep["_body"].trim();
          if(Tontou!="no"){
            switch(parseInt(Tontou)){
              case 200:{
                objet.dataI = {
                  apiservice:'facturier',
                  service:'senelec',
                  infotransaction:{
                    client:{
                      transactionApi: "y-y-y-y",
                      transactionBBS: 'x-x-x-x',
                      police: objet.data.police,
                      numfacture: objet.data.num_facture,
                      client: "",
                      montant: objet.data.montant,
                      dateecheance: objet.data.echeance,
                    },
        
                  },
                }
                objet.etats.etat=true;
                objet.etats.load='terminated';
                objet.etats.color='green';
                this.updateCaution();

              }
              case 400:{
                objet.etats.errorCode = "Votre requête n'a pas pu être traitée correctement. Veulliez reessayer plus tard."
                objet.etats.etat=true;
                objet.etats.load='terminated';
                objet.etats.color='red';
                break;
              }
              case 600:{
                objet.etats.errorCode = "Numero facture ou reference incorrect"
                objet.etats.etat=true;
                objet.etats.load='terminated';
                objet.etats.color='red';
                break; 
              }
              case 700:{
                objet.etats.errorCode = "Facture deja payée."
                objet.etats.etat=true;
                objet.etats.load='terminated';
                objet.etats.color='red';
                break; 
              }
              case 800:{
                objet.etats.color='orange';
								objet.etats.errorCode='Votre requete est en cour de traitement veuillez patienter svp.';
								break;
              }
              default :{
                break;
              }

            }

          }else{
            let timer=setInterval(()=>{
              this._facturierService.getReponse(tontou).then(rep =>{
                let t=rep["_body"].trim();
                if(t!="no"){
                  switch(parseInt(t)){
                    case 200:{
                      objet.dataI = {
                        apiservice:'facturier',
                        service:'senelec',
                        infotransaction:{
                          client:{
                            transactionApi: "y-y-y-y",
                            transactionBBS: 'x-x-x-x',
                            police: objet.data.police,
                            numfacture: objet.data.num_facture,
                            client: "",
                            montant: objet.data.montant,
                            dateecheance: objet.data.echeance,
                          },
              
                        },
                      }
                      objet.etats.etat=true;
                      objet.etats.load='terminated';
                      objet.etats.color='green';
                      this.updateCaution();
                      clearInterval(timer);
                      break;
                    }
                    case 400:{
                      objet.etats.errorCode = "Votre requête n'a pas pu être traitée correctement. Veulliez reessayer plus tard."
                      objet.etats.etat=true;
                      objet.etats.load='terminated';
                      objet.etats.color='red';
                      clearInterval(timer);
                      break;
                    }
                    case 600:{
                      objet.etats.errorCode = "Numero facture ou reference incorrect"
                      objet.etats.etat=true;
                      objet.etats.load='terminated';
                      objet.etats.color='red';
                      clearInterval(timer);
                      break; 
                    }
                    case 700:{
                      objet.etats.errorCode = "Facture deja payée."
                      objet.etats.etat=true;
                      objet.etats.load='terminated';
                      objet.etats.color='red';
                      clearInterval(timer);
                      break; 
                    }
                    case 800:{
                      objet.etats.color='orange';
                      objet.etats.errorCode='Votre requete est en cour de traitement veuillez patienter svp.';
                      clearInterval(timer);
                      break;
                    }
                    default :{
                      break;
                    }

                  }

                }

              });

            },5000);
          }
        });
      },10000);
		});
   }

  validerwoyofal(objet){
   console.log('nns');
    this._facturierService.validerwoyofal(objet.data.montant, objet.data.compteur).then(response =>{
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
        this.updateCaution();
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
    });
  }
  validatedebitercarte(objet:any){
    console.log("validateretraitespecesanscarte");
    this._postCashService.debitercarte('00221'+objet.data.telephone+'',''+objet.data.montant,''+ objet.data.codevalidation).then(postcashwebserviceList => {
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
              telephone:'00221'+objet.data.telephone,
              montant:objet.data.montant,
              code:objet.data.codevalidation,
            },

          },
        }
        
        sessionStorage.setItem('dataImpression', JSON.stringify(this.dataImpression));
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='green';
        this.updateCaution();
       // this.router.navigate(['accueil/impression']);
      }else{
        objet.etats.etat=true;
        objet.etats.load='terminated';
        objet.etats.color='red';
      }
    });
  }

  /***************Fin FACTURIERS ******************/






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

  /**************************************** */
  /*--------------Encoures------------------*/ 

 // @ViewChild('containerEncour', {read: ViewContainerRef}) containerEncour: ViewContainerRef;

  // Keep track of list of generated components for removal purposes
  components = [];


  draggableComponentClass = ZoningComponent;
  n:number=0;
  
  /*addComponent(sesion) {

   // let infoOperation={'etat':false,'id':1,'load':'loader','color':'', 'errorCode':'*', nbtour:0};
   // let pocess = {'data':{'nom':'Tigo cash depot','operateur':3,'operation':1,'num':this.n,'montant':200},'etats':infoOperation,'dataI':''};
    sessionStorage.setItem('curent',JSON.stringify(sesion));

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.draggableComponentClass);
    const component = this.containerEncour.createComponent(componentFactory);
  
    // Push the component so that we can keep track of which components are created
    this.components.push(component);
    console.log(this.components.length);
    this.n = this.n +1;
  }*/

  /*removeComponent() {
    // Find the component
    const component = this.components.find((component) => component.instance instanceof this.draggableComponentClass);
    const componentIndex = this.components.indexOf(component);

    if (componentIndex !== -1) {
      // Remove component from both view and array
      this.containerEncour.remove(this.containerEncour.indexOf(component));
      this.components.splice(componentIndex, 1);
    }
  }*/
  validerAirtime(objet:any){
		this.airtimeService.Airtime(objet.data.nom,objet.data.numero,objet.data.montant).then(reponse =>{
		     console.log(typeof reponse);
		 if (reponse.status==200){
              console.log(reponse);
              console.log(reponse._body);
            if(reponse._body.trim()=='0'){
               console.log(reponse);
               objet.etats.etat=true;
               objet.etats.load='terminated';
               objet.etats.color='red';
               objet.etats.errorCode='0';
            }else
            if(reponse._body.trim()=='-12'){
               objet.etats.etat=true;
               objet.etats.load='terminated';
               objet.etats.color='red';
               objet.etats.errorCode='-12';
            }
            else
              setTimeout(()=>{
              this.airtimeService.verifierReponse(reponse._body.trim().toString()).then(rep =>{
                console.log(rep);
                let donnee=rep._body.trim().toString();
                console.log("Inside verifier depot : "+donnee) ;
                if(donnee=='1'){
                   objet.etats.etat=true;
                   objet.etats.load='terminated';
                   objet.etats.color='green';
                   objet.etats.errorCode=donnee;
                }
                else{
                  if(donnee!='-1' && donnee!='2'){
                     objet.etats.etat=true;
                     objet.etats.load='terminated';
                     objet.etats.color='red';
                     objet.etats.errorCode=donnee;

                   /*}else{
                        if(donnee=='2' || donnee==2){
							// objet.etats.etat=true;
							 objet.etats.load='loader';
							 objet.etats.color='orange';
							 objet.etats.errorCode=donnee;
                        
                        }
                    */
                  }
                  else{
                        let periodicVerifierOMAcheterCredit = setInterval(()=>{
                        objet.etats.nbtour = objet.etats.nbtour + 1 ;
                        this.airtimeService.verifierReponse(reponse._body.trim().toString()).then(rep =>{
                          let donnee=rep._body.trim().toString();
                          console.log("Inside verifier depot : "+donnee) ;
                          if(donnee=='1'){
                             objet.etats.etat=true;
                             objet.etats.load='terminated';
                             objet.etats.color='green';
                              objet.etats.errorCode=donnee;
                             clearInterval(periodicVerifierOMAcheterCredit) ;
                          }
                          else{
                            if(donnee!='-1' && donnee!='2'){
                             objet.etats.etat=true;
                             objet.etats.load='terminated';
                             objet.etats.color='red';
                             objet.etats.errorCode=donnee;
                             clearInterval(periodicVerifierOMAcheterCredit) ;
                            }
                            if(donnee=='2'){
                             //objet.etats.etat=true;
                             objet.etats.load='loader';
                             objet.etats.color='orange';
                             objet.etats.errorCode=donnee;
                            // clearInterval(periodicVerifierOMAcheterCredit) ;
                            }
                            if(donnee=='-1' && objet.etats.nbtour>=6){
                              this.airtimeService.demanderAnnulation(reponse._body.trim().toString()).then(rep =>{
                                let donnee=rep._body.trim().toString();
                                 if(donnee=="c"){
                                   objet.etats.etat=true;
                                   objet.etats.load='terminated';
                                   objet.etats.color='red';
                                   objet.etats.errorCode="c";
                                   clearInterval(periodicVerifierOMAcheterCredit) ;
                                   }
                              }) ;
                            }
                          }
                        });
                        },10000);
                   }
                }
              });
              },30000);
      }
		});
  
  }

}

