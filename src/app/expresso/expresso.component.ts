import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';


import { ExpressocashService } from "../services/expressocash.service";

@Component({
  selector: 'app-expresso',
  templateUrl: './expresso.component.html',
  styleUrls: ['./expresso.component.css']
})
export class ExpressoComponent implements OnInit {

  numclient :  string ;
  mnt : string ;
  transactionReference: string;
  OTP: string;
  pin:string;

  errorMessage :  string ;

  keycode=[{'code':97,'value':1},{'code':98,'value':2},{'code':99,'value':3},{'code':100,'value':4},{'code':101,'value':5},{'code':102,'value':6},{'code':103,'value':7},{'code':104,'value':8},{'code':105,'value':9},{'code':96,'value':0},{'code':48,'value':0},{'code':49,'value':1},{'code':50,'value':2},{'code':51,'value':3},{'code':52,'value':4},{'code':53,'value':5},{'code':54,'value':6},{'code':55,'value':7},{'code':56,'value':8},{'code':57,'value':9}];
  nombre=["0","1","2","3","4","5","6","7","8","9"];
  loading = false ;
  depotreussi=false;
  echecdepot=false;
  transintreussi=false;
  echectransint=false;
  retraitreussi=false;
  echecretrait=false;
  retraitcodereussi=false;
  echecretraitcode=false;
  mag1=false;
  mag2=false;
  style:any;
  nbchiffres:any=0;
  numero:any;
  coderetrait:string;
  prenom:string="";
  nom:string="";
  cni:string;
  date:string;
  verifretraitcode=[false,false,false,false];
  msisdn:string;
  id:string;
  firstname:string;
  lastname:string;
  clientID:string;
  clientPassword:string;

  constructor(private expressocashwebservice : ExpressocashService) {
  }

  @ViewChild('modaldepot') public modaldepot:ModalDirective;
  @ViewChild('modalretrait') public modalretrait:ModalDirective;
  @ViewChild('modalretraitConfirm') public modalretraitConfirm:ModalDirective;
  @ViewChild('modalretraitcode') public modalretraitcode:ModalDirective;
  @ViewChild('modalretraitcodeConfirm') public modalretraitcodeConfirm:ModalDirective;
  @ViewChild('modalinscription') public modalinscription:ModalDirective;
  
  showmodalinscription(){
     this.modalinscription.show(); 
  }
  hidemodalinscription(){
     this.modalinscription.hide(); 
  }

  ngOnInit() { }

  // retrait simple
  infoDepot:any;

/*******************************  DEPOT *****************************************/

  public fairedepot(){

    this.hidemodaldepot();

    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'E-Money depot','operateur':7,'operation':1,'numclient':this.numclient,'mnt':this.mnt}));
  }

/************************************************************************/


  // retrait simple
  infoRetraitsimple:any;
  infoRetraitsimpleconfirm:any;

  public faireretraitsimple(){
    this.hidemodalretrait();
    this.expressocashwebservice.cashout(this.numclient, this.mnt).then(expressocashwebserviceList => {
      if(!expressocashwebserviceList.match("cURL Error #:")){
        this.infoRetraitsimple = JSON.parse(JSON.parse(expressocashwebserviceList));
        if(this.infoRetraitsimple.status==0){
          this.showmodalretraitConfirm();
        }
        else{
          this.echecretrait = true;
          this.retraitreussi= false;
          this.errorMessage = this.infoRetraitsimple.message ;
        }
      }
      else{
        this.echecretrait = true;
        this.retraitreussi= false;
      }
    });
  }


/*************************** RETRAIT *************************************/
  public faireretraitsimpleConfirm(){

      this.hidemodalretraitConfirm();

      sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'E-Money depot','operateur':7,'operation':2,'transactionReference':this.transactionReference,'OTP':this.OTP}));
  }

/************************************************************************/
  // retrait avec code
  infoRetraitaveccode:any;
  infoRetraitaveccodeconfirm:any;
  public faireretraitaveccode(){
    this.pin = this.coderetrait;
    this.hidemodalretraitcode();
    this.expressocashwebservice.pinCashoutCheck(this.coderetrait).then(expressocashwebserviceList => {
      if(!expressocashwebserviceList.match("cURL Error #:")){
        this.infoRetraitaveccode = JSON.parse(JSON.parse(expressocashwebserviceList));
        if(this.infoRetraitaveccode.status==0){
          this.showmodalretraitcodeConfirm();
        }
        else{
          this.echecretraitcode = true;
          this.errorMessage = this.infoRetraitaveccode.message ;
          this.retraitcodereussi = false;
        }
      }
      else{
        this.echecretraitcode = true;
        this.retraitcodereussi = false;
      }
    });
  }

/****************************** RETRAIT CODE ******************************************/

  public faireretraitaveccodeConfirm(){

      this.hidemodalretraitcodeConfirm();

    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'E-Money depot','operateur':7,'operation':3,'pin':this.pin,'cni':this.cni}));
  }
