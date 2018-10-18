import { Component, OnInit } from '@angular/core';
import { ZuuluService } from '../services/zuulu.service';

@Component({
  selector: 'app-zuulu',
  templateUrl: './zuulu.component.html',
  styleUrls: ['./zuulu.component.css']
})
export class ZuuluComponent implements OnInit {

  DepotAgent = {telephone:'',nom:'',description:'',montant:''};
  depotAgent(){
	   let requete = "1/"+parseInt(this.DepotAgent.montant)+"/"+this.DepotAgent.telephone+"/"+this.DepotAgent.nom+"/"+this.DepotAgent.description;
	   this._zuuluService.depotAgent(requete).then(res =>{
		   console.log(res);
	   });
  }
  methodWallet(){
    this.DepotClient.paiementMethod = 'Wallet';
    this.paymentMethod = 1;
  }
  methodCard(){
    this.DepotClient.paiementMethod = 'Card';
    this.paymentMethod = 1;
  }
  DepotClient = {telephone:'',nom:'',description:'',montant:'',paiementMethod:''}
  depotClient(){
    let requete = "2/"+parseInt(this.DepotClient.montant)+"/"+this.DepotClient.telephone+"/"+this.DepotClient.nom+"/"+this.DepotClient.description+"/"+this.DepotClient.paiementMethod;
    this._zuuluService.depotClient(requete).then();
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
    let requete = "3"+this.transfereWhiteCode.telReceiver+"/"+this.transfereWhiteCode.prenomSender+"/"+this.transfereWhiteCode.nomSender+
    "/"+this.transfereWhiteCode.telReceiver+"/"+this.transfereWhiteCode.prenomReceiver+"/"+this.transfereWhiteCode.nomReceiver+
    "/"+this.transfereWhiteCode.adressReceiver+"/"+this.transfereWhiteCode.villeReceiver+"/"+this.transfereWhiteCode.contryReceiver+
    "/"+this.transfereWhiteCode.numPieceSender+"/"+this.transfereWhiteCode.typePieceSender+"/"+this.transfereWhiteCode.purposeTransfere+"/"+this.transfereWhiteCode.amount;
    this._zuuluService.transfereByCode(requete).then();
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
    let requete = "4/"+this.RembourserTransfert.numPieceSender+"/"+this.RembourserTransfert.typePieceSender+"/"+this.RembourserTransfert.motifRemboursement+
        "/"+this.RembourserTransfert.codeTransfere+"/"+this.RembourserTransfert.phoneSender+"/"+this.RembourserTransfert.prenomSender+"/"+this.RembourserTransfert.nomSender+"/"+parseInt(this.RembourserTransfert.amount)+"/"+this.RembourserTransfert.IdVerified;
    this._zuuluService.remboursementTransfere(requete);
    console.log(this.RembourserTransfert);
  }
  RetraitAgent = {tel:'',nom:'',montant:'',description:''}
  getRetraitAgent(){
    let requete = "5/"+this.RetraitAgent.tel+"/"+this.RetraitAgent.nom+"/"+parseInt(this.RetraitAgent.montant)+"/"+this.RetraitAgent.description;
    this._zuuluService.retraitAgent(requete);
    console.log(this.RetraitAgent);
    
  }
RetraitClient = {tel:'',nom:'',montant:'',description:''}
getRetraitClient(){
  let requete = "6/"+this.RetraitClient.tel+"/"+this.RetraitClient.nom+"/"+parseInt(this.RetraitClient.montant)+"/"+this.RetraitClient.description;
  this._zuuluService.retraitClient(requete);
console.log(this.RetraitClient);
}

RetraitMarchand = {tel:'',nom:'',montant:'',description:''}
getRetraitMarchand(){
  let requete = "7/"+this.RetraitMarchand.tel+"/"+this.RetraitMarchand.nom+"/"+parseInt(this.RetraitMarchand.montant)+"/"+this.RetraitMarchand.description;
  this._zuuluService.retraitMarchand(requete);
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
RetraitCode = {codeTransfere:'',typePieceReceiver:'',numPieceReceiver:'', telReceiver:'',prenomReceiver:'',nomReceiver:'',montant:'',IdReceiver:''}
getRetraitCode(){
  let requete ="8/"+this.RetraitCode.codeTransfere+"/"+this.RetraitCode.typePieceReceiver+"/"+this.RetraitCode.numPieceReceiver+"/"+this.RetraitCode.telReceiver+"/"+this.RetraitCode.prenomReceiver+"/"+this.RetraitCode.nomReceiver+"/"+this.RetraitCode.montant+"/"+this.RetraitCode.IdReceiver;
console.log(this.RetraitCode);
}
paymentMethod:number=0;

 constructor(public _zuuluService:ZuuluService) { }

  ngOnInit() {
  }

}
