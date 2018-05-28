import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { Location }               from '@angular/common';
import { Router } from '@angular/router';
import {GestionreportingService, Gestionreporting, Servicepoint} from "../services/gestionreporting.service";
import {ComptabiliteService} from "../services/comptabilite.service";


@Component({
  selector: 'app-gestionreporting',
  templateUrl: './gestionreporting.component.html',
  styleUrls: ['./gestionreporting.component.css']
})
export class GestionreportingComponent implements OnInit {

  public servicepoint:Servicepoint[];
  libelleCharge : string ;
  montantCharge : number ;
  service : string ;
  sujet:string;
  nomservice:string;
  message:string;
  quantite:number;
  designation:string;
  servicevente:string = "";
  datedebut:any;
  datefin:any;
  noma:string;
  prenoma:string;
  telephonea:string;
  choosenServiceName : string ;
  estselectassuranceform:boolean=false;
  token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  loading = false ;

  nom="";
  asc="";
  filtre:"";

  caisseEtat: any;

  constructor(
    private router: Router,
    private location: Location,
    private route:ActivatedRoute,
    private _gestionreportingService:GestionreportingService,
    private _comptabiliteService:ComptabiliteService,
  ) {}

  ngOnInit() {
    this._gestionreportingService.servicepoint()
      .subscribe(
        data => {
          this.servicepoint = data;
          console.log(data)
        },
        error => console.log(error),
        () => {
          this.histop();
        }
      )

  }

  getDesignations(){
    if(this.servicevente){
      let designationsNames = [] ;
      let currentService = this.getCurrentService() ;
      let allDesignations = JSON.parse(currentService.designations) ;
      for (var i = allDesignations.length - 1; i >= 0; i--) {
        designationsNames.push(allDesignations[i].name);
      }
      return designationsNames;
    }else return [] ;
  }

  getCurrentService(){
    for (var i = this.servicepoint.length - 1; i >= 0; i--) {
      if(this.servicepoint[i].nom == this.servicevente){
        return this.servicepoint[i] ;
      }
    }
  }

  getName(design : string ){
    return JSON.parse(design).name ;
  }

  depenseop(){
    console.log("----------------------------")
    this._gestionreportingService.servicepoint()
      .subscribe(
        data => {
          this.servicepoint = data;
          console.log(data)
        },
        error => console.log(error),
        () => {

        }
      )
  }

  validCharge(){
    this.loading = true ;
    this._gestionreportingService.ajoutdepense({libelle:this.libelleCharge, service:this.service, montant:this.montantCharge})
      .subscribe(
        data => {
          console.log(data)
          this.libelleCharge = "" ;
          this.service = "" ;
          this.montantCharge = 0 ;
        },
        error => console.log(error),
        () => {
          this.loading = false ;
        }
      )
  }

  validreclamation(){
    console.log("-------------------------------------------")
    this.loading = true ;
    this._gestionreportingService.reclamation({sujet:this.sujet, nomservice:this.nomservice, message:this.message})
      .subscribe(
        data => {
          console.log(data)
          this.sujet = "" ;
          this.nomservice = "" ;
          this.message = "" ;
        },
        error => console.log(error),
        () => {
          this.loading = false ;
        }
      )
  }

  validvente(){
    this.loading = true ;
    if(this.servicevente.toLowerCase()=='assurance'.toLowerCase()){
      let tempdesignation=this.designation;
      this.designation=JSON.stringify({desig:tempdesignation, nom:this.noma, prenom:this.prenoma, telephone:this.telephonea, datedebut:this.datedebut.toString(), datefin:this.datefin.toString()})
      console.log("Obj designé "+this.designation);
    }

    console.log({servicevente:this.servicevente, designation:this.designation, quantite:this.quantite})
    this._gestionreportingService.vente({servicevente:this.servicevente, designation:this.designation, quantite:this.quantite})
      .subscribe(
        data => {
          console.log("------ vente -----------")
          console.log(data)
          this.designation = "" ;
          this.servicevente = "" ;
          this.quantite=0;
          this.datedebut="";
          this.datefin="";
          this.noma="";
          this.telephonea="";
          this.prenoma="";
        },
        error => console.log(error),
        () => {
          this.loading = false ;
        }
      )

  }

  currencyFormat(somme) : String{
    return Number(somme).toLocaleString() ;
  }

