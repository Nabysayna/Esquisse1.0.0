import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UtilServiceWeb } from '../../webServiceClients/utils/Util.service' ;
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {
  token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  message : string  ;
  autorisedUser = 0 ;
  solde : number ;

	currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  constructor(private _authService:AuthService, private router: Router, private utilService : UtilServiceWeb) {

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
    console.log("deconnexion ----------")
    this._authService.deconnexion().subscribe(
      response => {
        if (response==1){
          sessionStorage.removeItem('currentUser');
          sessionStorage.clear();
          this.router.navigate(['']);
        } else
          console.log("Echec deconnexion!") ;
      },
      error => console.log(error),
      () => console.log("Here Dashboard deconnexion")
    )
  }

}
