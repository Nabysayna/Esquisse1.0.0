import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
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
    espece:any="espece";
    wallet:any;
    compte:any;
    carte:any;
    especeEn:any="espece";
    walletEn:any;
    waripassEn:any;
    voucherEn:any;
    carteEn:any;
    motif:any;
    loading= false ;
    erreur= false ;
    paysdestination:any;
    infoEnv:boolean=true;
    infoBen:boolean=false;
    btnValider:boolean=false;
    btnPrecedant:boolean=false;
    btnSuivant:boolean=true;
    nomCaisse:any;
    prenomCaisse:any;
    token : string= JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
    retraitstep=2;
    mpCellulaier:any;
    mpCodeVoucher:any;
    mpPartenaire:any;
    mpTypeCompte:any;
    mpNumeroCarte:any;
    mpTypeCarte:any;
    mrNumeroCompte:any;
    wariSecure:any;
    mpWallet:any;
    mpCarte:any;
    mpCompte:any;
    mpVoucher:any;
    mpEspece:any;
    mpWaripass:any;
    mrCellulaier:any;
    mrVoucher:any;
    mrWallet:any;
    mrCodeVoucher:any;
    mrPartenaire:any;
    mrTypeCompte:any;
    mrNumeroCarte:any;
    mrTypeCarte:any;
    mrEspece:any;
    mrCarte:any;
    mrCompte:any;
    mrWaripass:any;
    mr=0;
    mp=0;

    constructor(public _wariservice:WariService) { }

    ngOnInit() {}

    @Input() bbswari:number=0;
    @Output() changementwari=new EventEmitter();

    increment(){
      this.bbswari++;
      this.changementwari.emit(this.bbswari);
    }

    retraitrecherche () {
      let moyenpaiement = this.codewariRadio || this.moyenpayementRadio;
      let type = this.wariRadio || this.rembourchementRadio;

      let datas = "2" + "[" + moyenpaiement+ "[" + this.code + "[" + type;
      //let datas = this.code;
      this.loading = true ;
      this.erreur = false ;
      alert(datas)
      this._wariservice.retaitrerecherche(this.token,datas).then( response => {
          console.log(response)
          this.loading = false ;
          this.retraitcodeconfirme = true;
      });
    }

    retraitrechercheThread (){
      let moyenpaiement = this.codewariRadio || this.moyenpayementRadio;
      let type = this.wariRadio || this.rembourchementRadio;
      let datas = "2" + "[" + moyenpaiement+ "[" + this.code + "[" + type;
      sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wari retrait','operateur':10,'operation':2,'datas':datas,'token':this.token}));
    }

    retraitconfirmer () {
      let moyenpaiement = this.codewariRadio || this.moyenpayementRadio;
      let type = this.wariRadio || this.rembourchementRadio;
      let datas = this.typepiece+"["+this.numero+ "[" +this.pays+ "[" +this.datededelivrance+ "[" +this.datedevalidite+ "]" + "2" + "[" + moyenpaiement+ "[" + this.code + "[" + type;
      //let datas = "2"+ "[" + this.prenomA + "[" +this.nomA+ "[" +this.adresseA + "[" +this.cellulaireA+ "[" +this.montant+ "[" +this.prenomB + "[" +this.nomB+ "[" +this.typepiece+"["+this.numero+ "[" +this.pays+ "[" +this.datededelivrance+ "[" +this.datedevalidite+ "[" + this.prenomCaisse+ "["+ this.nomCaisse;
      console.log(datas);
      this.loading = true ;
      this.erreur = false ;
      alert(datas)
      this._wariservice.retaitconfirmer(this.token,datas).then( response => {
          console.log(response);
          this.loading = false ;
          this.reinitialise();
      });
    }

    retraitconfirmerThread (){
        let moyenpaiement = this.codewariRadio || this.moyenpayementRadio;
        let type = this.wariRadio || this.rembourchementRadio;
        if(this.estvalideRetrait2){
          let datas = "2"+ "[" + this.prenomA + "[" +this.nomA+ "[" +this.adresseA + "[" +this.cellulaireA+ "[" +this.montant+ "[" +this.prenomB + "[" +this.nomB+ "[" +this.typepiece+"["+this.numero+ "[" +this.pays+ "[" +this.datededelivrance+ "[" +this.datedevalidite+ "[" + this.prenomCaisse+ "["+ this.nomCaisse;
          sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wari retrait','operateur':10,'operation':3,'datas':datas,'token':this.token}));
          this.increment();
          this.reinitialise();
        }
        else {
          alert("Vous avez oublié de remplir un champ !");
        }
    }

    retraitThread (){
        let moyenpaiement = this.codewariRadio || this.moyenpayementRadio;
        let type = this.wariRadio || this.rembourchementRadio;
        if(this.estvalideRetrait1(moyenpaiement,type)){
          let datas = "2" + "[" + moyenpaiement+ "[" + this.code + "[" + type;
          sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wari retrait','operateur':10,'operation':2,'datas':datas,'token':this.token}));
          this.increment();
          this.retraitcodeconfirme=true;
        } else {
          alert("Vous avez oublié de remplir un champ !")
        }
    }

    envoyer () {
        let modereception = this.espece || this.wallet || this.compte || this.carte;
        let modepaiment = this.especeEn || this.carteEn || this.waripassEn || this.voucherEn || this.walletEn;

        let datas = "1"+ "[" + this.prenomA + "[" +this.nomA+ "[" +this.adresseA + "[" +this.cellulaireA+ "[" +this.typepiece + "[" +this.pays+ "[" +this.datededelivrance+ "[" +this.datedevalidite + "[" + this.montant+ "[" +this.motif+ "[" + modepaiment +  "["+this.numero + "[" +this.prenomB + "[" +this.nomB+ "[" +this.adresseB + "[" +this.cellulaireB+ "[" +  modereception;
        console.log(datas);
        //let datas = "1"+ "/" + this.prenomEnvoyeur + "/" +this.nomEnvoyeur+ "/" +this.adresseEnvoyeur + "/" +this.cellulaireEnvoyeur+ "/" +this.montantEnvoyeur+ "/" +this.motifEnvoyeur+ "/" +this.typepieceEnvoyeur + "/"+this.numeroPieceEnvoyeur+ "/" +this.paysEnvoyeur+ "/" +this.datededelivranceEnvoyeur+ "/" +this.datedevaliditeEnvoyeur + "/" + this.prenomBeneficiaire + "/" +this.nomBeneficiaire+ "/" +this.adresseBeneficiaire + "/" +this.cellulaireBeneficiaire+ "/" +  modereceptionBeneficiaire;
        this.loading = true ;
        this.erreur = false ;
        alert(datas)
        this._wariservice.envoi(this.token,datas).then( response => {
            console.log(response);
            this.loading = false ;
            this.reinitialise();
        });
    }

    envoyerThread (){
      let modereception = undefined;
      let modepaiment = undefined;
      modereception = this.espece || this.wallet || this.compte || this.carte;
      modepaiment = this.especeEn || this.carteEn || this.waripassEn || this.voucherEn || this.walletEn;
      if(this.estvalideEnvoi(modereception,modepaiment)){
        let datas = "1"+ "[" + this.prenomA + "[" +this.nomA+ "[" +this.adresseA + "[" +this.cellulaireA+ "[" +this.typepiece +this.pays+ "[" +this.datededelivrance+ "[" +this.datedevalidite + "[" + this.montant+ "[" +this.motif+ "[" + modepaiment +  "["+this.numero + "[" +this.prenomB + "[" +this.nomB+ "[" +this.adresseB + "[" +this.cellulaireB+ "[" +  modereception;
        sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wari envoi','operateur':10,'operation':1,'datas':datas}));
        console.log(datas);
        this.increment();
        this.reinitialise();
      }else{
        alert("Vous avez oublié de remplir un champ !")
      }
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
        this.nomCaisse=undefined;
        this.prenomCaisse=undefined;
        this.mpCellulaier=undefined;
        this.mpCodeVoucher=undefined;
        this.mpPartenaire=undefined;
        this.mpTypeCompte=undefined;
        this.mpNumeroCarte=undefined;
        this.mpTypeCarte=undefined;
        this.mpWaripass=undefined;
        this.mrCellulaier=undefined;
        this.mrVoucher=undefined;
        this.mrWallet=undefined;
        this.mrCodeVoucher=undefined;
        this.mrPartenaire=undefined;
        this.mrTypeCompte=undefined;
        this.mrNumeroCarte=undefined;
        this.mrTypeCarte=undefined;
        this.mrEspece=undefined;
    }

  suivant(){
     this.infoBen=true;
     this.infoEnv=false;
     this.btnValider=true;
     this.btnPrecedant=true;
     this.btnSuivant=false;
  }

  precedant(){
     this.infoBen=false;
     this.infoEnv=true;
     this.btnValider=false;
     this.btnPrecedant=false;
     this.btnSuivant=true;
  }

  estvalideEnvoi(modereception:any,modepaiment:any):boolean{
    let reg = /^\d{13}$/;

    if( (this.prenomA==undefined || (this.prenomA).trim()=='')  ||
    (this.nomA==undefined || (this.nomA).trim()=='') ||
    (this.adresseA==undefined || (this.adresseA).trim()=='') ||
    (this.cellulaireA==undefined || this.cellulaireA==0) ||
    (this.typepiece==undefined || (this.typepiece).trim()=='') ||
    (this.pays==undefined || (this.pays).trim()=='') ||
    (this.datededelivrance==undefined || (this.datededelivrance).trim()=='') ||
    (this.datedevalidite==undefined || (this.datedevalidite).trim()=='') ||
    (this.montant==undefined || this.montant==0) ||
    (this.motif==undefined || (this.motif).trim()=='') ||
    (modepaiment==undefined || (modepaiment).trim()=='') ||
    (this.numero==undefined || this.numero==0 ) ||
    (this.prenomB==undefined || (this.prenomB).trim()=='') ||
    (this.nomB==undefined || (this.nomB).trim()=='') ||
    (this.adresseB==undefined || (this.adresseB).trim()=='') ||
    (this.cellulaireB==undefined || this.cellulaireB==0) ||
    (modereception==undefined || modereception.trim()=='')){
        return false;
    } else {
      return true;
    }
  }

  estvalideRetrait1(moyenpaiement:any,type:any):boolean{

    if( (this.code==undefined || this.code==0  ||
        (moyenpaiement==undefined || moyenpaiement.trim()=='') ||
        (type==undefined || type.trim()==''))){
        return false;
    } else {
        return true;
    }
  }

  estvalideRetrait2():boolean{
    let reg = /^\d{13}$/;
    if( (this.prenomCaisse==undefined || (this.prenomCaisse).trim()=='')  ||
    (this.nomCaisse==undefined || (this.nomCaisse).trim()=='') ||
    (this.prenomA==undefined || (this.prenomA).trim()=='')  ||
    (this.nomA==undefined || (this.nomA).trim()=='') ||
    (this.adresseA==undefined || (this.adresseA).trim()=='') ||
    (this.cellulaireA==undefined || this.cellulaireA==0) ||
    (this.montant==undefined || this.montant==0) ||
    (this.prenomB==undefined || (this.prenomB).trim()=='') ||
    (this.nomB==undefined || (this.nomB).trim()=='') ||
    (this.typepiece==undefined || (this.typepiece).trim()=='') ||
    (this.pays==undefined || (this.pays).trim()=='') ||
    (this.numero==undefined || this.numero==0 ) ||
    (this.datededelivrance==undefined || (this.datededelivrance).trim()=='') ||
    (this.datedevalidite==undefined || (this.datedevalidite).trim()=='')
    ){
      return false;
    } else {
      return true;
    }
  }
}
