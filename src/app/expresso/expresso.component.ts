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
  cni:string;

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
  date:string;
  verifretraitcode=[false,false,false,false];

  constructor(private _expressocashService : ExpressocashService) {
  }

  @ViewChild('modaldepot') public modaldepot:ModalDirective;
  @ViewChild('modalretrait') public modalretrait:ModalDirective;
  @ViewChild('modalretraitConfirm') public modalretraitConfirm:ModalDirective;
  @ViewChild('modalretraitcode') public modalretraitcode:ModalDirective;
  @ViewChild('modalretraitcodeConfirm') public modalretraitcodeConfirm:ModalDirective;

  ngOnInit() {

  }

  // retrait simple
  infoDepot:any;
  public fairedepot(){
    this._expressocashService.cashin(this.numclient, this.mnt).then(expressocashwebserviceList => {
      console.log(expressocashwebserviceList)
      console.log("---------------fairedepot---------------------")
      if(!expressocashwebserviceList.match("cURL Error #:")){
        this.infoDepot = JSON.parse(expressocashwebserviceList);
        console.log(this.infoDepot)
        if(this.infoDepot.status==0){
          this.depotreussi = true;
          this.echecdepot = false
        }
        else{
          this.echecdepot = true
          this.depotreussi = false;
        }
      }
      else{
        this.echecdepot = true
        this.depotreussi = false;
      }
      this.hidemodaldepot();
    });

  }

  // retrait simple
  infoRetraitsimple:any;
  infoRetraitsimpleconfirm:any;
  public faireretraitsimple(){
    this._expressocashService.cashout(this.numclient, this.mnt).then(expressocashwebserviceList => {
      console.log("-----------------faireretraitsimple-------------------")
      if(!expressocashwebserviceList.match("cURL Error #:")){
        this.infoRetraitsimple = JSON.parse(expressocashwebserviceList);
        console.log(this.infoRetraitsimple)
        if(this.infoRetraitsimple.status==0){
          this.showmodalretraitConfirm();
        }
        else{
          this.echecretrait = true;
          this.retraitreussi= false;
        }
      }
      else{
        this.echecretrait = true;
        this.retraitreussi= false;
      }
      this.hidemodalretrait();
    });

  }
  public faireretraitsimpleConfirm(){
    console.log("***************************************");
    console.log(this.transactionReference+" -- "+this.OTP);
    this._expressocashService.confirmCashout(this.transactionReference, this.OTP).then(expressocashwebserviceList => {
      console.log("-----------------faireretraitsimpleConfirm-------------------")
      console.log(expressocashwebserviceList)
      if(!expressocashwebserviceList.match("cURL Error #:")){
        this.infoRetraitsimpleconfirm = JSON.parse(expressocashwebserviceList);
        console.log(this.infoRetraitsimpleconfirm)
        if(this.infoRetraitsimpleconfirm.status==0){
          this.retraitreussi = true;
          this.echecretrait = false;
        }
        else{
          this.echecretrait = true
          this.retraitreussi = false;
        }
      }
      else{
        this.echecretrait = true
        this.retraitreussi = false;
      }
      this.hidemodalretraitConfirm();
    });

  }

  // retrait avec code
  infoRetraitaveccode:any;
  infoRetraitaveccodeconfirm:any;
  public faireretraitaveccode(){
    console.log(this.coderetrait);
    this.pin = this.coderetrait;
    this._expressocashService.pinCashoutCheck(this.coderetrait).then(expressocashwebserviceList => {
      console.log("---------------faireretraitaveccode---------------------")
      if(!expressocashwebserviceList.match("cURL Error #:")){
        this.infoRetraitaveccode = JSON.parse(expressocashwebserviceList);
        console.log(this.infoRetraitaveccode)
        if(this.infoRetraitaveccode.status==0){
          this.showmodalretraitcodeConfirm();
        }
        else{
          this.echecretraitcode = true;
          this.retraitcodereussi = false;
        }
      }
      else{
        this.echecretraitcode = true;
        this.retraitcodereussi = false;
      }
      this.hidemodalretraitcode();
    });
  }
  public faireretraitaveccodeConfirm(){
    console.log("-----******************************************-----")
    console.log(this.pin);
    console.log(this.cni);
    this._expressocashService.pinCashout(this.pin, this.cni).then(expressocashwebserviceList => {
      console.log("---------------faireretraitaveccodeConfirm---------------------")
      console.log(expressocashwebserviceList);
      this.infoRetraitaveccodeconfirm=JSON.parse(expressocashwebserviceList);
      if(this.infoRetraitaveccodeconfirm.status==0){
        this.retraitcodereussi = true;
        this.echecretraitcode = false;
      }
      else{
        this.echecretraitcode = true;
        this.retraitcodereussi = false;
      }

      this.hidemodalretraitcodeConfirm();
    });
  }

  /****************reinitialise***********************/
  reinitialise(){
    this.mnt=undefined;
    this.numclient=undefined;
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
  }
  reinitialiseRcode(){
    this.date=undefined;
    this.prenom=undefined;
    this.nom=undefined;
    this.cni=undefined;
    this.numclient=undefined;
    this.coderetrait=undefined;
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
