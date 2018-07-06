import { Component, OnInit } from '@angular/core';
import {WariService} from "../services/wari.service";

@Component({
  selector: 'app-wari',
  templateUrl: './wari.component.html',
  styleUrls: ['./wari.component.css']
})
export class WariComponent implements OnInit {
    retraitcodeconfirme=false;
    moyenpayementRadio:any;
    codewariRadio:any;
    moyenPayement:any;
    code:any;
    wariRadio:any;
    rembourchementRadio;
    nomA:string;
    prenomA:string;
    adresseA:string;
    cellulaireA:any;
    nomB:string;
    prenomB:string;
    adresseB:string;
    cellulaireB:any;
    montant:any;
    typepiece:any;
    numero:any;
    pays:any;
    datededelivrance:any;
    datedevalidite:any;
    espece:any;
    wallet:any;
    compte:any;
    carte:any;
    motif:any;
    loading= false ;
    erreur= false ;
    paysdestination:any;
    token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
    
    constructor(public _wariservice:WariService) { }

    ngOnInit() {

    }

    retraitrecherche () {
      let moyenpaiement = this.codewariRadio || this.moyenpayementRadio;
      let type = this.wariRadio || this.rembourchementRadio;

      // let datas = "0"+ "/" + moyenpaiement+ "/" +this.code+ "/" + type;
      let datas = this.code;
      this.loading = true ;
      this.erreur = false ;
      this._wariservice.retaitrerecherche(this.token,datas).then( response => {
          console.log(response)
          this.loading = false ;
          this.retraitcodeconfirme = true;
      });

    }

    retraitconfirmer () {
        let datas = "2"+ "/" + this.prenomA + "/" +this.nomA+ "/" +this.adresseA + "/" +this.cellulaireA+ "/" +this.montant+ "/" +this.prenomB + "/" +this.nomB+ "/" +this.typepiece+"/"+this.numero+ "/" +this.pays+ "/" +this.datededelivrance+ "/" +this.datedevalidite ;
        //let datas ="2"+ "/" + this.prenomEnvoyeur + "/" +this.nomEnvoyeur+ "/" +this.adresseEnvoyeur + "/" +this.cellulaireEnvoyeur+ "/" + "/" +this.montant+ "/" +this.prenomBeneficiaire + "/" +this.nomBeneficiaire+ "/" +this.typepieceBeneficiaire+"/"+this.numeroPieceBeneficiaire+ "/" +this.paysBeneficiaire+ "/" +this.datededelivranceBeneficiaire+ "/" +this.datedevaliditeBeneficiaire;
        console.log(datas);
        this.loading = true ;
        this.erreur = false ;
        this._wariservice.retaitconfirmer(this.token,datas).then( response => {
            console.log(response);
            this.loading = false ;
            this.reinitialise();
        });
    }

    envoyer () {
        let modereception = this.espece || this.wallet || this.compte || this.carte;
        let datas = "1"+ "/" + this.prenomA + "/" +this.nomA+ "/" +this.adresseA + "/" +this.cellulaireA+ "/" +this.montant+ "/" +this.motif+ "/" +this.typepiece + "/"+this.numero+ "/" +this.pays+ "/" +this.datededelivrance+ "/" +this.datedevalidite + "/" + this.prenomB + "/" +this.nomB+ "/" +this.adresseB + "/" +this.cellulaireB+ "/" +  modereception;
        console.log(datas);
        //let datas = "1"+ "/" + this.prenomEnvoyeur + "/" +this.nomEnvoyeur+ "/" +this.adresseEnvoyeur + "/" +this.cellulaireEnvoyeur+ "/" +this.montantEnvoyeur+ "/" +this.motifEnvoyeur+ "/" +this.typepieceEnvoyeur + "/"+this.numeroPieceEnvoyeur+ "/" +this.paysEnvoyeur+ "/" +this.datededelivranceEnvoyeur+ "/" +this.datedevaliditeEnvoyeur + "/" + this.prenomBeneficiaire + "/" +this.nomBeneficiaire+ "/" +this.adresseBeneficiaire + "/" +this.cellulaireBeneficiaire+ "/" +  modereceptionBeneficiaire;
        this.loading = true ;
        this.erreur = false ;
        this._wariservice.envoi(this.token,datas).then( response => {
            console.log(response);
            this.loading = false ;
            this.reinitialise();
        });
    }

    reinitialise(){
      this.codewariRadio=undefined;
      this.moyenpayementRadio=undefined;
      this.wariRadio=undefined;
      this.code=undefined;
      this.rembourchementRadio=undefined;

      this.nomA=undefined;
      this.prenomA=undefined;
      this.adresseA=undefined;
      this.cellulaireA=undefined;
      this.nomB=undefined;
      this.prenomB=undefined;
      this.adresseB=undefined;
      this.cellulaireB=undefined;
      this.montant=undefined;
      this.typepiece=undefined;
      this.numero=undefined;
      this.pays=undefined;
      this.datededelivrance=undefined;
      this.datedevalidite=undefined;
      this.espece=undefined;
      this.wallet=undefined;
      this.compte=undefined;
      this.carte=undefined;
    }
}