/************************************************************************/

  /****************reinitialise***********************/
  reinitialise(){
    this.mnt=undefined;
    this.numclient=undefined;
    this.echecdepot = false ;
    this.echecretrait = false ;
    this.echecretraitcode = false ;
  }
  reinitialiseR(){
    this.date=undefined;
    this.prenom=undefined;
    this.nom=undefined;
    this.cni=undefined;
    this.numclient=undefined;
    this.coderetrait=undefined;
    this.transactionReference=undefined;
    this.OTP=undefined;
    this.echecdepot = false ;
    this.echecretrait = false ;
    this.echecretraitcode = false ;
  }
  reinitialiseRcode(){
    this.date=undefined;
    this.prenom=undefined;
    this.nom=undefined;
    this.cni=undefined;
    this.numclient=undefined;
    this.coderetrait=undefined;
    this.echecdepot = false ;
    this.echecretrait = false ;
    this.echecretraitcode = false ;
  }


  /******************verif numero***********************/
   verifNumber(event:any){
    if(event.keyCode!=16 && event.keyCode!=20 && event.keyCode!=9 && event.keyCode!=37 && event.keyCode!=38 && event.keyCode!=39 && event.keyCode!=40){

     var nb=event.target.value.length;
     var val=event.target.value.split('');
     var j=0,k=0;
     for(j=0;j<this.nombre.length;j++){
       if(val[event.target.value.length-1]==this.nombre[j]){
         k=1;
       }
     }
    if(k==0 && event.target.value!=""){
        this.mag1=true;
        this.numclient=undefined;
    }
     var i=0,v=0;
     for(i=0;i<this.keycode.length;i++){
        if(event.keyCode==this.keycode[i].code){
            this.mag1=false;
            v=1;
        }
     }
     if(v==0 && event.keyCode!=8 && event.keyCode!=16 && event.target.value!=""){
        this.mag1=true;
        this.numclient=undefined;
     }
    }

   }
  /******************verif montant***********************/
  verifMontant(event:any){

    if(event.keyCode!=16 && event.keyCode!=20 && event.keyCode!=9 && event.keyCode!=37 && event.keyCode!=38 && event.keyCode!=39 && event.keyCode!=40){

      var nb=event.target.value.length;
      var val=event.target.value.split('');
      var j=0,k=0;
      for(j=0;j<this.nombre.length;j++){
        if(val[event.target.value.length-1]==this.nombre[j]){
          k=1;
        }
      }
      if(k==0 && event.target.value!=""){
        this.mag2=true;
        this.mnt=undefined;
        return ;
      }
      //console.log(val);
      var i=0,v=0;
      for(i=0;i<this.keycode.length;i++){
        if(event.keyCode==this.keycode[i].code){
          this.mag2=false;
          v=1;
        }
      }
      if(v==0 && event.keyCode!=8 && event.keyCode!=16 && event.target.value!=""){
        this.mag2=true;
        this.mnt=undefined;
        return  ;
      }
    }
  }
  /************validat new customer******************/
    customerRegistration(){
      /*this.expressocashwebservice.customerRegistration(msisdn:this.msisdn,id:this.id,firstname:this.firstname,lastname:this.lastname,clientID:this.clientID,clientPassword:this.clientPassword).then(response =>{
         console.log(response);
      
      }); */ 
    }
  /*************************************************/
  /************verif code***************************/
  verifcode(event:any){
    if(event.keyCode!=16 && event.keyCode!=20 && event.keyCode!=9 && event.keyCode!=37 && event.keyCode!=38 && event.keyCode!=39 && event.keyCode!=40){
      var nb=event.target.value.length;
      var val=event.target.value.split('');
      var j=0,k=0;
      for(j=0;j<this.nombre.length;j++){
        if(val[event.target.value.length-1]==this.nombre[j]){
          k=1;
        }
      }
      if(k==0 && event.target.value!=""){
        this.coderetrait=undefined;
      }

      var i=0,v=0;
      for(i=0;i<this.keycode.length;i++){
        if(event.keyCode==this.keycode[i].code){
          v=1;
        }
      }
      if(v==0 && event.keyCode!=8 && event.keyCode!=16 && event.target.value!=""){

        this.coderetrait=undefined;
      }
      if(nb==10){
        this.verifretraitcode[0]=true;
        this.controlretraitcode();
      }
      else{
        this.verifretraitcode[0]=false;
      }
    }
  }
  /************verif cni***************************/
  verifcni(event:any){
    if(event.keyCode!=16 && event.keyCode!=20 && event.keyCode!=9 && event.keyCode!=37 && event.keyCode!=38 && event.keyCode!=39 && event.keyCode!=40){
      var nb=event.target.value.length;
      if(nb==1){
        if(event.target.value!=1 && event.target.value!=2){
          this.cni=undefined;
        }
      }
      var val=event.target.value.split('');
      var j=0,k=0;
      for(j=0;j<this.nombre.length;j++){
        if(val[event.target.value.length-1]==this.nombre[j]){
          k=1;
        }
      }
      if(k==0 && event.target.value!=""){
        this.cni=undefined;
      }
      var i=0,v=0;
      for(i=0;i<this.keycode.length;i++){
        if(event.keyCode==this.keycode[i].code){
          v=1;
        }
      }
      if(v==0 && event.keyCode!=8 && event.keyCode!=16 && event.target.value!=""){

        this.cni=undefined;
      }
    }
  }

  /******************controle code***************************/
  controlretraitcode(){
    var i=0,jeton=1;
    for(i=0;i<this.verifretraitcode.length;i++){
      if(this.verifretraitcode[i]==false){
        jeton=0;
        break;
      }
    }
  }


  /*****************************************************/


  public showmodaldepot():void {
    this.modaldepot.show();
  }
  public hidemodaldepot():void {
    this.modaldepot.hide();
  }

  public showmodalretrait():void{
    this.modalretrait.show();
  }
  public hidemodalretrait():void{
    this.modalretrait.hide();
  }

  public showmodalretraitConfirm():void{
    this.modalretraitConfirm.show();
  }
  public hidemodalretraitConfirm():void{
    this.modalretraitConfirm.hide();
  }

  public showmodalretraitcode(){
    this.modalretraitcode.show();
  }
  public hidemodalretraitcode(){
    this.modalretraitcode.hide();
  }

  public showmodalretraitcodeConfirm(){
    this.modalretraitcodeConfirm.show();
  }
  public hidemodalretraitcodeConfirm(){
    this.modalretraitcodeConfirm.hide();
  }

}