  etatcaisse(){
    this.loading = true;
    this._comptabiliteService.etatcaisse()
      .subscribe(
        data => {
          this.caisseEtat = data.response;
        },
        error => alert(error),
        () => {
          this.loading = false ;
        }
      )
  }

  validerapprovision(idcaisse){
    this.loading = true;
    this._comptabiliteService.validerapprovisionn({idcaisse:idcaisse})
      .subscribe(
        data => {
          this.caisseEtat.etat =1;
          this.caisseEtat.soldeFermet = this.caisseEtat.soldeOuvert;
        },
        error => alert(error),
        () => {
          this.loading = false ;
        }
      )
  }

  trimer(infosclient) : string{
    return infosclient.replace('R', '') ;
  }

  enregistrerassurance(){}

  /************************************************************************************
   ********************   PARTIE HISTORIQUE OPERATION   ****************************
   ***********************************************************************************/

  public gestionreporting:Gestionreporting[];
  selectionjour:string;
  selectionintervalledateinit:string;
  selectionintervalleddatefinal:string;

  historiquejour(){
    this.loading = true ;
    this.selectionintervalledateinit = undefined;
    this.selectionintervalleddatefinal = undefined;
    this._gestionreportingService.reportingdate({idpdv:10, type:'jour', infotype:this.selectionjour})
      .subscribe(
        data => {
          this.gestionreporting = data;
        },
        error => console.log(error),
        () => {
          this.loading = false ;
        }
      )
  }

  historiqueintervalle(){
    console.log('reportingdate intervalle');
    this.loading = true ;
    this.selectionjour = undefined;
    this._gestionreportingService.reportingdate({idpdv:10, type:'intervalle', infotype:this.selectionintervalledateinit+" "+this.selectionintervalleddatefinal})
      .subscribe(
        data => {
          this.gestionreporting = data;
        },
        error => console.log(error),
        () => {
          this.loading = false ;
        }
      )
  }

  histop(){
    console.log('reportingdate init');
    this.loading = true ;
    let datenow = ((new Date()).toJSON()).split("T",2)[0];
    this.selectionjour = datenow;
    this._gestionreportingService.reportingdate({idpdv:10, type:'jour', infotype:this.selectionjour})
      .subscribe(
        data => {
          this.gestionreporting = data;
        },
        error => console.log(error),
        () => {
          this.loading = false ;
        }
      )
  }

