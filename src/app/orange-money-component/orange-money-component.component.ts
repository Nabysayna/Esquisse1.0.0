  import { PatternValidator } from '@angular/forms';
  import {Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
  import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
  import {OrangemoneyService} from "../services/orangemoney.service";


@Component({
  selector: 'app-orange-money-component',
  templateUrl: './orange-money-component.component.html',
  styleUrls: ['./orange-money-component.component.css'],
})
export class OrangeMoneyComponentComponent implements OnInit {

  adejaclick:boolean = false;

  numclient :  string ;
  mnt : string ;
  services = ['Sonatel', 'Orange Teranga', 'Energie Renouvelable', 'Senelec et Woyofal', 'Canal+', 'SDE', 'Education', 'Transport Rapido', 'Paiements Internet', 'Assurances'] ;
  choosenService = 'Choisir un service' ;
  keycode=[{'code':97,'value':1},{'code':98,'value':2},{'code':99,'value':3},{'code':100,'value':4},{'code':101,'value':5},{'code':102,'value':6},{'code':103,'value':7},{'code':104,'value':8},{'code':105,'value':9},{'code':96,'value':0},{'code':48,'value':0},{'code':49,'value':1},{'code':50,'value':2},{'code':51,'value':3},{'code':52,'value':4},{'code':53,'value':5},{'code':54,'value':6},{'code':55,'value':7},{'code':56,'value':8},{'code':57,'value':9}];
  nombre=["0","1","2","3","4","5","6","7","8","9"];
  loading = false ;
  buttondepot1=false;
  buttondepot2=false;
  buttondepot3=false;
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
  bcode:boolean=false;
  bprenom:boolean=false;
  bnom:boolean=false;
  bdate:boolean=false;
  bpiece:boolean=false;
  bnumclient:boolean=false;
  bmnt:boolean=false;
  verifretraitcode=[false,false,false,false];
  @Input() bbs:number=0;
  @Output() changementOm=new EventEmitter();
  increment() {
    this.bbs++;
    console.log("si incremente bi"+this.bbs);
    this.changementOm.emit(this.bbs);
  }

  decrement() {
    this.bbs--;
    this.changementOm.emit(this.bbs);
  }


  constructor(private _omService:OrangemoneyService) {
  }
  @ViewChild('modaldepot') public modal:ModalDirective;
  @ViewChild('modalretrait') public modalretrait:ModalDirective;
  @ViewChild('modalretraitcode') public modalretraitcode:ModalDirective;
   public ajout(){
    let tab1="mmodou".split(" ");
    let prenom="";
    for(let i=0;i<tab1.length;i++){
      prenom+=tab1[i].trim();
    }
    console.log(prenom);
     if(this.verif_phone_number(this.numclient)==true &&  this.numclient!="" && this.verif_montant(this.mnt)==true && this.mnt!=""){
       this.showAddChildModal();
      }else{
        if(this.verif_phone_number(this.numclient)!=true || this.numclient==""){
             this.mag1=true;
         }
         if(this.verif_montant(this.mnt)!=true || this.mnt==""){
             this.mag2=true;
         }
      }
    }
   public retirermodal(){
       
       if(this.verif_phone_number(this.numclient)==true &&  this.numclient!="" && this.verif_montant(this.mnt)==true && this.mnt!=""){
         this.modalretrait.show();
       }else{
         if(this.verif_phone_number(this.numclient)!=true || this.numclient==""){
              this.mag1=true;
          }
          if(this.verif_montant(this.mnt)!=true || this.mnt==""){
              this.mag2=true;
          }
       }
    }
    fermermodal(){
      this.hideAddChildModal();
    }


  ngOnInit() { }
  /******************verif numero***********************/
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
    if(parseInt(mnt)>=1){
      return true;
    }else{
      return false;
    }
  }
  
  /*****************************************************/
  /*************verif montant**************************/
   
  /****************************************************/
 /* verifMontanretraitcode(event:any){
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
			this.mnt=undefined;
			return ;
		}
		 //console.log(val);
		 var i=0,v=0;
		 for(i=0;i<this.keycode.length;i++){
			if(event.keyCode==this.keycode[i].code){
				v=1;
			}
		 }
		 if(v==0 && event.keyCode!=8 && event.keyCode!=16 && event.target.value!=""){
			this.mnt=undefined;
			return  ;
		 }

		 if(parseInt(val[0])>=1){
           this.verifretraitcode[1]=true;
           this.controlretraitcode();
           }
         else{
            this.verifretraitcode[1]=false;
            this.buttondepot3=false;
         }
     }
  }*/
  /****************reinitialise***********************/
  reinitialise(){
       this.mnt=undefined;
       this.numclient=undefined;
       this.buttondepot1=false;
       this.buttondepot2=false;
       this.mag1=false;
       this.mag2=false;
  }
  Reinitialise(){
    this.mag1=false;
    this.mag2=false;
  }
  reinitialiseRcode(){
       this.date=undefined;
       this.prenom=undefined;
       this.nom=undefined;
       this.cni=undefined;
       this.numclient=undefined;
       this.coderetrait=undefined;
       this.buttondepot1=false;
       this.buttondepot2=false;
       this.buttondepot3=false;
  }
  reinitialiserformRcode(){
       this.mnt=undefined;
       this.date=undefined;
       this.prenom=undefined;
       this.nom=undefined;
       this.cni=undefined;
       this.coderetrait=undefined;
  }
  /**************************************************/

  /************verif code***************************/
  verifcode(event:any){
    if(event.keyCode!=16 && event.keyCode!=20 && event.keyCode!=9 && event.keyCode!=37 && event.keyCode!=38 && event.keyCode!=39 && event.keyCode!=40){
    //console.log(event);
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
    // console.log(val);

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
        this.buttondepot3=false;
     }
    }

  }
  /*************************************************/
  /*****************verif cni***********************/
  verifcni(event:any){
    if(event.keyCode!=16 && event.keyCode!=20 && event.keyCode!=9 && event.keyCode!=37 && event.keyCode!=38 && event.keyCode!=39 && event.keyCode!=40){
    var nb=event.target.value.length;
    if(nb==1){
       if(event.target.value!=1 && event.target.value!=2){
           this.cni=undefined;
       }
      }
    //console.log(event);

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
    // console.log(val);

     var i=0,v=0;
     for(i=0;i<this.keycode.length;i++){
        if(event.keyCode==this.keycode[i].code){
            v=1;
        }
     }
     if(v==0 && event.keyCode!=8 && event.keyCode!=16 && event.target.value!=""){

        this.cni=undefined;
     }
     if(nb==13){
        this.verifretraitcode[3]=true;
        this.controlretraitcode();
     }
     else{
        this.verifretraitcode[3]=false;
        this.buttondepot3=false;
     }
    }
  }
  /************************************************/
  controlretraitcode(){
    var i=0,jeton=1;
        for(i=0;i<this.verifretraitcode.length;i++){
            if(this.verifretraitcode[i]==false){
               jeton=0;
               break;
            }
        }
       if(jeton==1 && this.prenom!="" && this.nom!=""){
          this.buttondepot3=true;
       }
       else{
          this.buttondepot3=false;
       }
     //  console.log(this.prenom);
       //console.log(this.nom);
  }
  /******************verif date*******************/
   verifdate(event:any){
     if(event.keyCode!=16 && event.keyCode!=20 && event.keyCode!=9 && event.keyCode!=37 && event.keyCode!=38 && event.keyCode!=39 && event.keyCode!=40){
    var nb=event.target.value.length;
    //console.log(event);

     var val=event.target.value.split('');
     var j=0,k=0;
     for(j=0;j<this.nombre.length;j++){
       if(val[event.target.value.length-1]==this.nombre[j]){
         k=1;
       }
     }
    if(k==0 && event.target.value!=""){
        this.date=undefined;
    }
    // console.log(val);

     var i=0,v=0;
     for(i=0;i<this.keycode.length;i++){
        if(event.keyCode==this.keycode[i].code){
            v=1;
        }
     }
     if(v==0 && event.keyCode!=8 && event.keyCode!=16 && event.target.value!=""){

        this.date=undefined;
     }
     if(nb==8){
        this.verifretraitcode[2]=true;
        this.controlretraitcode();
     }
     else{
        this.verifretraitcode[2]=false;
        this.buttondepot3=false;
     }
    }

   }
  /****************fin verif dat******************************/
  /******verif preno nom*************************************/
   veriprenomnom(){
     if(this.prenom!="" && this.nom!=""){
       this.controlretraitcode();

     }
     else{
       this.buttondepot3=false;
     }
   }
  /*********************************************************/
