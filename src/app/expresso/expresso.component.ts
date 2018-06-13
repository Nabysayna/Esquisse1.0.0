import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';


import { ExpressocashService } from "../services/expressocash.service";

@Component({
  selector: 'app-expresso',
  templateUrl: './expresso.component.html',
  styleUrls: ['./expresso.component.css']
})
export class ExpressoComponent implements OnInit {

  adejaclick:boolean = false;

  numclient :  string ;
  mnt : string ;
  transactionReference: string;
  OTP: string;
  pin:string;

  errorMessage :  string ;

  keycode=[{'code':97,'value':1},{'code':98,'value':2},{'code':99,'value':3},{'code':100,'value':4},{'code':101,'value':5},{'code':102,'value':6},{'code':103,'value':7},{'code':104,'value':8},{'code':105,'value':9},{'code':96,'value':0},{'code':48,'value':0},{'code':49,'value':1},{'code':50,'value':2},{'code':51,'value':3},{'code':52,'value':4},{'code':53,'value':5},{'code':54,'value':6},{'code':55,'value':7},{'code':56,'value':8},{'code':57,'value':9}];
  nombre=["0","1","2","3","4","5","6","7","8","9"];
  loading = false ;
  echecdepot=false;
  retraitreussi=false;
  echecretrait=false;
  retraitcodereussi=false;
  echecretraitcode=false;
  mag1=false;
  mag2=false;
  style:any;
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
  errormsisdn:boolean=false;
  errorid:boolean=false;
  errorfirstname:boolean=false;
  errorlastname:boolean=false;
  positiveresponseregistration:boolean=false;
  negativeresponseregistration:boolean=false;
  errornumeroretraitsimple:boolean=false;
  errormontantretraitsimple:boolean=false;

  constructor(private expressocashwebservice : ExpressocashService) {
  }

  @ViewChild('modaldepot') public modaldepot:ModalDirective;
  @ViewChild('modalretrait') public modalretrait:ModalDirective;
  @ViewChild('modalretraitConfirm') public modalretraitConfirm:ModalDirective;
  @ViewChild('modalretraitcode') public modalretraitcode:ModalDirective;
  @ViewChild('modalretraitcodeConfirm') public modalretraitcodeConfirm:ModalDirective;
  @ViewChild('modalinscription') public modalinscription:ModalDirective;


  ngOnInit() { }


/*******************************  DEPOT *****************************************/

  public fairedepot(){

    this.hidemodaldepot();

    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'E-Money depot','operateur':7,'operation':1,'numclient':this.numclient,'mnt':this.mnt}));
  }

/************************************************************************/


  // retrait simple
  infoRetraitsimple:any;

  public faireretraitsimple(){
    this.hidemodalretrait();
    this.expressocashwebservice.cashout(this.numclient, this.mnt).then(expressocashwebserviceList => {
       console.log(expressocashwebserviceList);
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

      sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'E-Money depot','operateur':7,'operation':2,'transactionReference':this.transactionReference,'OTP':this.OTP,montant:this.mnt,tel:this.numclient}));
  }

