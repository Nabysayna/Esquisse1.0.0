import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute, Params} from '@angular/router';
import { Location }  from '@angular/common';

import {ComptabiliteService} from "../services/comptabilite.service";


class UserExploitation{
  nom : string;
  prenom : number;
  idpdv:number;
}

class PdvCaisse{
  nom : string ;
  caisse : number ;
  prenom : number ;
  id : number ;
  idpdv:number;
}

class Charges{
  dateajout:string;
  libelle:string;
  montant:number;
  service:string;

}

class Revenus{
  date:string;
  libelle:string;
  montant:number;
  service:string;

}
class Revenustransfert{
  date:string;
  libelle:string;
  montant:number;
  frais:number;
  commission:number;
  service:string;

}

class Exploitation{
  dateajout:string;
  designation:string;
  stocki:number;
  vente:number;
  stockf:number;
  mnt:number;
}

class Exploitationaveccommission{
  dateajout:string;
  designation:string;
  vente:number;
  mnt:number;
  frais:number;
  commission:number;
}

class Supservice{
  idservice:number;
  services:string;
  design:string;
}

class Designation{
  name:string;
  stock:number;
  prixAchat:number;
  prixunitaire:number;
}



@Component({
  selector: 'app-comptabilite',
  templateUrl: './comptabilite.component.html',
  styleUrls: ['./comptabilite.component.css']
})
export class ComptabiliteComponent implements OnInit {

  pdvCaisses : PdvCaisse[] ;
  libelleCharge : string ;
  montantCharge : number ;
  loading = false ;

  service : string ;
  designationsService: Designation[] = [];
  nbreDesignation:number = 0;

  approvisionnement = "" ;
  estselectionne:number = -1;
  estselectionr:number;
  estselectionf:number;
  estselectionouvert:number;
  estselectionfff:number;
  estselectionas:number;
  estselectionms:number;
  estselectionss:number;
  montreautredesignation:number;
  estselectionmods:number = -1;

  onPostUpdate = false ;

  estclickeJour = true;
  estclickeAnnee = false;
  estclickeIntervalle = false;

  charges:Charges[];
  revenus:Revenus[];
  revenustransfert:Revenustransfert[];
  supservice:Supservice[];

  usersExploitation:UserExploitation[];

  montantajoutecaisse:number;

  public checkModel:any = {jour: true, annee: false, intervalle: false};
  selectionannee:string;
  selectionjour:string;
  selectionintervalledateinit:string;
  selectionintervalleddatefinal:string;
  selectionintervalle:string;

  filtre:any;
  filtreaveccommission:any;
  nom="nom";
  asc="asc";

  isselectlisterrevenuautre:boolean = true;

  constructor(
         private location: Location,
         private route:ActivatedRoute,
         private router: Router,
         private _comptabiliteService: ComptabiliteService,
  ) { }


  ngOnInit() {
    this.loading = true ;
    this._comptabiliteService.listecaisse()
      .subscribe(
      data => {
        console.log("Localhost Test");
        this.pdvCaisses = data.response ;
      },
      error => alert(error),
      () => {
        this.loading = false ;
      }
    )
  }

  estcheckModel(type: string){
    if(type == 'jour'){
      this.checkModel.jour = true;
      this.checkModel.annee = false;
      this.checkModel.intervalle = false;

      this.selectionannee = "";
      this.selectionintervalledateinit = "";
      this.selectionintervalleddatefinal = "";
    }
    else if(type == 'annee'){
      this.checkModel.jour = false;
      this.checkModel.annee = true;
      this.checkModel.intervalle = false;

      this.selectionjour = "";
      this.selectionannee = "2017";
      this.selectionintervalledateinit = "";
      this.selectionintervalleddatefinal = "";
    }
    else if(type == 'intervalle'){
      this.checkModel.jour = false;
      this.checkModel.annee = false;
      this.checkModel.intervalle = true;

      this.selectionjour = "";
      this.selectionannee = "";
    }
    else{
      this.checkModel.jour = true;
      this.checkModel.annee = false;
      this.checkModel.intervalle = false;

      this.selectionjour = "";
      this.selectionannee = "";
      this.selectionintervalledateinit = "";
      this.selectionintervalleddatefinal = "";
    }
    this.selectionintervalle="";
  }

  goBack() {
    this.location.back();
  }

  currencyFormat(somme) : String{
    return Number(somme).toLocaleString() ;
  }




  /************************************************************************************
   *********************************   PARTIE CAISSE   ****************************
   ***********************************************************************************/