  reimprimerhistop(operation){
    console.log(operation)
    this._gestionreportingService.reimpression({idpdv:10, operation:JSON.stringify(operation), infooperation:operation.operateur})
      .subscribe(gestreportserviceList => {
          let getdataimpression = gestreportserviceList;
          console.log("***************************************")
          let dataImpression = null;
          let infos = JSON.parse(getdataimpression.infosoperation);
          if(operation.operateur.toUpperCase()=="TNT"){
            if(getdataimpression.typeoperation=="abonnement"){
              let typebouquet = "";
              if (infos.id_typeabonnement==1){
                typebouquet = "Maanaa";
              }
              if (infos.id_typeabonnement==2){
                typebouquet = "Boul Khool";
              }
              if (infos.id_typeabonnement==3){
                typebouquet = "Maanaa + Boul Khool";
              }
              dataImpression = {
                apiservice:'tntreimpression',
                service:'abonnement',
                infotransaction:{
                  dateoperation:getdataimpression.dateOperation.date.split('.')[0],
                  echeance:getdataimpression.echeance.date.split('.')[0],
                  transactionBBS: getdataimpression.idoperation,
                  client:{
                    prenom:infos.prenom,
                    nom:infos.nom,
                    telephone:infos.tel,
                    carte: infos.n_carte,
                    chip:infos.n_chip,
                    typebouquet:typebouquet,
                    montant: infos.montant,
                    duree:infos.duree,
                  },
                },
              }
              sessionStorage.setItem('dataImpression', JSON.stringify(dataImpression));
              this.router.navigate(['accueil/impression']);
            }
            if(getdataimpression.typeoperation=="decodeur"){
              let infos = JSON.parse(getdataimpression.infosoperation);
              console.log(infos);
            }
            if(getdataimpression.typeoperation=="carte"){
              let infos = JSON.parse(getdataimpression.infosoperation);
              console.log(infos);
            }
          }
          if(operation.operateur.toUpperCase()=="WIZALL"){
            if(getdataimpression.typeoperation.toLowerCase().match("sde")){
              let infos = JSON.parse(getdataimpression.infosoperation);
              dataImpression = {
                apiservice:'facturierreimpression',
                service:'sde',
                infotransaction:{
                  dateoperation:getdataimpression.dateOperation.date.split('.')[0],
                  transactionBBS: getdataimpression.idoperation,
                  client:{
                    reference_client: infos.reference_client,
                    reference_facture: infos.reference_facture,
                    client: infos.prenom+" "+infos.nom,
                    date_echeance: infos.date_echeance,
                    montant: infos.montant,
                  },
                },
              }
              sessionStorage.setItem('dataImpression', JSON.stringify(dataImpression));
              this.router.navigate(['accueil/impression']);
            }
            if(getdataimpression.typeoperation.toLowerCase().match("senelec")){
              let infos = JSON.parse(getdataimpression.infosoperation);
              dataImpression = {
                apiservice:'facturierreimpression',
                service:'senelec',
                infotransaction:{
                  dateoperation:getdataimpression.dateOperation.date.split('.')[0],
                  transactionBBS: getdataimpression.idoperation,
                  client:{
                    police: infos.police,
                    numfacture: infos.numfacture,
                    client: infos.client,
                    montant: infos.montant,
                    dateecheance: infos.dateecheance,
                  },
                },
              }
              sessionStorage.setItem('dataImpression', JSON.stringify(dataImpression));
              this.router.navigate(['accueil/impression']);
            }
            if(getdataimpression.typeoperation.toLowerCase().match("woyofal")){
              let infos = JSON.parse(getdataimpression.infosoperation);
              dataImpression = {
                apiservice:'facturierreimpression',
                service:'achatcodewayafal',
                infotransaction:{
                  dateoperation:getdataimpression.dateOperation.date.split('.')[0],
                  transactionBBS: getdataimpression.idoperation,
                  client:{
                    codewoyafal: infos.TOKEN,
                    montant: infos.amount,
                    compteur: infos.METER_NO,
                  },
                },
              }
              sessionStorage.setItem('dataImpression', JSON.stringify(dataImpression));
              this.router.navigate(['accueil/impression']);
            }
            if(getdataimpression.typeoperation.toLowerCase().match("rapido")){
              let infos = JSON.parse(getdataimpression.infosoperation);
              console.log(infos)
              dataImpression = {
                apiservice:'facturierreimpression',
                service:'rapido',
                infotransaction:{
                  dateoperation:getdataimpression.dateOperation.date.split('.')[0],
                  transactionBBS: getdataimpression.idoperation,
                  client:{
                    badge_num: infos.badge_num,
                    numclient: infos.telephone,
                    montant: infos.amount,
                    transactionID:infos.transactionid
                  },
                },
              }
              console.log(dataImpression)
              sessionStorage.setItem('dataImpression', JSON.stringify(dataImpression));
              this.router.navigate(['accueil/impression']);
            }
          }
          if(operation.operateur=="POSTCASH"){
            if(operation.traitement=="RETRAIT CASH"){
              console.log('RETRAIT CASH');
              dataImpression = {
                apiservice:'postecashreimpression',
                service:'retraitespece',
                infotransaction:{
                  dateoperation:getdataimpression.dateOperation.date.split('.')[0],
                  transactionBBS: getdataimpression.idoperation,
                  transactionPostCash: infos.transactionId,
                  client:{
                    montant: infos.montant_reel,
                    telephone:'00221??',
                  },
                },
              }
              sessionStorage.setItem('dataImpression', JSON.stringify(dataImpression));
              this.router.navigate(['accueil/impression']);
            }
            if(operation.traitement=="ACHAT DE CODE WOYOFAL"){
              console.log("ACHAT DE CODE WOYOFAL");
              dataImpression = {
                apiservice:'postecashreimpression',
                service:'achatcodewayafal',
                infotransaction:{
                  dateoperation:getdataimpression.dateOperation.date.split('.')[0],
                  transactionBBS: getdataimpression.idoperation,
                  transactionPostCash: infos.transactionId,
                  client:{
                    montant: infos.montant_reel,
                    codewoyafal: infos.code,
                    compteur: '??',
                  },
                },
              }
              sessionStorage.setItem('dataImpression', JSON.stringify(dataImpression));
              this.router.navigate(['accueil/impression']);
            }
          }
        },
        error => console.log(error),
        () => {
          this.loading = false ;
        }
      )
  }


}

