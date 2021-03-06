import { Component, OnInit, Compiler, ViewChild,AfterViewInit } from '@angular/core';

import { ModalDirective } from 'ng2-bootstrap/modal';

import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentification.service';
import {UtilsService} from "../services/utils.service";


@Component({
  moduleId: module.id,
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css']
})
export class AuthComponentComponent implements OnInit,AfterViewInit {

  userName = ''  ;
  userPwd  = '' ;
  fakevalues : boolean ;
  phase2fakevalues : boolean = true ;
  loading = false ;
  phase1 = true ;


  public regions:any[] = [];
  public zones:any[] = [];
  public iszones:boolean;
  public souszones:any[] = [];
  public issouszones:boolean;
  public isadresse : boolean  ;
  usedLogin = false ;
  codevalidation:any;
  errorSouscription:boolean=false;
  region : any ;
  zone : any ;
  souszone : any ;

  prenom : any ;
  nom :any ;
  email :any ;
  telephone :any ;
  nometps : any ;
  nomshop : any ;
  adresse : any ;
  fromSMS : string ;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private _compiler: Compiler,
    private _utilsService:UtilsService) {
      this._compiler.clearCache();
      this.fakevalues = true ;
  }

  ngOnInit() {
    sessionStorage.clear() ;
    this.authenticationService.logout();
    this.getRegionNewCaissier();
  }

  ngAfterViewInit(){
    localStorage.setItem("auredemarrage","yesca")
    console.log("**YES CA**")
  }

  authentificate() {
    this.loading = true ;
    this.authenticationService.login(this.userName, this.userPwd).then(access=>
      {
        if(access  != "rejected"){
          this.loading = false ;
          this.phase1 = false ;
        }else{
          this.fakevalues = false ;
          this.userName = ''  ;
          this.userPwd  = '' ;
          this.loading = false ;
        }
      });
  }

  diagnostiquer(){
      location.reload(true) ;
  }

  authentificateBySMS(){
    this.loading = true ;
    this.authenticationService.loginPhase2(this.fromSMS+"#"+sessionStorage.getItem('headToken') ).then( access=> {
      console.log(access) ;
      if ( access === 3 ){
        this.router.navigate(['/accueil']);
      }else if ( access === 2 ){
        if (JSON.parse(sessionStorage.getItem('currentUser')).firstuse==1){
          this.router.navigate(['/soppipwdbifi']);
        }
        else {
          this.router.navigate(['/accueiladmpdv']);
        }
      }else if ( access === 1 ){
        this.router.navigate(['/accueiladmmpdv']);
      }else if ( access === 5 ){
        this.router.navigate(['/accueilmasterpdv']);
      }else {
        this.phase2fakevalues = false ;
        this.fromSMS = ''  ;
      }

      this.loading = false ;
    });
  }

  getRegionNewCaissier(){
    this._utilsService.getRegion()
      .subscribe(
        data => {
          this.regions = data;
        },
        error => alert(error),
        () => {
          console.log('test init sentool')
        }
      );
  }

  selectRegionNewCaissier(){
    this.iszones = false;
    this.zone = '--Choix zone--';
    this.souszone = '--Choix sous zone--';
    this._utilsService.getZoneByRegion(this.region)
      .subscribe(
        data => {
          this.zones = data;
          this.iszones = true;
        },
        error => alert(error),
        () => console.log('getZoneByRegion')
      );
  }

  selectZoneNewCaissier(){
    this.issouszones = false;
    this._utilsService.getSouszoneByZoneByRegion({region:this.region, zone: this.zone})
      .subscribe(
        data => {
          this.souszones = data;
          this.issouszones = true;
        },
        error => alert(error),
        () => console.log('getSouszoneByZoneByRegion')
      );
  }

  selectsousZoneNewCaissier(){
    if (this.souszone!='Choisir sous zone')
      this.isadresse = true;
  }

  @ViewChild('viewMore') public endRegisterdModal:ModalDirective;

  ouvrir(){
      this.endRegisterdModal.show() ;
  }

  closeModal(){
      this.endRegisterdModal.hide() ;
  }

  inscrire(){
    let paramInscrpt = {'token': '234576TVG5@u_45RRFT', 'prenom':this.prenom, 'nom':this.nom, 'email':this.email, 'telephone':this.telephone+"#"+this.codevalidation, 'nometps':this.nometps, 'nomshop':this.nomshop, adresse : JSON.stringify({'region':this.region, 'zone':this.zone, 'souszone':this.souszone, 'address':this.adresse}), 'idcommercial':3 } ;
    this.loading = true ;
    this.errorSouscription = false;
    console.log( "Nouvel Inscrit : "+JSON.stringify(paramInscrpt) ) ;
    this.authenticationService.inscrire(paramInscrpt).then( retourserveur => {
      this.loading = false ;
      console.log(retourserveur);

      if(retourserveur=="n-a"){
        this.usedLogin=true ;
        this.errorSouscription = true;
      }
      if(retourserveur=="bad"){
          this.usedLogin=true ;
          this.errorSouscription = true;
      }
      if(retourserveur=="ok"){
        this.endRegisterdModal.show() ;
        this.usedLogin=false ;
        this.prenom=undefined ;
        this.nom=undefined ;
        this.email=undefined ;
        this.telephone=undefined ;
        this.nometps=undefined ;
        this.nomshop=undefined ;
        this.region=undefined ;
        this.zone=undefined ;
        this.souszone=undefined ;
        this.adresse=undefined ;
      }
    });
  }

}