  isActif(nomPdv : string) : boolean{
    return (this.approvisionnement.indexOf("-"+nomPdv+"-")>-1) ;
  }

  approvisionnercaisse(idpdv: number, i:number){
    this.approvisionnement="" ;
    this.loading = true ;
    this._comptabiliteService.approvisionner({idpdv: idpdv, montant: this.montantajoutecaisse})
      .subscribe(
        data => {
          this.pdvCaisses[i].caisse = Number(this.pdvCaisses[i].caisse) + Number(this.montantajoutecaisse);
        },
        error => alert(error),
        () => {
          this.loading = false ;
        }
      )
  }


  /************************************************************************************
   *********************************   PARTIE JOURNAL   ****************************
   ***********************************************************************************/

  listercharges(i){
    this.estselectionne = i ;
    this.loading = true ;

    this._comptabiliteService.listecharge({idpdv: this.pdvCaisses[i].idpdv})
      .subscribe(
        data => {
          this.charges = data.response;
        },
        error => alert(error),
        () => {
          this.loading = false ;
        }
      )
  }

  listerrevenus(i){
    this.estselectionr = i;
    this.estselectionne = i ;
    this.loading = true ;

    this._comptabiliteService.listerevenu({idpdv: this.pdvCaisses[i].idpdv})
      .subscribe(
        data => {
          this.revenus = data.response;
        },
        error => alert(error),
        () => {
          this.loading = false ;
        }
      )
  }

  listerrevenustransfert(i){
    this.estselectionr = i;
    this.estselectionne = i ;
    this.loading = true ;

    this._comptabiliteService.listerevenutransfert({idpdv: this.pdvCaisses[i].idpdv})
      .subscribe(
        data => {
          this.revenustransfert = data.response;
        },
        error => alert(error),
        () => {
          this.loading = false ;
        }
      )
  }

  ajoutercharges(i){
    this.estselectionf = i;
    this.estselectionne = i ;
  }

  validerajoutercharges(pdv){
    this.loading = true ;

    this._comptabiliteService.ajoutcharge({libelle: this.libelleCharge, idpdv: pdv.idpdv, service: this.service, montant: this.montantCharge})
      .subscribe(
        data => {
          console.log(data.response);
          this.libelleCharge = null;
          this.montantCharge = null;
          this.service = null;
        },
        error => alert(error),
        () => {
          this.loading = false ;
        }
      )
  }


  /************************************************************************************
   *********************************   PARTIE EXPLOITATION   ****************************
   ***********************************************************************************/

  exploitation:Exploitation[];
  exploitationaveccommission:Exploitationaveccommission[];
  exploitationbilan:any[]=[];
  bilanexploitationaveccommission:any[] = [];

  listeruserexploitation(){
    this.loading = true ;

    this._comptabiliteService.userexploitation()
      .subscribe(
        data => {
          this.usersExploitation = data.response;
        },
        error => alert(error),
        () => {
          this.loading = false ;
        }
      )
  }

  listerexploitation(i:number, isouvesrt:number, isferme:number ){
    this.estcheckModel("");
    this.estselectionne = i ;
    this.estselectionouvert = isouvesrt;
    this.estselectionfff = isferme;
    console.log(this.estselectionne +" "+ this.estselectionouvert +" "+ this.estselectionfff);
    let datenow = ((new Date()).toJSON()).split("T",2)[0];

    this.loading = true ;
    this._comptabiliteService.exploitation({idpdv: this.usersExploitation[i].idpdv, type: "jour", infotype: datenow})
      .subscribe(
        data => {
          this.exploitation = data.response.map(function (type) {
            return {
              dateajout: type.dateajout.date.split(".")[0],
              designation: type.designation,
              stocki: type.stocki,
              vente: type.vente,
              stockf: type.stockf,
              mnt: Number(type.mnt),
            }
          });
        },
        error => alert(error),
        () => {
          this.loading = false ;
        }
      )
  }

  listerexploitationaveccommission(i:number, isouvesrt:number, isferme:number ){
    this.estcheckModel("");
    this.estselectionne = i ;
    this.estselectionouvert = isouvesrt;
    this.estselectionfff = isferme;
    console.log(this.estselectionne +" "+ this.estselectionouvert +" "+ this.estselectionfff);
    let datenow = ((new Date()).toJSON()).split("T",2)[0];

    this.loading = true ;
    this._comptabiliteService.exploitationaveccommission({idpdv: this.usersExploitation[i].idpdv, type: "jour", infotype: datenow})
      .subscribe(
        data => {
          this.exploitationaveccommission = data.response.map(function (type) {
            return {
              dateajout: type.dateajout.date.split(".")[0],
              designation: type.designation,
              mnt: Number(type.mnt),
              frais: Number(type.frais),
              commission: Number(type.commission),
              service: type.service.toLowerCase(),
            }
          });
        },
        error => alert(error),
        () => {
          this.calculbilanexploitationaveccommission();
          this.loading = false ;
        }
      )
  }

