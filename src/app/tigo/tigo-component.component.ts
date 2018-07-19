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
       this.b1=true;
       this.type='1';
       this.showAddChildModal();
       this.labelModal="Depot TigoCash";
    }
   public retirermodal(){
        this.b2=true;
        this.type='2';
        this.showAddChildModal();
        this.labelModal="Retrait TigoCash";
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
  }
  depot(){
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'Tigo cash depot','operateur':3,'operation':1,'num':this.numclient,'montant':this.mnt}));
    this.increment();
    this.fermermodal();
    this.reinitialiser();

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
}
 /* ajout(){
    ths.showAddChildModal();
  }*/
  /******************verif numero***********************/
   

  
  /*****************************************************/
  /*************verif montant**************************/
  
  /****************reinitialise***********************/
 
  /*************************************************/
  /*****************verif cni***********************/
 
  /*********************************************************/
/*******************************************************/
  

/*********************************************************/


/***********************************************************/

 
/*********************************************************/

 

/*********************************************************/

 
  @ViewChild('addChildModal') public addChildModal:ModalDirective;
  @ViewChild('modalretraitinter') public modalretraitinter:ModalDirective;
  @ViewChild('modalventecredit') public modalventecredit:ModalDirective;
  @ViewChild('modaldepot') public modal:ModalDirective;
  @ViewChild('modalretrait') public modalretrait:ModalDirective;
  @ViewChild('modalretraitcode') public modalretraitcode:ModalDirective;

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