/*******************************************************/
  transferer(zonetransfert){
  	if (zonetransfert=='national'){
      let requete = "3/"+parseInt(this.numclient)+"/"+this.mnt ;
      this.loading = true ;
      this._omService.requerirControllerOM(requete).then( resp => {
        if (resp.status==200){
          if (resp._body=='1'){
            this.loading = false ;
            this.transintreussi=true;
            this.numclient = undefined ;
            this.mnt = undefined;
            setTimeout(()=>{this.transintreussi=false;},5000);
          }
        }
        else{
          console.log("error") ;
          this.echectransint=true;
          setTimeout(()=>{this.echectransint=false;},5000);
          }
      }) ;
    }
    if (zonetransfert=='international'){
      let requete = "4/"+this.numclient+"/"+this.mnt ;
      this.loading = true ;
      this._omService.requerirControllerOM(requete).then( resp => {
        if (resp.status==200){
          if (resp._body.trim().toString()=='1'){
            this.loading = false ;
            this.transintreussi=true;
            this.numclient = undefined ;
            this.mnt = undefined;
            setTimeout(()=>{this.transintreussi=false;},5000);

          }
        }
        else{
          console.log("error") ;
          this.echectransint=true;
          setTimeout(()=>{this.echectransint=false;},5000);
          }
      }) ;
    }

  }