  listerexploitationrecherche(idpdv, iscommission){
    console.log(iscommission);
    let datenow = ((new Date()).toJSON()).split("T",2)[0];
    this.loading = true ;
    if(iscommission == 0){
      this._comptabiliteService.exploitationaveccommission({idpdv: idpdv, type: "jour", infotype: datenow})
        .subscribe(
          data => {
            this.exploitationaveccommission = data.response.map(function (type) {
              return {
                dateajout: type.dateajout.date.split(".")[0],
                designation: type.designation,
                mnt: Number(type.mnt),
                frais: Number(type.frais),
                commission: Number(type.commission),
                service: type.service.toLowerCase(),
              }
            });
          },
          error => alert(error),
          () => {
            this.calculbilanexploitationaveccommission();
            this.loading = false ;
          }
        )
    }
    else {
      this._comptabiliteService.exploitation({idpdv: idpdv, type: "jour", infotype: datenow})
        .subscribe(
          data => {
            this.exploitation = data.response.map(function (type) {
              return {
                dateajout: type.dateajout.date.split(".")[0],
                designation: type.designation,
                stocki: type.stocki,
                vente: type.vente,
                stockf: type.stockf,
                mnt: type.mnt,
              }
            });
          },
          error => alert(error),
          () => {
            this.loading = false ;
          }
        )
    }

  }

  listerexploitationrechercheannee(idpdv, iscommission){
    console.log(iscommission);
    this.loading = true ;
    if(iscommission == 0){

      this._comptabiliteService.exploitationaveccommission({idpdv: idpdv, type: "annee", infotype: this.selectionannee})
        .subscribe(
          data => {
            this.exploitationaveccommission = data.response.map(function (type) {
              return {
                dateajout: type.dateajout.date.split(".")[0],
                designation: type.designation,
                mnt: Number(type.mnt),
                frais: Number(type.frais),
                commission: Number(type.commission),
                service: type.service.toLowerCase(),
              }
            });
          },
          error => alert(error),
          () => {
            this.calculbilanexploitationaveccommission();
            this.loading = false ;
          }
        )
    }
    else {

      this._comptabiliteService.exploitation({idpdv: idpdv, type: "annee", infotype: this.selectionannee})
        .subscribe(
          data => {
            this.exploitation = data.response.map(function (type) {
              return {
                dateajout: type.dateajout.date.split(".")[0],
                designation: type.designation,
                stocki: type.stocki,
                vente: type.vente,
                stockf: type.stockf,
                mnt: type.mnt,
              }
            });
          },
          error => alert(error),
          () => {
            this.loading = false ;
          }
        )
    }

  }

  listerexploitationparjour(idpdv, iscommission){
    console.log(iscommission);
    if(this.selectionjour != ""){
      this.loading = true ;
      if(iscommission == 0){

        this._comptabiliteService.exploitationaveccommission({idpdv: idpdv, type: "jour", infotype: this.selectionjour})
          .subscribe(
            data => {
              this.exploitationaveccommission = data.response.map(function (type) {
                return {
                  dateajout: type.dateajout.date.split(".")[0],
                  designation: type.designation,
                  mnt: Number(type.mnt),
                  frais: Number(type.frais),
                  commission: Number(type.commission),
                  service: type.service.toLowerCase(),
                }
              });
            },
            error => alert(error),
            () => {
              this.calculbilanexploitationaveccommission();
              this.loading = false ;
            }
          )
      }
      else {
        this._comptabiliteService.exploitation({idpdv: idpdv, type: "jour", infotype: this.selectionjour})
          .subscribe(
            data => {
              this.exploitation = data.response.map(function (type) {
                return {
                  dateajout: type.dateajout.date.split(".")[0],
                  designation: type.designation,
                  stocki: type.stocki,
                  vente: type.vente,
                  stockf: type.stockf,
                  mnt: type.mnt,
                }
              });
            },
            error => alert(error),
            () => {
              this.loading = false ;
            }
          )
      }
    }
  }

