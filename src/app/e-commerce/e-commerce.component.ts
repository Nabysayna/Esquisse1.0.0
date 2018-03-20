import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

import {EcomService} from "../services/ecom.service";


@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.css']
})
export class ECommerceComponent implements OnInit {
  codecmd = "" ;
  token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  loading = false ;
  infosCommande : any ;
  inforecvd = false ;
  postcmd = false ;
  prenom : string ;
  nom : string ;
  orderedArticles : string ;
  qte : number ;
  montant : number ;

  constructor(private _ecomService:EcomService) { }

  ngOnInit() {}

  initialize(){
    this.codecmd = "" ;
    this.loading = false ;
    this.inforecvd = false ;
    this.postcmd = false ;
  }

  recupInfosCmd(){
  	console.log("Récupèration des informations relatives à la présente commande...") ;
    this.loading = true ;
    let requiredInfo = "infocmd#"+this.codecmd ;
    let paramObj={token : this.token, article : requiredInfo} ;
    this._ecomService.prendreCommande(paramObj).then( response =>
      {

       this.infosCommande = JSON.parse(response)[0] ;
        this.prenom = this.infosCommande.prenomclient ;
        this.nom  = this.infosCommande.nomclient ;
        this.orderedArticles = this.infosCommande.orderedArticles ;
        this.montant = this.infosCommande.montant ;

        this.loading = false ;
        this.inforecvd = true ;
      });
  }

  prendreCommande(){
    console.log("Récupèration des informations relatives à la présente commande...") ;
    this.loading = true ;
    let requiredInfo = "takecmd#"+this.codecmd ;
    let paramObj={token : this.token, article : requiredInfo} ;
    this._ecomService.prendreCommande(paramObj).then( response =>
      {
        console.log("Reponse serveur :::: "+response) ;
        this.codecmd = "";
        this.loading = false ;
        this.postcmd = true ;
      });
  }

  @ViewChild('childModal') public childModal:ModalDirective;

  public showChildModal():void {
    this.childModal.show();
  }

  public hideChildModal():void {
    this.childModal.hide();
  }


}
