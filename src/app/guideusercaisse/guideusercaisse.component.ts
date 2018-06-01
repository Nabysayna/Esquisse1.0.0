import { Component, OnInit } from '@angular/core';
import {TarifsService} from "../services/tarifs.service";


@Component({
  selector: 'app-guideusercaisse',
  templateUrl: 'guideusercaisse.component.html',
  styleUrls: ['guideusercaisse.component.css']
})
export class GuideUserCaisseComponent implements OnInit {

   token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
    loading = false ;


  constructor(private _tarifsService:TarifsService) { }

  ngOnInit() {
    this._tarifsService.getTarifTntAbon({typedemande:'abonne',typedebouquet:1,duree:2})
      .subscribe(
        data => {
          console.log(data);
        },
        error => alert(error),
        () => {
          console.log('test getTarifTnt sentool')
        }
      );
  }


}
