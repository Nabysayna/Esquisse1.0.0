import { Component, OnInit } from '@angular/core';

import {AdminmultipdvService} from "../../services/adminmultipdv.service";


@Component({
  selector: 'app-admin-multi-pdv-demande-retrait',
  templateUrl: './admin-multi-pdv-demande-retrait.component.html',
  styleUrls: ['./admin-multi-pdv-demande-retrait.component.css']
})
export class AdminmultipdvDemandeRetraitComponent implements OnInit {

    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "datedemanderetrait";
    public sortOrder = "desc";

    public adminmultipdvDemanderetrait: any[];
    loading = false ;

  constructor(private _adminmultipdvService: AdminmultipdvService) { }

  ngOnInit() {
    this.loading = true ;
    this._adminmultipdvService.demanderetraitfond({type:"azrrtt"}).subscribe(
      adminmultipdvServiceWebList => {
        this.adminmultipdvDemanderetrait = adminmultipdvServiceWebList.map(function (elt) {
          return {
            adresse:JSON.parse(elt.adresse).address,
            agent:elt.agent,
            datedemanderetrait:elt.datedemanderetrait,
            etatdemande:elt.etatdemande,
            iddemanderetrait:elt.iddemanderetrait,
            montantdemande:elt.montantdemande,
            telephone:elt.telephone,
          }
        });
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
        return a.datedemanderetrait.length;
    }

    validretrait(iddemanderetrait:number){
      this.loading = true ;
      this._adminmultipdvService.validerretrait({type:"azrrtt", idretrait: iddemanderetrait}).subscribe(
        adminmultipdvServiceWebList => {
          this._adminmultipdvService.demanderetraitfond({type:"azrrtt"}).subscribe(
            adminmultipdvServiceWebList => {
              this.adminmultipdvDemanderetrait = adminmultipdvServiceWebList.map(function (elt) {
                return {
                  adresse:JSON.parse(elt.adresse).address,
                  agent:elt.agent,
                  datedemanderetrait:elt.datedemanderetrait,
                  etatdemande:elt.etatdemande,
                  iddemanderetrait:elt.iddemanderetrait,
                  montantdemande:elt.montantdemande,
                  telephone:elt.telephone,
                }
              });
            },
            error => alert(error),
            () => {
              this.loading = false ;
            }
          )
        },
        error => alert(error),
        () => {
          this.loading = false ;
        }
      )

    }

}
