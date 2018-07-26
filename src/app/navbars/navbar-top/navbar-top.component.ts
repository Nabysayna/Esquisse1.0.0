import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthService} from "../../services/auth.service";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {
  message : string  ;
  autorisedUser = 0 ;
  solde : number ;
  s:number=0;
  currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  constructor(private _authService:AuthService, private router: Router, private _utilsService:UtilsService){ }

  ngOnInit() {
    this._utilsService.isDepotCheckAuthorized().subscribe(
      data => {
        data = JSON.parse(data)
        if(data.estautorise==1) this.autorisedUser = data.estautorise ;
        this.retrieveAlerteMessage() ;
      },
      error => alert(error),
      () => {
        this.updateCaution() ;
      }
    )
  }

  retrieveAlerteMessage(){
    var periodicVerifier = setInterval(()=>{
      this._utilsService.consulterLanceurDalerte().subscribe(
        data => {
          this.message=data.message;
        },
        error => alert(error),
        () => {
          console.log(3)
        }
      )
    },60000);
  }

  updateCaution(){
    console.log("updateCaution 1");
    if ( this.autorisedUser == 1)
      this._utilsService.checkCaution().subscribe(
        data => {
          this.solde = data ;
          console.log("Le solde vaut "+data) ;
        },
        error => alert(error),
        () => {
          console.log(3)
        }
      )
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
