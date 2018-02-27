import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { Location }               from '@angular/common';
import { Http, RequestOptions, RequestMethod, Headers, } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import {DemandepretService, Demandepret} from "../services/demandepret.service";


@Component({
  selector: 'app-demandepret',
  templateUrl: './demandepret.component.html',
  styleUrls: ['./demandepret.component.css']
})
export class DemandepretComponent implements OnInit {

	public demandepret:Demandepret[];
   token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
    loading = false ;

    intitule : string ;
    numcompte: string ;
    infoperso: string ;
    siegesoc: string ;
    numport: string ;
    numfixe: string ;
    email: string ;
    mntdemande: string ;
    dureedemande : string ;
    document
    typcredit :string ;
    formejuridiq : string ;
    documentContratLocation : string;
    documentRelevesProduits : string;
    documentReleveCompte  : string;
    documentContratDistribution : string;
    documentCautionMorale : string;
    documentCNI : string;
    documentCertificatDomicile: string;
    documentJustificatifactivite : string;


  constructor(
     private location: Location,
     private route:ActivatedRoute,
     private _demandepretService:DemandepretService,
     private http: Http
  ) { }

  ngOnInit() {
    this._demandepretService.demandepret().subscribe(
      data => {
        console.log("Localhost Test");
        console.log(data);
        this.demandepret = data;
      },
      error => alert(error),
      () => {
        this.loading = false ;
      }
    )
  }

  envoyerDemande(){

    this.loading = true ;

    let requete = JSON.stringify(
      {
        "intitule":this.intitule,
        "numcompte":this.numcompte,
        "infoperso":this.infoperso,
        "siegesoc":this.siegesoc,
        "numport":this.numport,
        "numfixe":this.numfixe,
        "email":this.email,
        "mntdemande":this.mntdemande,
        "dureedemande":this.dureedemande,
        "typcredit":this.typcredit,
        "formejuridiq":this.formejuridiq,
        "documentContratLocation":this.documentContratLocation,
        "documentRelevesProduits":this.documentRelevesProduits,
        "documentReleveCompte":this.documentReleveCompte,
        "documentContratDistribution": this.documentContratDistribution,
        "documentCautionMorale": this.documentCautionMorale,
        "this.documentCNI":this.documentCNI,
        "documentCertificatDomicile":this.documentCertificatDomicile,
        "documentJustificatifactivite":this.documentJustificatifactivite
      }
    ) ;

    this._demandepretService.envoyerDemandeDepretCofina(requete).subscribe(
      data => {
        console.log("Localhost Test");
        console.log(data);
        this.intitule = undefined ;
        this.numcompte= undefined ;
        this.infoperso= undefined ;
        this.siegesoc= undefined ;
        this.numport= undefined;
        this.numfixe= undefined ;
        this.email= undefined;
        this.mntdemande= undefined ;
        this.dureedemande = undefined ;
        this.typcredit= undefined ;
        this.formejuridiq= undefined ;
        this.documentContratLocation= undefined;
        this.documentRelevesProduits= undefined;
        this.documentReleveCompte= undefined;
        this.documentContratDistribution= undefined;
        this.documentCautionMorale= undefined;
        this.documentCNI= undefined;
        this.documentCertificatDomicile= undefined;
        this.documentJustificatifactivite= undefined;
      },
      error => alert(error),
      () => {
        this.loading = false ;
      }
    )
  }

  uploadFile: any;
  apiEndPoint = 'http://localhost/backup-sb-admin/new-backend-esquise/server-backend-upload/cofinaUpload.php' ;
  newImage = "imagevide.jpg" ;

  fileChange(event) {
      let fileList: FileList = event.target.files;
      let span = event.target.parentElement.nextSibling.nextSibling.querySelector('span');

      span.classList.remove('glyphicon-ok');
      span.classList.remove('glyphicon-remove');
      span.classList.add('glyphicon-transfer');


      if(fileList.length > 0) {
          let file: File = fileList[0];
          let formData:FormData = new FormData();
          formData.append('file', file, file.name);
          let headers = new Headers();

          headers.append('Accept', 'application/json');
          let options = new RequestOptions({headers: headers});

          this.http.post(`${this.apiEndPoint}`, formData, options)
              .map(res => res.json())
              .catch(error => Observable.throw(error))
              .subscribe(
                  data => {
                           let newData = data;
                           this.uploadFile = newData;
                           span.classList.remove('glyphicon-transfer');
                           span.classList.add('glyphicon-ok');
                           return  "http://localhost/server-backend-upload/uploads/" + this.uploadFile.generatedName ;
                        },
                  error => {
                        span.classList.remove('glyphicon-ok');
                        span.classList.remove('glyphicon-transfer');
                        span.classList.add('glyphicon-remove');
                   }
              )
      }
  }

}
