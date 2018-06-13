import {Component, OnInit, ViewChild} from '@angular/core';
import { ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {WizallService} from "../services/wizall.service";


@Component({
  selector: 'app-wizall',
  templateUrl: './wizall.component.html',
  styleUrls: ['./wizall.component.css']
})
export class WizallComponent implements OnInit {

  mnt : string;
  numclient : string;
  echeance : string ;
  nomclient : string ;
  etat: Boolean=false;
  fraisDepot: Number = 0 ;
  validerfirst:boolean;
  validersecond:boolean;
  prenomE:string;
  nomE:string;
  telE:string;
  prenomB:string;
  nomB:string;
  telB:string;
  montant:string;
  client:any;
  num_card:string;
  nationalite:string;
  secondcode:string;
  donneeretraitbon:any;
  type_piece:string;
  codebon:string="";
  messageretraitcash:boolean=false;
  errorverifcode:boolean=false;
  messageretraitcasherror:boolean=false;
  messagesecondcode:boolean=false;
  errormontant:boolean=false;
  errornumero:boolean=false;
  errorenvoi:boolean=false;
  adejaclick:boolean = false;


  constructor(private _wizallService : WizallService) { }

  ngOnInit() {
    this.messageretraitcash=false;
    this.messageretraitcasherror=false;
    this.errorverifcode=false;
    this.messagesecondcode=false;
  }

  @ViewChild('modaldepot') public modaldepot:ModalDirective;
  @ViewChild('modalretrait') public modalretrait:ModalDirective;
  @ViewChild('modalsde') public modalsde:ModalDirective;
  @ViewChild('modalsenelec') public modalsenelec:ModalDirective;
  @ViewChild('modalretraitbon') public modalretraitbon:ModalDirective;
  @ViewChild('modalretraitbonachat') public modalretraitbonachat:ModalDirective;
  @ViewChild('modalenvoiboncash') public modalenvoiboncash:ModalDirective;
  @ViewChild('modalenvoibonachat') public modalenvoibonachat:ModalDirective;
  @ViewChild('modalfraiscashin') public modalfraiscashin:ModalDirective;
  @ViewChild('modalfraisEnvoieBon') public modalfraisEnvoieBon:ModalDirective;


  public showmodalfraisEnvoieBon(){
    this.adejaclick = false;
    this.modalfraisEnvoieBon.show() ;
  }
  public fermermodalfraisEnvoieBon(){
    this.modalfraisEnvoieBon.hide() ;
  }

  public showmodalfraiscashin(){
    this.adejaclick = false;
    this.modalfraiscashin.show();
  }
  public fermermodalfraiscashin(){
    this.modalfraiscashin.hide();
  }

  public hidemodalenvoibonachat(){
    this.modalenvoibonachat.hide();
  }

  public showmodalenvoiboncash(){
    this.adejaclick = false;
    this.errorenvoi=false;
    if(this.prenomE!=undefined && this.nomE!=undefined && this.verif_phone_number(this.telE)==true && this.verif_montant(this.montant)==true && this.nationalite!=undefined && this.type_piece!=undefined && this.num_card!=undefined && this.prenomB!=undefined && this.nomB!=undefined && this.verif_phone_number(this.telB)==true){
      this.modalenvoiboncash.show();
    }else{
      this.errorenvoi=true;
    }
  }

  public annulerenvoicash(){
    this.reinitialiser();
  }

  public hidemodalenvoiboncash(){
    this.modalenvoiboncash.hide();
  }

  public showmodalretraitbonachat(){
    this.adejaclick = false;
    this.modalretraitbonachat.show();
  }

  public hidemodalretraitbonachat(){
    this.modalretraitbonachat.hide();
  }

  public reinitialiser(){
    this.prenomE=undefined;
    this.nomE=undefined;
    this.telE=undefined;
    this.prenomB=undefined;
    this.nomB=undefined;
    this.telB=undefined;
    this.montant=undefined;
    this.client=undefined;
    this.num_card=undefined;
    this.nationalite=undefined;
    this.secondcode=undefined;
    this.donneeretraitbon=undefined;
    this.messageretraitcash=false;
    this.messageretraitcasherror=false;
    this.errorverifcode=false;
    this.messagesecondcode=false;
    this.mnt=undefined;
    this.numclient=undefined;
    this.codebon=undefined;
    this.errornumero=false;
    this.errormontant=false;
    this.errorenvoi=false;
  }

  public validerenvoibon(){
    console.log({'nom':'Wizall envoi de bon','operateur':6,'operation':6,prenomE:this.prenomE,nomE:this.nomE,telE:this.telE,nationalite:this.nationalite,type_piece:this.type_piece,num_card:this.num_card,montant:this.montant,prenomB:this.prenomB,nomB:this.nomB,telB:this.telB})
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wizall envoi de bon','operateur':6,'operation':6,prenomE:this.prenomE,nomE:this.nomE,telE:this.telE,nationalite:this.nationalite,type_piece:this.type_piece,num_card:this.num_card,montant:this.montant,prenomB:this.prenomB,nomB:this.nomB,telB:this.telB}));
    this.hidemodalenvoiboncash();
    this.reinitialiser();
  }

  public validerbonachat(){
    this.hidemodalenvoibonachat();
    this.reinitialiser();
  }

  public showmodalretraitbon(){
    this.adejaclick = false;
    this.messageretraitcash=false;
    this.messageretraitcasherror=false;
    this.errorverifcode=false;
    if(this.codebon!="" && this.codebon!=undefined){
      this._wizallService.verifier_code_retraitbon(this.codebon).then(data => {
        if(typeof data !== 'object') {
          this.errorverifcode=true;
          this.messageretraitcasherror=false;
        }
        else if(data.status=="valid"){
          this.errorverifcode=false;
          this.donneeretraitbon=data;
          this.prenomE=this.donneeretraitbon.customer.first_name;
          this.nomE=this.donneeretraitbon.customer.last_name;
          this.telE=this.donneeretraitbon.customer.phone_number;
          this.prenomB=this.donneeretraitbon.recipient.first_name;
          this.nomB=this.donneeretraitbon.recipient.last_name;
          this.telB=this.donneeretraitbon.recipient.phone_number;
          this.montant=this.donneeretraitbon.value;
          this.validerfirst=true;
          this.validersecond=false;
          this.modalretraitbon.show();
        }
        else{
          this.errorverifcode=true;
          this.messageretraitcasherror=false;
        }
      }).catch(response => {
        console.log(response);
        this.errorverifcode=true;
        this.messageretraitcasherror=false;
      });
    }
  }

  public hidemodalretraitbon(){
    this.modalretraitbon.hide();
    this.reinitialiser();
  }

  public depotmodal(){
    this.fraisDepot = this.getFrais(this.mnt) ;
    this.modaldepot.show();
  }

  public retirermodal(){
    this.errornumero=false;
    this.errormontant=false;
    if(this.verif_phone_number(this.numclient)==true && this.numclient!="" && this.verif_montant(this.mnt)==true && this.mnt!=""){
      this.modalretrait.show();
    }else{
      if(this.verif_phone_number(this.numclient)==false || this.numclient=="" || this.numclient==undefined){
        this.errornumero=true;
      }
      if(this.verif_montant(this.mnt)==false || this.mnt=="" || this.mnt==undefined){
        this.errormontant=true;
      }
    }
  }

  fermermodaldepot(){
    this.modaldepot.hide();
    this.reinitialiser();
  }

  fermermodalretrait(){
    this.reinitialiser();
    this.validerfirst=false;
    this.validersecond=false;
    this.modalretrait.hide();
  }

  valider_code(){
    this._wizallService.getSendSecureID(this.codebon).then( response =>{
      console.log(response);
      this.validerfirst=false;
      this.validersecond=true;
    }).catch(response => {
      console.log(response);
      this.validerfirst=false;
      this.validersecond=true;
    });
  }

  validationretraitbon(){
    let montantRetrait = Number(this.montant) ;
    let data={'nom':'Wizall retrait de bon','operateur':6,'operation':5, 'nationalite':this.nationalite,'num_card':this.num_card,'type_carte':this.type_piece,'codebon':this.secondcode,'code_validation':this.codebon, 'montant':montantRetrait };
    sessionStorage.setItem('curentProcess',JSON.stringify(data) ) ;
    this.hidemodalretraitbon();
  }

  deposer(){
    this.mnt = Number(this.mnt) + Number(this.fraisDepot)+"" ;
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wizall depot','operateur':6,'operation':1,'montant':this.mnt,'num':this.numclient}));
    this.fermermodaldepot() ;
  }

  retirer(){
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Wizall retrait','operateur':6,'operation':2,'montant':this.mnt,'num':this.numclient}));
    this.fermermodalretrait() ;
  }

  isNumber(num:string):boolean{
    let tab=["0","1","2","3","4","5","6","7","8","9"];
    for(let i=0;i<tab.length;i++){
      if(num===tab[i]){
        return true;
      }
    }
    return false;
  }

  verif_phone_number(number:string):boolean{
    let numero=number.split("");
    console.log(numero.length);
    if(numero.length!=parseInt("9")){
      return false;
    }
    for(let i=0;i<numero.length;i++){
      if(!this.isNumber(numero[i])){
        return false;
      }
    }
    return true;
  }

  verif_montant(mnt:string):boolean{
    if(parseInt(mnt)>1){
      return true;
    }else{
      return false;
    }
  }

  getFrais(montant){
    let frais = 0 ;

    if(montant>=1 && montant <=499)
      frais =  25 ;

    if(montant>=500 && montant <=1100)
      frais =  60 ;

    if(montant>=1101 && montant <=3000)
      frais =  150 ;

    if(montant>=3001 && montant <=5000)
      frais =  200 ;

    if(montant>=5001 && montant <=10000)
      frais =  400 ;

    if(montant>=10001 && montant <=15000)
      frais =  600 ;
    if(montant>=15001 && montant <=20000)
      frais =  800 ;
    if(montant>=20001 && montant <=35000)
      frais =  1400 ;
    if(montant>=35001 && montant <=60000)
      frais =  2400 ;
    if(montant>=60001 && montant <=75000)
      frais =  2625 ;
    if(montant>=75001 && montant <=100000)
      frais =  3100 ;
    if(montant>=100001 && montant <=150000)
      frais =  4000 ;
    if(montant>=150001 && montant <=200000)
      frais =  6000 ;
    if(montant>=200001 && montant <=300000)
      frais =  7500 ;
    if(montant>=300001 && montant <=400000)
      frais =  10000 ;
    if(montant>=400001 && montant <=750000)
      frais =  14000 ;
    if(montant>=750001 && montant <=1000000)
      frais =  montant*0.018 ;

    return frais ;
  }

  getFraisTransfert(montant){
    let frais = 0 ;

    if(montant>=2000 && montant <=3049)
      frais =  200 ;

    if(montant>=3050 && montant <=5049)
      frais =  400 ;

    if(montant>=5050 && montant <=10049)
      frais =  700 ;

    if(montant>=10050 && montant <=15049)
      frais =  1100 ;

    if(montant>=15050 && montant <=20049)
      frais =  1300 ;

    if(montant>=20050 && montant <=25049)
      frais =  1500 ;

    if(montant>=25050 && montant <=35049)
      frais =  1700 ;

    if(montant>=35050 && montant <=50049)
      frais =  1800 ;

    if(montant>=50050 && montant <=60049)
      frais =  2300 ;

    if(montant>=60050 && montant <=75049)
      frais =  2700 ;

    if(montant>=75050 && montant <=100049)
      frais =  3200 ;

    if(montant>=100050 && montant <=125049)
      frais =  3600 ;

    if(montant>=125050 && montant <=150049)
      frais =  4000 ;

    if(montant>=150050 && montant <=200049)
      frais =  4800 ;

    if(montant>=200050 && montant <=250049)
      frais =  6350 ;

    if(montant>=250050 && montant <=300049)
      frais =  8050 ;

    if(montant>=300050 && montant <=350049)
      frais =  8450 ;

    if(montant>=350050 && montant <=400049)
      frais =  9750 ;

    if(montant>=400050 && montant <=600049)
      frais =  11850 ;

    if(montant>=600050 && montant <=750049)
      frais =  13550 ;

    if(montant>=750050 && montant <=1000000)
      frais =  21650 ;

    return frais ;
  }

  nombreFormate(montant){
    return Number( montant.split(".")[0] ).toLocaleString() ;
  }

  nombreEntier(montant){
    return Number( montant ) ;
  }

}