  listerexploitationparannee(idpdv, iscommission){
    console.log(iscommission);
    this.loading = true ;
    if(iscommission == 0){

      this._comptabiliteService.exploitationaveccommission({idpdv: idpdv, type: "annee", infotype: this.selectionannee})
        .subscribe(
          data => {
            this.exploitationaveccommission = data.response.map(function (type) {
              return {
                dateajout: type.dateajout.date.split(".")[0],
                designation: type.designation,
                mnt: Number(type.mnt),
                frais: Number(type.frais),
                commission: Number(type.commission),
                service: type.service.toLowerCase(),
              }
            });
          },
          error => alert(error),
          () => {
            this.calculbilanexploitationaveccommission();
            this.loading = false ;
          }
        )
    }
    else {
      this._comptabiliteService.exploitation({idpdv: idpdv, type: "annee", infotype: this.selectionannee})
        .subscribe(
          data => {
            this.exploitation = data.response.map(function (type) {
              return {
                dateajout: type.dateajout.date.split(".")[0],
                designation: type.designation,
                stocki: type.stocki,
                vente: type.vente,
                stockf: type.stockf,
                mnt: type.mnt,
              }
            });
          },
          error => alert(error),
          () => {
            this.loading = false ;
          }
        )
    }
  }

  listerexploitationintervalle(idpdv, iscommission){
    console.log(iscommission);
    if(this.selectionintervalledateinit && this.selectionintervalleddatefinal){
      this.loading = true ;
      this.selectionintervalle = this.selectionintervalledateinit+" "+this.selectionintervalleddatefinal;
      if(iscommission == 0){
        this._comptabiliteService.exploitationaveccommission({idpdv: idpdv, type: "intervalle", infotype: this.selectionintervalle})
          .subscribe(
            data => {
              this.exploitationaveccommission = data.response.map(function (type) {
                return {
                  dateajout: type.dateajout.date.split(".")[0],
                  designation: type.designation,
                  mnt: Number(type.mnt),
                  frais: Number(type.frais),
                  commission: Number(type.commission),
                  service: type.service.toLowerCase(),
                }
              });
            },
            error => alert(error),
            () => {
              this.calculbilanexploitationaveccommission();
              this.loading = false ;
            }
          )
      }
      else {
        this._comptabiliteService.exploitation({idpdv: idpdv, type: "intervalle", infotype: this.selectionintervalle})
          .subscribe(
            data => {
              this.exploitation = data.response.map(function (type) {
                return {
                  dateajout: type.dateajout.date.split(".")[0],
                  designation: type.designation,
                  stocki: type.stocki,
                  vente: type.vente,
                  stockf: type.stockf,
                  mnt: type.mnt,
                }
              });
            },
            error => alert(error),
            () => {
              this.loading = false ;
            }
          )
      }
    }
  }

  calculbilanexploitationaveccommission(){
    this.bilanexploitationaveccommission = [
      {service:'tnt', cashin:0, cashout:0, commission:0},
      {service:'postcash', cashin:0, cashout:0, commission:0},
      {service:'wizall', cashin:0, cashout:0, commission:0},
      {service:'emoney', cashin:0, cashout:0, commission:0},
      {service:'orangemoney', cashin:0, cashout:0, commission:0},
      {service:'tigocash', cashin:0, cashout:0, commission:0},
      {service:'Total', cashin:0, cashout:0, commission:0},
    ];
    this.exploitationbilan = this.exploitationaveccommission;
    this.exploitationbilan.forEach(type => {
      this.bilanexploitationaveccommission[6].cashin+=type.mnt;
      this.bilanexploitationaveccommission[6].commission+=type.commission;
      if(type.service == 'tnt'){
        this.bilanexploitationaveccommission[0].cashin+=type.mnt;
        this.bilanexploitationaveccommission[0].commission+=type.commission;
      }
      if(type.service == 'postcash'){
        this.bilanexploitationaveccommission[1].cashin+=type.mnt;
        this.bilanexploitationaveccommission[1].commission+=type.commission;
      }
      if(type.service == 'wizall'){
        if(type.designation == 'depot'){
          this.bilanexploitationaveccommission[2].cashin+=type.mnt;
        }
        else{
          this.bilanexploitationaveccommission[2].cashout+=type.mnt;
          this.bilanexploitationaveccommission[6].cashin-=type.mnt;
        }
        this.bilanexploitationaveccommission[2].commission+=type.commission;
      }

      if(type.service == 'emoney'){
        if(type.designation == 'depot'){
          this.bilanexploitationaveccommission[3].cashin+=type.mnt;
        }
        else{
          this.bilanexploitationaveccommission[3].cashout+=type.mnt;
          this.bilanexploitationaveccommission[6].cashout+=type.mnt;
          this.bilanexploitationaveccommission[6].cashin-=type.mnt;
        }
        this.bilanexploitationaveccommission[3].commission+=type.commission;
      }
      if(type.service == 'orangemoney'){
        if(type.designation == 'depot'){
          this.bilanexploitationaveccommission[4].cashin+=type.mnt;
        }
        else{
          this.bilanexploitationaveccommission[4].cashout+=type.mnt;
          this.bilanexploitationaveccommission[6].cashout+=type.mnt;
          this.bilanexploitationaveccommission[6].cashin-=type.mnt;
        }
        this.bilanexploitationaveccommission[4].commission+=type.commission;
      }
      if(type.service == 'tigocash'){
        if(type.designation == 'depot'){
          this.bilanexploitationaveccommission[5].cashin+=type.mnt;
        }
        else{
          this.bilanexploitationaveccommission[5].cashout+=type.mnt;
          this.bilanexploitationaveccommission[6].cashout+=type.mnt;
          this.bilanexploitationaveccommission[6].cashin-=type.mnt;
        }
        this.bilanexploitationaveccommission[5].commission+=type.commission;
      }
    });

  }




