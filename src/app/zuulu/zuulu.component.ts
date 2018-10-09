import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zuulu',
  templateUrl: './zuulu.component.html',
  styleUrls: ['./zuulu.component.css']
})
export class ZuuluComponent implements OnInit {

  DepotAgent = {telephone:'',nom:'',description:'',montant:''}
  depotAgent(){
    console.log(this.DepotAgent);
  }
  methodWallet(){
    this.DepotClient.paiementMethod = 'Wallet';
  }
  methodCard(){
    this.DepotClient.paiementMethod = 'Card';
  }
  DepotClient = {telephone:'',nom:'',description:'',montant:'',paiementMethod:''}
  depotClient(){
    console.log(this.DepotClient);
  }
  Ville = [
    {ville:'Dakar'},
    {ville:'Thies'},
    {ville:'St-louis'},
    {ville:'Casamence'},
    {ville:'Kaolak'},
    {ville:'Mbour'}
  ]
  Pays = [
    {pays:'Senegal'},
    {pays:'Mali'},
    {pays:'France'},
    {pays:'Espagne'},
    {pays:'Canada'}
  ]
  TypePiece = [
    {type:'Carte d\'identité nationale'},
    {type:'Passport'},
    {type:'Carte consulaire'},
  ]
  purposeOfTransfere = [
    {purpose:'Assistence familiale'},
    {purpose:'Aide scolaire'},
  ]
  transfereWhiteCode = {
    telSender:'',prenomSender:'',nomSender:'',telReceiver:'',prenomReceiver:'',nomReceiver:'',
    adressReceiver:'',villeReceiver:'',
    contryReceiver:'',numPieceSender:'',
    typePieceSender:'',purposeTransfere:'',amount:''};
  getTransfereWhiteCode(){
    console.log(this.transfereWhiteCode);
  }
  RembourserTransfert = { 
    numPieceSender:'',typePieceSender:'',motifRemboursement:'',codeTransfere:'',phoneSender:'',prenomSender:'',nomSender:'',amount:'',IdVerified:''
  }
  idVerified:number=0;
  IdVerified(){
    this.RembourserTransfert.IdVerified='oui';
    if(this.idVerified == 0){
      this.idVerified=1;
     
    }else{
      this.idVerified=0;
    }
  }
  getRembourserTransfert(){
    console.log(this.RembourserTransfert);
  }
  RetraitAgent = {tel:'',nom:'',numPieceSender:'',typePieceSender:'',motifRemboursement:'',
              codeTransfere:'',telReceiver:'',prenomSender:'',nomSender:'',montant:0,description:''}
  getRetraitAgent(){
    console.log(this.RetraitAgent);
    
  }
RetraitClient = {tel:'',nom:'',numPieceSender:'',typePieceSender:'',motifRemboursement:'',
codeTransfere:'',telReceiver:'',prenomSender:'',nomSender:'',montant:0,description:''}
getRetraitClient(){
console.log(this.RetraitClient);
}

RetraitMarchand = {tel:'',nom:'',numPieceSender:'',typePieceSender:'',motifRemboursement:'',
codeTransfere:'',telReceiver:'',prenomSender:'',nomSender:'',montant:0,description:''}
getRetraitMarchand(){
console.log(this.RetraitMarchand);
}
IdReciver:number=0;
idReciver(){
  if(this.IdReciver == 0){
    this.IdReciver=1;
    this.RetraitCode.IdReceiver ='oui';
  }else{
    this.IdReciver=0;
    this.RetraitCode.IdReceiver ='non';
  }
}
RetraitCode = {numPieceSender:'',typePieceSender:'',motifRemboursement:'',codeTransfere:'',telSender:'',prenomSender:'',nomSender:'',montant:'',IdReceiver:''}
getRetraitCode(){
console.log(this.RetraitCode);
}

 constructor() { }

  ngOnInit() {
  }

}
