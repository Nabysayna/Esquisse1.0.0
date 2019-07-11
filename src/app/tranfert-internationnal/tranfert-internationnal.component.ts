import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { TransfertinternationnalService } from 'app/services/transfertinternationnal.service';
import { StylesCompileDependency } from '@angular/compiler';

@Component({
  selector: 'app-tranfert-internationnal',
  templateUrl: './tranfert-internationnal.component.html',
  styleUrls: ['./tranfert-internationnal.component.css']
})
export class TranfertInternationnalComponent implements OnInit {

  adejaclick:boolean = false;
  adejaclick1:boolean = false;
  errorverifcode:boolean = false;
  validerfirst:boolean = false;
  validersecond:boolean = false;
  verifiernuminput:string="";
  type_piece:string="";
  num_card:string="";
  typeenvoie:boolean=false;
  etapEnvoie:number=1;
  listPays:any = [];
  optionEnvoie:number = 0;
  indicePaysSender:any;
  indicePaysReceiver:any;
  pays_emet:string;
  pays_benef:string;
  

  envoie ={
  "devise_emission":"",
	"montant_emis":"",
	"devise_paiement":"",
	"montant_paye":"",
	"paysdestination":"",
	"produit":"",
	"frais_devise_paiement":"",
	"nom_emet":"",
	"prenom_emet":"",
	"telephoneport_emet":"",
	"adresse_emet":"",
  "pays_emet":"",
	"ville_emet":"",
	"nom_benef":"",
	"prenom_benef":"",
	"telephone_benef":"",
	"telephoneport_benef":"",
	"adresse_benef":"",
	"ville_benef":"",
	"pays_benef":"",
	"compteacrediter":"",
  "banqueacrediter":"",
  "numerowalletcrediter":"",
  "nomwallercrediter":""
  }
  getCountryReceiver(i){
    this.indicePaysReceiver = this.listPays[i];
  }
  getCountrySender(i){
    this.indicePaysSender = this.listPays[i];
  }
 


  reinitialiser(){
    this.envoie ={
      "devise_emission":"",
      "montant_emis":"",
      "devise_paiement":"",
      "montant_paye":"",
      "paysdestination":"",
      "produit":"",
      "frais_devise_paiement":"",
      "nom_emet":"",
      "prenom_emet":"",
      "telephoneport_emet":"",
      "adresse_emet":"",
      "pays_emet":"",
      "ville_emet":"",
      "nom_benef":"",
      "prenom_benef":"",
      "telephone_benef":"",
      "telephoneport_benef":"",
      "adresse_benef":"",
      "ville_benef":"",
      "pays_benef":"",
      "compteacrediter":"",
      "banqueacrediter":"",
      "numerowalletcrediter":"",
      "nomwallercrediter":""
      }
  }


  @ViewChild('modalretraitbonachat') public modalretraitbonachat:ModalDirective;
  @ViewChild('modalretrait') public modalretrait:ModalDirective;
  @ViewChild('modalenvoie') public modalenvoie:ModalDirective;

  public showmodalenvoie(){
    this.modalenvoie.show();
  }public hidemodalenvoie(){
    this.modalenvoie.hide();
    this.reinitialiser();
  }
  
  public showmodalretrait(){
    this.adejaclick1 = false;
    this.modalretrait.show();
  }

  public hidemodalretrait(){
    this.verifiernuminput ="";
    this.adejaclick1 = false;
    this.adejaclick = false;
    this.num_card = "";
    this.type_piece = "";
    this.validersecond = false;
    this.modalretrait.hide();
  } 
  public showmodalretraitbonachat(){
    this.adejaclick = false;
    this.modalretraitbonachat.show();
  }

  public hidemodalretraitbonachat(){
    this.errorverifcode = false;
    this.verifiernuminput ="";
    this.modalretraitbonachat.hide();
  }
  nombreFormate(montant){
    return Number( montant.split(".")[0] ).toLocaleString() ;
  }

