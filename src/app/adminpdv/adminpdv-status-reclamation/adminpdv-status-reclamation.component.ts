import { Component, OnInit } from '@angular/core';

import {AdminpdvService} from "../../services/adminpdv.service";

@Component({
  selector: 'app-adminpdv-status-reclamation',
  templateUrl: './adminpdv-status-reclamation.component.html',
  styleUrls: ['./adminpdv-status-reclamation.component.css']
})
export class AdminpdvStatusReclamationComponent implements OnInit {

  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "datereclamation";
  public sortOrder = "asc";

  public adminmultipdvReclamation: any;
  loading = false ;

  constructor(private _adminpdvService:AdminpdvService) { }

  ngOnInit() {
    this.loading = true ;
    this._adminpdvService.historiquereclamation({type:"azrrtt"}).subscribe(
      data => {
        console.log("Localhost Test");
        console.log(data.response);
        this.adminmultipdvReclamation = data.response ;
      },
      error => alert(error),
      () => {
        this.loading = false ;
      }
    )
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.etatreclamation.length;
  }

  getAdress(adresse){
    return JSON.parse(adresse).address ;
  }

}
