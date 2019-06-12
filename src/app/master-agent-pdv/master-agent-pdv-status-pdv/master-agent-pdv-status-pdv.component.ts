import { Component, OnInit } from '@angular/core';
import { MapsService } from 'app/services/maps.service';

@Component({
  selector: 'app-master-agent-pdv-status-pdv',
  templateUrl: './master-agent-pdv-status-pdv.component.html',
  styleUrls: ['./master-agent-pdv-status-pdv.component.css']
})
export class MasterAgentPdvStatusPdvComponent implements OnInit {


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
