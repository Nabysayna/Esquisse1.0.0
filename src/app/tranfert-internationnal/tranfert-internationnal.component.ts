import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { TransfertinternationnalService } from 'app/services/transfertinternationnal.service';

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



  @ViewChild('modalretraitbonachat') public modalretraitbonachat:ModalDirective;
  @ViewChild('modalretrait') public modalretrait:ModalDirective;

  
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
  constructor(private _tranfertService:TransfertinternationnalService) { }

  ngOnInit() {
  }

}
