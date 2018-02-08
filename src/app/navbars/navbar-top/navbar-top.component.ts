import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthentificationServiceWeb } from '../../webServiceClients/Authentification/authentification.service';
import { UtilServiceWeb } from '../../webServiceClients/utils/Util.service' ;

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {
  authentiService: AuthentificationServiceWeb;
  token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  message : string  ;
  autorisedUser = 0 ;
  solde : number ;

	currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  constructor(private router: Router, private utilService : UtilServiceWeb) {

    this.authentiService = new AuthentificationServiceWeb();
    this.utilService.isDepotCheckAuthorized().then( resp => {
      if(JSON.parse(resp._body).estautorise!=undefined)
        this.autorisedUser = JSON.parse(resp._body).estautorise ;
        this.updateCaution() ;
    }) ;

  }

  ngOnInit() {
    this.retrieveAlerteMessage() ;
  }

  retrieveAlerteMessage(){
    var periodicVerifier = setInterval(()=>{

    this.utilService.consulterLanceurDalerte().then(rep =>{
      var donnee=rep._body.trim().toString();
      if (donnee!='-')
        this.message=donnee ;
    });

    },60000);
  }

  updateCaution(){
    console.log("updateCaution");
    if ( this.autorisedUser == 1)
      this.utilService.checkCaution().then( resp => {
        this.solde = resp._body ;
        console.log("Le solde vaut "+resp) ;
      }) ;
  }

  deconnexion(){
  	this.authentiService.deconnecter(this.token).then( response => {
  	 if (response==1){
  			sessionStorage.removeItem('currentUser');
        sessionStorage.clear();
        this.router.navigate(['']);
  	 } else
  	 	console.log("Echec deconnexion!") ;

  	 }) ;
  }

}