/************************************************************************/
  // retrait avec code
  infoRetraitaveccode:any;
  public faireretraitaveccode(){
    this.pin = this.coderetrait;
    this.hidemodalretraitcode();
    this.expressocashwebservice.pinCashoutCheck(this.coderetrait).then(expressocashwebserviceList => {
       console.log(expressocashwebserviceList);
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

    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'E-Money retrait avec code','operateur':7,'operation':3,'pin':this.pin,'cni':this.cni,montant:parseInt(this.infoRetraitaveccode.amount),tel:this.infoRetraitaveccode.receiver}));
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
    this.id=undefined;
    this.firstname=undefined;
    this.lastname=undefined;
    this.clientID=undefined;
    this.clientPassword=undefined;
    this.clientID=undefined;
    this.msisdn=undefined;
  }


  /******************verif numero***********************/
   verifNumber(event:any){
    if(event.keyCode!=16 && event.keyCode!=20 && event.keyCode!=9 && event.keyCode!=37 && event.keyCode!=38 && event.keyCode!=39 && event.keyCode!=40){

     let nb=event.target.value.length;
     let val=event.target.value.split('');
     let j=0,k=0;
     for(j=0;j<this.nombre.length;j++){
       if(val[event.target.value.length-1]==this.nombre[j]){
         k=1;
       }
     }
    if(k==0 && event.target.value!=""){
        this.mag1=true;
        this.numclient=undefined;
    }
     let i=0,v=0;
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

      let nb=event.target.value.length;
      let val=event.target.value.split('');
      let j=0,k=0;
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
      let i=0,v=0;
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
      console.log(this.verifData());
      this.expressocashwebservice.customerRegistration(this.msisdn,this.id,this.firstname,this.lastname).then(response =>{
           console.log(response);
           // console.log(reponse);
          if(!response.match("cURL Error #:")){
					// let reponse = JSON.parse(response);
					console.log("pas probleme au niveau du serveur");
					 if(response.status==0){
						this.positiveresponseregistration=true;
						this.reinitialiseRcode();
						this.hidemodalinscription();
					  }
					 else{
					   if(response.status==1006){
						  console.log("numero incorrect");
						  this.negativeresponseregistration=true;
					   }
					}
         }
         else{
             this.echecretraitcode = true;
             this.retraitcodereussi = false;
             console.log("probleme au niveau du serveur");
        }
    });
  }
    isNumber(tel:string):boolean{
      let tab=tel.split("");
      for(let i=0;i<tab.length;i++){
         if(!this.ischiffre(tab[i])){
            return false;
         }
      }

        return true;
    }
    ischiffre(c:string):boolean{
      let tab=["0","1","2","3","4","5","6","7","8","9"];
      for(let j=0;j<tab.length;j++){
         if(tab[j].localeCompare(c)==0){
            return true;
         }
      }
      return false;
    }
    verifData():boolean{
    let tel=[];
    let cni=[];
       if(this.msisdn!="" && this.msisdn!=undefined && this.id!="" && this.id!=undefined ){
		   tel=this.msisdn.split("");
		   cni=this.id.split("");
       }
       let tontou:boolean;
       if(this.firstname!="" && this.firstname!=undefined && this.lastname!="" && this.lastname!=undefined && this.isNumber(this.id) && cni.length==13 && this.isNumber(this.msisdn) && tel.length==9){
          tontou=true;
       }else{
			if(!this.isNumber(this.id) || cni.length!=13){
			   this.errorid=true;
			}
			if(!this.isNumber(this.msisdn) || tel.length!=9){
			   this.errormsisdn=true;
			}
			if(this.firstname=="" || this.firstname==undefined){
			   this.errorfirstname=true;
			}
			if(this.lastname=="" || this.lastname==undefined){
			   this.errorlastname=true;
			}
		   tontou=false;
       }
       return tontou;
    }
    reinitialiserbool(){
      this.errormsisdn=false;
      this.errorid=false;
      this.errorfirstname=false;
      this.errorlastname=false;
      this.positiveresponseregistration=false;
      this.mag1=false;
      this.mag2=false;
      this.errornumeroretraitsimple=false;
      this.errormontantretraitsimple=false;

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
    this.adejaclick = false;
    let tab=this.numclient.split("");

   if(this.isNumber(this.numclient) && tab.length==9 && tab[0]=="7" && (tab[1]=="0") && this.isNumber(this.mnt) && parseInt(this.mnt)>0){
       this.modaldepot.show();
    }
    else{
        if(!this.isNumber(this.numclient) || tab[0]!="7" || tab[1]!="0" || tab.length!=9){
            this.mag1=true;
        }
        if(!this.isNumber(this.mnt) || parseInt(this.mnt)<=0){
            this.mag2=true;
        }

    }
  }
  public hidemodaldepot():void {
    this.modaldepot.hide();
  }

  public showmodalretrait():void{
    this.adejaclick = false;
    let tab=this.numclient.split("");
    if(this.isNumber(this.mnt) && tab.length==9 && tab[0]=="7" && (tab[1]=="0") && this.isNumber(this.mnt) && parseInt(this.mnt)>0){
        this.modalretrait.show();
    }
    else{
        if(!this.isNumber(this.numclient) || tab[0]!="7" || tab[1]!="0" || tab.length!=9){
            this.errornumeroretraitsimple=true;
        }
        if(!this.isNumber(this.mnt) || parseInt(this.mnt)<=0){
            this.errormontantretraitsimple=true;
        }

    }
  }
  public hidemodalretrait():void{
    this.modalretrait.hide();
  }

  public showmodalretraitConfirm():void{
    this.adejaclick = false;
    this.modalretraitConfirm.show();
  }
  public hidemodalretraitConfirm():void{
    this.modalretraitConfirm.hide();
  }

  public showmodalretraitcode(){
    this.adejaclick = false;
    this.modalretraitcode.show();
  }
  public hidemodalretraitcode(){
    this.modalretraitcode.hide();
  }

  public showmodalretraitcodeConfirm(){
    this.adejaclick = false;
    this.modalretraitcodeConfirm.show();
  }
  public hidemodalretraitcodeConfirm(){
    this.modalretraitcodeConfirm.hide();
  }
  public showmodalinscription(){
    this.adejaclick = false;
    if(this.verifData()){
       this.modalinscription.show();
    }
  }
  public hidemodalinscription(){
     this.modalinscription.hide();
  }

}
