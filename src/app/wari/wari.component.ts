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

    token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
    
    constructor(public _wariservice:WariService) { }

    ngOnInit() {

    }

    retraitrecherche () {
      this.retraitcodeconfirme = true;

      let moyenpaiement = this.codewariRadio || this.moyenpayementRadio;
      let type = this.wariRadio || this.rembourchementRadio;

      let datas = "2"+ "/" + moyenpaiement+ "/" +this.code+ "/" + type;

      console.log("datas: "+ datas);
      this.reinitialise();
    }

    retraitconfirmer () {
        let datas = "2"+ "/" + this.prenomA + "/" +this.nomA+ "/" +this.adresseA + "/" +this.cellulaireA+ "/" +this.montant+ "/" +this.prenomB + "/" +this.nomB+ "/" +this.typepiece+"/"+this.numero+ "/" +this.pays+ "/" +this.datededelivrance+ "/" +this.datedevalidite ;
        console.log("datas :" +datas);
        this.reinitialise();
    }

    envoyer () {
      let modereception = this.espece || this.wallet || this.compte || this.carte;
      let datas = "1"+ "/" + this.prenomA + "/" +this.nomA+ "/" +this.adresseA + "/" +this.cellulaireA+ "/" +this.montant+ "/" +this.motif+"/"+this.numero+ "/" +this.pays+ "/" +this.datededelivrance+ "/" +this.datedevalidite + "/" + this.prenomB + "/" +this.nomB+ "/" +this.adresseB + "/" +this.cellulaireB+ "/" +  modereception;
      console.log("datas :" +datas);
      this.reinitialise();
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
