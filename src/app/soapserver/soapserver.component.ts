import { Component, OnInit } from '@angular/core';
import {EcomService} from "../services/ecom.service";

@Component({
  selector: 'app-soapserver',
  templateUrl: './soapserver.component.html',
  styleUrls: ['./soapserver.component.css']
})

export class SoapserverComponent implements OnInit {

  public resp : string  ;
  public retourWS: {}[] ;
  token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;

  constructor(private _ecomService:EcomService) {}

   ngOnInit() {
      this._ecomService.listeArticles(this.token, 'catalogue').then( response =>
        {
        this.retourWS = response ;
        console.log("Designation premier article "+this.retourWS)  });
   }

}