/********************************************************/
  depot(){

  }
  deposer(){

          sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Orange money depot','operateur':2,'operation':1,'montant':this.mnt,'num':this.numclient}));
           this.increment();
          // console.log("changement cote om "+this.bbs);
         // this.loading = false ;
         // this.depotreussi=true;
          this.numclient = undefined ;
          this.mnt = undefined;


           this.addChildModal.hide();

  /*  let requete = "1/"+this.mnt+"/"+this.numclient ;
    this.loading = true ;
    //console.log("We just say : "+requete) ;
    this.omService.requerirControllerOM(requete).then( resp => {
      if (resp.status==200){
        console.log("We just say : "+resp._body) ;
        if (resp._body.trim().toString()=='1'){
          this.loading = false ;
          this.addChildModal.hide();
          this.depotreussi=true;
          this.numclient = undefined ;
          this.mnt = undefined;
          setTimeout(()=>{this.depotreussi=false;},5000);
        }
        else{
          this.echecdepot=true;
          setTimeout(()=>{this.echecdepot=false;},5000);
        }
      }
      else
        console.log("error") ;
    });*/
  }

/*********************************************************/

  retirer(){

    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Orange money retrait','operateur':2,'operation':2,'montant':this.mnt,'numclient':this.numclient}));

    this.increment();
    this.modalretrait.hide();
    this.numclient = undefined ;
    this.mnt = undefined;
    /*let requete = "2/"+this.numclient+"/"+this.mnt ;
    this.loading = true ;
    this.omService.requerirControllerOM(requete).then( resp => {
      if (resp.status==200){
        if (resp._body.trim().toString()=='1'){
          this.loading = false ;
          this.modalretrait.hide();
          this.numclient = undefined ;
          this.mnt = undefined;
          this.retraitreussi=true;
          setTimeout(()=>{this.retraitreussi=false;},5000);
        }
      }
      else{
        console.log("error") ;
        this.modalretrait.hide();
        this.echecretrait=false;
        }
    }) ;*/
  }


/***********************************************************/

  retraitAvecCode(){
    let tab1=this.prenom.split(" ");
    let prenom="";
    let tab2=this.nom.split(" ");
    let nom="";
    for(let i=0;i<tab1.length;i++){
      prenom+=tab1[i].trim();
    }
    for(let j=0;j<tab2.length;j++){
      nom+=tab2[j].trim();
    }
    
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Orange money retrait','operateur':2,'operation':3,'coderetrait':this.coderetrait,'prenom':prenom,'nomclient':nom,'num':this.numclient,'date':this.date,'cni':this.cni,'montant':this.mnt}));
//    let requete = "3/"+this.coderetrait+"/"+this.prenom+"/"+this.nom+"/"+this.date+"/"+this.cni+"/"+this.numclient;
    this.increment();
    this.hidemodalretraitcode() ;

    this.numclient = undefined ;
    this.mnt = undefined;
    this.coderetrait=undefined;
    this.nom=undefined;
    this.prenom=undefined;
    this.date=undefined;
    this.cni=undefined;
    this.mnt=undefined;

   /* console.log(requete);
    this.omService.requerirControllerOM(requete).then( resp => {
      if (resp.status==200){
        console.log(resp._body);
        if (resp._body.trim().toString()=='1'){
          this.loading = false ;
          this.retraitcodereussi=true;
          this.numclient = undefined ;
          this.mnt = undefined;
          this.coderetrait=undefined;
          this.nom=undefined;
          this.prenom=undefined;
          this.cni=undefined;
          setTimeout(()=>{this.retraitcodereussi=false;},5000);
        }
      }
      else
        console.log("error") ;
    });*/
  }


