import { Component, OnInit } from '@angular/core';

import { AdminmultipdvReclamation }    from '../../models/adminmultipdv-reclamation';
import {AdminmultipdvService} from "../../services/adminmultipdv.service";


@Component({
  selector: 'app-admin-multi-pdv-status-reclamation',
  templateUrl: './admin-multi-pdv-status-reclamation.component.html',
  styleUrls: ['./admin-multi-pdv-status-reclamation.component.css']
})
export class AdminmultipdvStatusReclamationComponent implements OnInit {

  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "datereclamation";
  public sortOrder = "asc";

  public adminmultipdvReclamation: AdminmultipdvReclamation[];
  loading = false ;

  constructor(private _adminmultipdvService: AdminmultipdvService) { }

  ngOnInit() {
    this.loading = true ;
    this._adminmultipdvService.historiquereclamation({type:"azrrtt"}).subscribe(
      adminmultipdvServiceWebList => {
        this.adminmultipdvReclamation = adminmultipdvServiceWebList.response.map(function (elt) {
          return {
            adminpdv:elt.adminpdv,
            adresse: JSON.parse(elt.adresse).address,
            datereclamation:elt.datereclamation.date.split('.')[0],
            etatreclamation:elt.etatreclamation,
            reclamation:elt.reclamation,
            pdv:elt.pdv,
            telephone:elt.telephone,
            typeservice:elt.typeservice,
          }
        })
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



}
