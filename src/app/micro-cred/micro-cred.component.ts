import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'app-micro-cred',
  templateUrl: './micro-cred.component.html',
  styleUrls: ['./micro-cred.component.css']
})
export class MicroCredComponent implements OnInit {
  loading:boolean = false;
  etap:number = 0;
  client:any;
  @ViewChild('modalsenelec') public modalsenelec:ModalDirective;
  @ViewChild('modalTransfer') public modalTransfer:ModalDirective;
  public showAddChildModal():void {
    this.modalsenelec.show();
  }
  public showAddChildModal1():void {
    this.modalTransfer.show();
  }
  public HideAddChildModal():void {
    this.modalsenelec.hide();
  }
  public HideAddChildModal1():void {
    this.modalTransfer.hide();
  }
  getClient:any;
  recherche(){
    this.loading = true;
    setTimeout(()=>{
      for(let i of this.Client){
        if(i.numero == this.client){
          this.getClient = i;
        }
      }
      this.compte1 = this.getClient.typeCompte1.type+" "+this.getClient.typeCompte1.numero
      this.compte2 = this.getClient.typeCompte2.type+" "+this.getClient.typeCompte2.numero
      console.log(this.compte1 +" "+this.compte2);
      this.etap = 1;
      this.loading = false;
    },5000);

  }
  montant:any;
  motif:any;
  smsSup
  depot(){
    let requette = "1/"+this.client+"/"+this.operation+"/"+this.montant+"/"+this.motif+"/"+this.smsSup;
    console.log(requette);
  }
  retrait(){
    let requette = "2/"+this.client+"/"+this.operation+"/"+this.montant+"/"+this.motif+"/"+this.fraisRetrait;
    console.log(requette);
    
  }
  fraisRetrait:boolean = false;
  getFrais(){
    var element = <HTMLInputElement> document.getElementById("idFrais");
    var isChecked = element.checked;    

    this.fraisRetrait = isChecked
    console.log(this.fraisRetrait);
  }
  fraistransfert:boolean = false;
  getFraisTransfert(){
    var element = <HTMLInputElement> document.getElementById("idFraisTrans");
    var isChecked = element.checked;    

    this.fraistransfert = isChecked
    console.log(this.fraistransfert);
  }
  transfert(){
    let requette = "3"+this.client+"/"+this.operation+"/"+this.montant+"/"+this.motif+"/"+this.fraistransfert+"/"+this.clientTransfer+"/"+this.opTranfert;
    console.log(requette);
    
  }
  compte1:any;
  compte2:any;
  Client =[
    {numero:123456,nom:'fall',prenom:'Mouhamed',tel:779854080,typeCompte1:{type:'Boabab',numero:7023193977818},typeCompte2:{type:'Sukaliku',numero:7007183977818}},
    {numero:223456,nom:'Pouye',prenom:'Fatou',tel:772220594,typeCompte1:{type:'Boabab',numero:7023193977818},typeCompte2:{type:'Sukaliku',numero:7007183977818}},
    {numero:423456,nom:'Diallo',prenom:'Abdou',tel:705332647,typeCompte1:{type:'Boabab',numero:7023193977818},typeCompte2:{type:'Sukaliku',numero:7007183977818}},
    {numero:523456,nom:'Diouf',prenom:'Awa',tel:768611478,typeCompte1:{type:'Boabab',numero:7023193977818},typeCompte2:{type:'Sukaliku',numero:7007183977818}},
    {numero:623456,nom:'Barry',prenom:'Ablaye',tel:779857744,typeCompte1:{type:'Boabab',numero:7023193977818},typeCompte2:{type:'Sukaliku',numero:7007183977818}},
    {numero:723456,nom:'Dieye',prenom:'Pape',tel:773354080,typeCompte1:{type:'Boabab',numero:7023193977818},typeCompte2:{type:'Sukaliku',numero:7007183977818}},
  ]
  operation:any;
  opTranfert:any;
  tanneuCompteTrans(compteT){
    this.opTranfert = compteT;
    console.log(this.opTranfert);
    
  }
  tanneuCompte(compte:any){
    //this.operation = compte.split(" ")[0];
    this.operation = compte;
    this.etap = 2;
    this.HideAddChildModal()
  }
  opChoice:any;
  libChoice:any;
  tanneuDepot(){
    this.opChoice = 1;
    this.libChoice =  'déposer';
  }
  getClientTrans:any;
  suitTranfer:number = 0
  clientTransfer:any;
  compteT1:any;
  compteT2:any;
  rechercheForTransfer(){
      console.log(this.clientTransfer+" "+this.client);
      
      this.loading = true;
      setTimeout(()=>{
        for(let i of this.Client){
          if(i.numero == this.clientTransfer && this.clientTransfer != this.client){
            this.getClientTrans = i;
          }
        }
        
        this.compteT1 = this.getClientTrans.typeCompte1.type+" "+this.getClient.typeCompte1.numero
        this.compteT2 = this.getClientTrans.typeCompte2.type+" "+this.getClient.typeCompte2.numero
        console.log(this.compteT1+" "+this.compteT2);
        this.suitTranfer = 1
        //this.etap = 1;
        this.loading = false;
      },5000);
  }
  retour(){
    this.etap = this.etap -1;
  }
  reinitialise(){
    this.etap = 0;
  }
  tanneuTransfert(){
    this.opChoice = 3;
    //this.etap = 2;
    this.libChoice =  'Transfert';
  }
  tanneuRetrait(){
    this.opChoice = 2;
    this.libChoice =  'Retrait';
  }
 /* @Input() bbssenelec:number=0;
  @Output() changementSenelec=new EventEmitter();
  increment(){
    this.bbssenelec++;
    this.changementSenelec.emit(this.bbssenelec);
  }*/
  tanneuComptetrans(compte:any){
    this.operation = compte.split(" ")[0];
    //this.etap = 2;
    this.suitTranfer = 2;
    this.HideAddChildModal1()
  }
  constructor() { }

  ngOnInit() {
   
    
  }

}