  data = {"NumeroTransaction":"2234571352",
  "codeTransaction":"1234571352",
  "montant_paye":"1000",
  "devise_paiement":"XOF",
  "montant_emis":"1000",
  "devise_emission":"XOF",
  "taux_change":"1",
  "produit":"010",
  "status":"0",
  "aml":"0",
  "datedepot":"2019-04-08 12:46:11",
  "datepayement":null,
  "operateurenvoi":"AFXOFSNBR0100010001000038",
  "operateurpayement":"",
  "paysdestination":"SN",
  "compteacrediter":"",
  "banqueacrediter":"",
  "frais_devise_emission":"100",
  "frais_devise_paiement":"100",
  "nom_emet":"FAYE",
  "prenom_emet":"MANSOUR",
  "telephoneport_emet":"221772965757",
  "adresse_emet":"Dakar",
  "ville_emet":"",
  "nom_benef":"DIOUF",
  "prenom_benef":"ALBERT",
  "telephone_benef":"221766992661",
  "adresse_benef":"DAKAR",
  "ville_benef":"",
  "telephoneport_benef":"",
  "email_benef":"lionel.diedhiou@gmail.com",
  "partenaire":"AFXOFSNBVST"}

  rechecher(){
    
    this.errorverifcode = false;
    this.showmodalretraitbonachat();
    if(this.verifiernuminput =="1234571352"){
      //console.log(this.data);
      this.validerfirst = true;
      //this.showmodalretraitbonachat();
    }else{
      this.errorverifcode = true;
      this.validerfirst = false;
    }
  }
  valider_code(){
    this.validersecond = true;
  }
 @Input() bbsTI:number=0;
 @Output() changementTranfertInternationnal=new EventEmitter();

 increment(){
    this.bbsTI++;
    this.changementTranfertInternationnal.emit(this.bbsTI);
  }
  token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  retirer(){
    sessionStorage.setItem('curentProcess',JSON.stringify({'token':this.token,'nom':'transfert internationnal','operateur':11,'operation':1,'nom_emet':this.data.nom_emet,'prenom_emet':this.data.prenom_emet,'nom_benef':this.data.nom_benef,'prenom_benef':this.data.prenom_benef,'noTransaction':this.data.NumeroTransaction,'codeTransation':this.data.codeTransaction,'montant_payer':this.data.montant_paye,'montant_emis':this.data.montant_emis,'typepiece':this.type_piece,'numeropiece':this.num_card}));
    this.increment();
    //console.log(sessionStorage.getItem('curentProcess'));
    this.hidemodalretraitbonachat();
  }
  envoyerInit(){
    this.showmodalenvoie()
  }
  envoyer(){
    
   
   for(let i of this.listPays){
      if(i.alpha2 == this.envoie.pays_emet){
        this.indicePaysSender =i;
      }
      if(i.alpha2 == this.envoie.pays_benef){
        this.indicePaysReceiver =i;
      }
    }
    
    let emetteur = this.listPays.filter(pays => pays.name == this.pays_emet);
    let recepteur = this.listPays.filter(pays => pays.name == this.pays_benef)
    //this.envoie.pays_emet = emetteur[0].
  
    //this.hidemodalenvoie();
    console.log(emetteur);
    console.log(this.pays_emet);
    console.log("recepteur");
    console.log(this.pays_benef);
    this.envoie.pays_emet = emetteur[0].alpha2;
    this.envoie.pays_benef = recepteur[0].alpha2;
    this.envoie.devise_emission = emetteur[0].currencies[0];
    this.envoie.devise_paiement = recepteur[0].currencies[0];
    this.envoie.telephoneport_benef =this.envoie.telephone_benef
    console.log(this.envoie);
    sessionStorage.setItem('curentProcess',JSON.stringify({'token':this.token,'nom':'transfert internationnal','operateur':11,'operation':2,'info':this.envoie}));
    this.increment();
    this.hidemodalenvoie();
    this.typeenvoie = false;
    this.etapEnvoie =1

  
  }
 
  constructor(private _tranfertService:TransfertinternationnalService) { }



  ngOnInit() {
    var countries = require('country-data').countries;
    this.listPays = countries.all;
   /* console.log(this.listPays);
    for(let p of countries){
      //console.log(p.name);
      
    }
    let pays = countries.all;
    console.log("second");
    for(let pa of pays){
      console.log(pa.name);
      
    }*/
    console.log(countries.all[200].alpha2);
    console.log(countries.all[200].name);
    
  }

}
