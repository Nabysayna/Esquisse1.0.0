import { Component, OnInit } from '@angular/core';
import {MapsService} from "../../services/maps.service";

@Component({
  selector: 'app-admin-multi-pdv-status-pdv',
  templateUrl: './admin-multi-pdv-status-pdv.component.html',
  styleUrls: ['./admin-multi-pdv-status-pdv.component.css'],
})
export class AdminmultipdvStatusPdvComponent implements OnInit {


  loading = false ;

  public adminmultipdvListmap: any;
  public centermap = {zoom: 7, lat: 14.716447783648722, lng: -15.32318115234375};


	constructor(private _mapsService: MapsService) { }

  ngOnInit() {
    this.loading = true ;
    this._mapsService.listmaps('azrrtt').then(mapsServiceWebList => {
      this.adminmultipdvListmap = mapsServiceWebList.response;
      this.loading = false ;
    });
  }


  listDepartement: any[];
  public typeaheadLoading: boolean;
  public typeaheadNoResults: boolean;




}