/***********************************************************/

  retraitCpteRecep(){

    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Orange money retrait','operateur':2,'operation':4,'numclient':this.numclient,'montant':this.mnt}));

     this.loading = false ;
     this.numclient = undefined ;
     this.mnt = undefined;
    /*let requete = "4/"+this.numclient+"/"+this.mnt ;
    this.loading = true ;
    this.omService.requerirControllerOM(requete).then( resp => {
      if (resp.status==200){
        if (resp._body.trim().toString()=='1'){
          this.loading = false ;
          this.numclient = undefined ;
          this.mnt = undefined;
        }
      }
      else
        console.log("error") ;
    });*/
  }


/*********************************************************/

  payerFacture(){
    let requete = "5/"+this.numclient+"/"+this.mnt ;
    this.loading = true ;
    this._omService.requerirControllerOM(requete).then( resp => {
      if (resp.status==200){
        if (resp._body=='1'){
          this.loading = false ;
          this.numclient = undefined ;
          this.mnt = undefined;
        }
      }
      else
        console.log("error") ;
    }) ;
  }

/*********************************************************/

  acheterCredit(){
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'OrangeMoney Vente Crédit','operateur':2,'operation':5,'numclient':this.numclient,'montant':this.mnt}));
    this.hidemodalventecredit() ;
    this.increment();
    this.loading = false ;
    this.numclient = undefined ;
    this.mnt = undefined;
//    this.modalretraitinter.hide();

  }


  @ViewChild('addChildModal') public addChildModal:ModalDirective;
  @ViewChild('modalretraitinter') public modalretraitinter:ModalDirective;
  @ViewChild('modalventecredit') public modalventecredit:ModalDirective;


  public showAddChildModal():void {
    this.adejaclick = false;
    this.addChildModal.show();
  }

  public hideAddChildModal():void {
    this.addChildModal.hide();
  }
  public showmodalretrait():void{
    this.adejaclick = false;
    this.modalretrait.show();
  }
  public hidemodalretrait():void{
    this.modalretrait.hide();
  }
  public showmodalretraitcode(){
    console.log("showmodal retrait code");
    if(this.prenom!="" && this.prenom!=undefined && this.coderetrait!="" && this.coderetrait!=undefined && this.nom!="" && this.nom!=undefined && this.date!="" && this.date!=undefined && this.cni!="" && this.cni!=undefined && this.numclient!="" && this.numclient!=undefined && this.mnt!="" && this.mnt!=undefined && this.verif_montant(this.mnt)==true){
      this.adejaclick= false;
      this.modalretraitcode.show();
      console.log("prenom "+this.prenom+" code ="+this.coderetrait);
    }else{
      if(this.prenom=="" || this.prenom==undefined){
        this.bprenom=true;
      }
      if(this.coderetrait=="" || this.coderetrait==undefined){
        this.bcode=true;
      }
      if(this.nom=="" || this.nom==undefined){
        this.bnom=true;

      }
      if(this.date=="" || this.date==undefined){
        this.bdate=true;

      }
      if(this.cni=="" || this.cni==undefined){
        this.bpiece=true;

      }
      if(this.numclient=="" || this.numclient==undefined){
          this.bnumclient=true;
      }
      if(this.mnt=="" || this.mnt==undefined || this.verif_montant(this.mnt)!=true){
          this.bmnt=true;

      }
    }
  }
  public hidemodalretraitcode(){
      this.modalretraitcode.hide();
  }
  public hidemodalretraitinter(){
    this.modalretraitinter.hide();
  }
  public showmodalretraitinter(){
    this.adejaclick = false;
    this.modalretraitinter.show();
  }
  public showmodalventecredit(){
    
    if(this.verif_phone_number(this.numclient)==true &&  this.numclient!="" && this.verif_montant(this.mnt)==true && this.mnt!=""){
      this.adejaclick = false;
      this.modalventecredit.show();
    }else{
      if(this.verif_phone_number(this.numclient)!=true || this.numclient==""){
           this.mag1=true;
       }
       if(this.verif_montant(this.mnt)!=true || this.mnt==""){
           this.mag2=true;
       }
    }
  }
  public hidemodalventecredit(){
    this.modalventecredit.hide();
  }
  public reinitialisebool(){
    this.bcode=false;
    this.bprenom=false;
    this.bnom=false;
    this.bdate=false;
    this.bpiece=false;
    this.bnumclient=false;
    this.bmnt=false;

  }

}