  /************************************************************************************
   *********************************   PARTIE PERSONNALISATION   ****************************
   ***********************************************************************************/



  clickIsselectlisterrevenuautre(){

  }

  ajouterdesignation(){
    this.designationsService.push(new Designation());
  }

  ajouterservice(i){
    this.estselectionne = i ;
    this.estselectionas = i;
    this.service = null;
    this.designationsService = [];
    this.designationsService.push(new Designation());
  }

  modifierservice(i){
    this.estselectionne = i ;
    this.estselectionms = i;
    this.loading = true ;

    this._comptabiliteService.listeservice({idpdv: this.pdvCaisses[i].idpdv})
      .subscribe(
        data => {
          this.supservice = data.response;
        },
        error => alert(error),
        () => {
          this.loading = false ;
        }
      )
  }

  supprimerservice(i){
    this.estselectionne = i;
    this.service = null;
    this.designationsService = [];
    this.loading = true ;

    this._comptabiliteService.listeservice({idpdv: this.pdvCaisses[i].idpdv})
      .subscribe(
        data => {
          this.supservice = data.response;
        },
        error => alert(error),
        () => {
          this.loading = false ;
        }
      )
  }

  effacerunedesignation(i){
    this.designationsService = this.designationsService.filter(item => item !==this.designationsService[i]);
  }

  validerajouterservice(pdv:any){
    this.loading = true ;
    this._comptabiliteService.ajoutservice({nom: this.service, idpdv: pdv.idpdv, designations: ""+JSON.stringify(this.designationsService)})
      .subscribe(
        data => {
          console.log(data.response);
        },
        error => alert(error),
        () => {
          this._comptabiliteService.listeservice({idpdv: pdv.idpdv})
            .subscribe(
              data => {
                this.supservice = data.response;
              },
              error => alert(error),
              () => {
                this.loading = false ;
              }
            )
          this.loading = false ;
        }
      )

  }

  validermodifierservice(pdv:any){
    this.loading = true ;
    this._comptabiliteService.modifierservice({service: this.service, designations: ""+JSON.stringify(this.designationsService), idservice: this.serviceamodifier().idservice})
      .subscribe(
        data => {
          console.log(data.response);
        },
        error => alert(error),
        () => {
          this._comptabiliteService.listeservice({idpdv: pdv.idpdv})
            .subscribe(
              data => {
                this.supservice = data.response;
                this.estselectionmods = -1 ;
              },
              error => alert(error),
              () => {
                this.loading = false ;
              }
            )
          this.loading = false ;
        }
      )
  }

  deleteservice(supservice:Supservice, pdv) {
    this.loading = true ;

    this._comptabiliteService.supprimerservice({idsupprimer: supservice.idservice})
      .subscribe(
        data => {
          console.log(data.response);
        },
        error => alert(error),
        () => {
          this._comptabiliteService.listeservice({idpdv: pdv.idpdv})
            .subscribe(
              data => {
                this.supservice = data.response;
              },
              error => alert(error),
              () => {
                this.loading = false ;
              }
            )
          this.loading = false ;
        }
      )
  }

  serviceamodifier(){
    return this.supservice[this.estselectionmods];
  }

  modifyservice(i){
    // this.estselectionne = i ;
    this.estselectionmods=i;
    this.service = this.supservice[i].services;
    this.designationsService = JSON.parse(this.supservice[i].design);
  }

  autredesignation(i){
    this.estselectionne = i ;
    this.montreautredesignation=i;
  }

}
