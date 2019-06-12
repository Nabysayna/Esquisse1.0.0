import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'app/services/utils.service';

@Component({
  selector: 'app-accueil-master-agent-pdv',
  templateUrl: './accueil-master-agent-pdv.component.html',
  styleUrls: ['./accueil-master-agent-pdv.component.css']
})
export class AccueilMasterAgentPdvComponent implements OnInit {
  
  constructor(private _utilsService:UtilsService) { }
  solde:number; 
  updateCaution(){
    console.log("updateCaution 1");
      this._utilsService.checkCaution().subscribe(
        data => {
          this.solde = data ;
          console.log(this.solde);
          console.log("Le solde vaut "+data) ;
        },
        error => alert(error),
        () => {
          console.log(3)
        }
      )
  }
  tocurrency(number){
    return Number(number).toLocaleString();
  }
  autoriserpourcettefonctionnalie: boolean = false;
  

  ngOnInit() {
    console.log(JSON.parse(sessionStorage.getItem('currentUser')));
    if( JSON.parse(sessionStorage.getItem('currentUser')).prenom=='ABDAH' && JSON.parse(sessionStorage.getItem('currentUser')).telephone=='221775198699' && JSON.parse(sessionStorage.getItem('currentUser')).accessLevel==1 ) {
      this.autoriserpourcettefonctionnalie = true;
    }
    else if( JSON.parse(sessionStorage.getItem('currentUser')).prenom=='assane' && JSON.parse(sessionStorage.getItem('currentUser')).accessLevel==1 ) {
      this.autoriserpourcettefonctionnalie = true;
    }
  }

}
