  import { PatternValidator } from '@angular/forms';
  import {Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
  import { ModalDirective,ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
  import {OrangemoneyService} from "../services/orangemoney.service";


@Component({
  selector: 'app-tigo-component',
  templateUrl: './tigo-component.component.html',
  styleUrls: ['./tigo-component.component.css'],
})
export class TigoComponent implements OnInit {

  numclient :  string ;
  mnt : string ;
  labelModal:string="";
  type:string;
  b1:boolean=false;
  b2:boolean=false;
  b3:boolean=false;
  numclientbool:boolean=false;
  mntbool:boolean=false;
  typepiece: any;
  prenom: string;
  nom: string;
  coderetrait:any;
  numeropiece: any;
  @Input() bbs:number=0;
  @Output() changementTc=new EventEmitter();
  increment() {
    this.bbs++;
    console.log("si incremente bi"+this.bbs);
    this.changementTc.emit(this.bbs);
  }

  decrement() {
    this.bbs--;
    this.changementTc.emit(this.bbs);
  }


  constructor(private _omService:OrangemoneyService) {
  }
  
   public ajout(){
     let num=[];
     if(this.numclient!="" && this.numclient!=undefined){
       num=this.numclient.split("");
     }
     if(this.numclient!="" && this.numclient!=undefined && num[0]=="7" && num[1]=="6" && this.verif_phone_number(this.numclient)==true && this.mnt!="" && this.mnt!=undefined && this.verif_montant(this.mnt)==true){
       this.b1=true;
       this.type='1';
       this.showAddChildModal();
       this.labelModal="Depot TigoCash";
     }else{
       if(this.numclient=="" || this.numclient==undefined || this.verif_phone_number(this.numclient)==false || num[0]!="7" || num[1]!="6"){
          this.numclientbool=true;
       }
       if(this.mnt=="" || this.mnt==undefined || this.verif_montant(this.mnt)==false){
          this.mntbool=true;
       }
     }
    }
   public retirermodal(){
       let num=[];
        if(this.numclient!="" && this.numclient!=undefined){
             num=this.numclient.split("");
          }
        if(this.numclient!="" && this.numclient!=undefined && num[0]=="7" && num[1]=="6" && this.verif_phone_number(this.numclient)==true && this.mnt!="" && this.mnt!=undefined && this.verif_montant(this.mnt)==true){
          this.b2=true;
          this.type='2';
          this.showAddChildModal();
          this.labelModal="Retrait TigoCash";
        }else{
          if(this.numclient=="" || this.numclient==undefined || this.verif_phone_number(this.numclient)==false && num[0]!="7" && num[1]!="6"){
             this.numclientbool=true;
          }
          if(this.mnt=="" || this.mnt==undefined || this.verif_montant(this.mnt)==false){
             this.mntbool=true;
          }
        }
    }
    fermermodal(){
      this.hideAddChildModal();
    }


  ngOnInit() { }
  deposer(){
    
    console.log('deposer');
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Tigo cash depot','operateur':3,'operation':1,'num':this.numclient,'montant':this.mnt}));
    this.increment();
    this.fermermodal();
    this.reinitialiser();
  }
  depot(){
   /* sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Tigo cash depot','operateur':3,'operation':1,'num':this.numclient,'montant':this.mnt}));
    this.increment();
    this.fermermodal();
    this.reinitialiser();*/

 }
 retrait(){
    this.b2=true;
    console.log({'nom':'Tigo cash retrait','operateur':3,'operation':2,'num':this.numclient,'montant':this.mnt});
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Tigo cash retrait','operateur':3,'operation':2,'num':this.numclient,'montant':this.mnt}));
    this.reinitialiser();
    this.fermermodal();
    this.increment();
}
tigo(type:string){
    switch(parseInt(type)){
      case 1:{
        this.deposer();
        break;
      }
      case 2:{
        this.retrait();
        break;
      }
      case 3:{

        break;
      }
      default:console.log('bakhoule');
    }

}
reinitialiser(){
    this.mnt=undefined;
    this.numclient=undefined;
    this.labelModal=undefined;
    this.type=undefined;
    this.b1=false;
    this.b2=false;
    this.b3=false;
    this.mntbool=false;
    this.numclientbool=false;
}
reinitialisebool(){
  this.mntbool=false;
  this.numclientbool=false;
}
 /* ajout(){
    ths.showAddChildModal();
  }*/
  /******************Structure De Control***********************/
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
  payerTransfer(){
    this.hidemodalpaiment();
    console.log({'nom':'Tigo cash payer un transfer','operateur':3,'operation':6,'coderetrait':this.coderetrait,'nomCient':this.nom,'prenomClient':this.prenom,'typepiece':this.typepiece,'numeropiece':this.numeropiece,'montant':this.mnt,'num':this.numclient});
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Tigo cash payer un transfer','operateur':3,'operation':6,'coderetrait':this.coderetrait,'nomCient':this.nom,'prenomClient':this.prenom,'typepiece':this.typepiece,'numeropiece':this.numeropiece,'montant':this.mnt,'num':this.numclient}));
    this.reinitialiser();
    this.increment();
 }

/*********************************************************/
 
  @ViewChild('addChildModal') public addChildModal:ModalDirective;
  @ViewChild('modalretraitinter') public modalretraitinter:ModalDirective;
  @ViewChild('modalventecredit') public modalventecredit:ModalDirective;
  @ViewChild('modaldepot') public modal:ModalDirective;
  @ViewChild('modalretrait') public modalretrait:ModalDirective;
  @ViewChild('modalretraitcode') public modalretraitcode:ModalDirective;
  @ViewChild('modalpaiment') modalpaiment: ModalDirective;

  showmodalpaiment(){
   // this.adejaclick = false;
    this.modalpaiment.show();
  }
  hidemodalpaiment(){
   this.modalpaiment.hide()
  }

  public showAddChildModal():void {
    this.addChildModal.show();
  }

  public hideAddChildModal():void {
    this.addChildModal.hide();
  }
  
  public showmodalretrait():void{
    this.modalretrait.show();
  }
  public hidemodalretrait():void{
    this.modalretrait.hide();
  }
  public showmodalretraitcode(){
    this.modalretraitcode.show();
  }
  public hidemodalretraitcode(){
    this.modalretraitcode.hide();
  }
  public hidemodalretraitinter(){
    this.modalretraitinter.hide();
  }
  public showmodalretraitinter(){
    this.modalretraitinter.show();
  }
  public showmodalventecredit(){
    this.modalventecredit.show();
  }
  public hidemodalventecredit(){
    this.modalventecredit.hide();
  }

}

