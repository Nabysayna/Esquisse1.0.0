import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';
import * as _ from "lodash";
import * as sha1 from 'js-sha1';

import { AuthService } from '../../services/auth.service';
import {AdminpdvService} from "../../services/adminpdv.service";
import {UtilsService} from "../../services/utils.service";


@Component({
  selector: 'app-adminpdv-parametre-compte',
  templateUrl: './adminpdv-parametre-compte.component.html',
  styleUrls: ['./adminpdv-parametre-compte.component.css']
})
export class AdminpdvparametrecompteComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;

  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "pdv";
  public sortOrder = "asc";

  public regions:any[] = [];
  public zones:any[] = [];
  public iszones:boolean;
  public souszones:any[] = [];
  public issouszones:boolean;

  region : any ;
  zone : any ;
  souszone : any ;
  chaine : string ;

  prenom : any ;
  nom :any ;
  email :any ;
  telephone :any ;
  nometps : any ;
  nomshop : any ;
  adresse : any ;

  existLogin = false ;

  public monitoringAdminpdvUserpdv: any;
  public modifuserpdv: any;
  public password:string;
  public confirmPassword:string;
  public errorConfirm:boolean = false;
  loading = false ;

  constructor(private _adminpdvService:AdminpdvService, private _authService: AuthService, private _utilsService:UtilsService) { }

  ngOnInit() {
    console.log("test");
    this._adminpdvService.listuserpdv({type:"azrrtt"}).subscribe(
      data => {
        this.monitoringAdminpdvUserpdv = data.response ;
      },
      error => alert(error),
      () => {
        this.getRegionNewCaissier();
        this.loading = false ;
      }
    );

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

  private closeModal(): void {
    this.iszones = false;
    this.issouszones = false;
    this.getRegionNewCaissier();

    this.errorConfirm = false;
    this.closeBtn.nativeElement.click();
    console.log('close');
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.pdv.length;
  }

  getAdress(adresse){
    return JSON.parse(adresse).address+" / "+JSON.parse(adresse).zone ;
  }

  public modif(item):void {
    this.modifuserpdv = item;
  }

  public validermodif():void {
    if(this.password == this.confirmPassword) {
      this._adminpdvService.modifypdv({idpdv: this.modifuserpdv.idpdv, modifydata: sha1(this.password)}).subscribe(
        data => {
          console.log(data);
        },
        error => alert(error),
        () => console.log("Localhost Test")
      );

      this.errorConfirm = false;
      this.password= null;
      this.confirmPassword = null;
      this.closeBtn.nativeElement.click();
    }
    else{
      this.errorConfirm = true;
    }
  }

  inscrire(){
    this.loading = true ;
    this._authService.creerProfilCaissier({
      prenom:this.prenom,
      nom:this.nom,
      email:this.email,
      telephone:this.telephone,
      nometps:this.nometps,
      nomshop:this.nomshop,
      adresse : JSON.stringify({
        region:this.region,
        zone:this.zone,
        souszone:this.souszone,
        address:this.adresse
      })
    }).subscribe(
      data => {
        console.log(data);
        if(data!="bad"){
          this._adminpdvService.listuserpdv({type:"azrrtt"}).subscribe(
            data => {
              this.monitoringAdminpdvUserpdv = data.response ;
            },
            error => alert(error),
            () => {
              this.loading = false ;
            }
          );
        }else{
          this.existLogin = true ;
        }

      },
      error => alert(error),
      () => {
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
        this.existLogin = false ;
        this.closeModal();
        this.loading = false ;
      }
    );

  }

  currencyFormat(somme) : String{
    return Number(somme).toLocaleString() ;
  }

  public deconnexionsession(pdv,i):void {
    this.loading = true ;
    this._adminpdvService.deconnectpdv({idpdv: pdv.idpdv}).subscribe(
      data => {
        this._adminpdvService.listuserpdv({type:"azrrtt"}).subscribe(
          data => {
            this.monitoringAdminpdvUserpdv = data.response ;
          },
          error => alert(error),
          () => {
            this.loading = false ;
          }
        );
      },
      error => alert(error),
      () => console.log("Localhost Test")
    );
  }

  public autoriseravoirdeposir(gerant, estautorise:number){
    console.log("Localhost autoriseravoirdeposir")
    console.log(gerant)
    this.loading = true ;
    this._adminpdvService.autoriservoirdepot({idpdv: gerant.idpdv, estautoriser: estautorise}).subscribe(
      data => {
        this._adminpdvService.listuserpdv({type:"azrrtt"}).subscribe(
          data => {
            this.monitoringAdminpdvUserpdv = data.response ;
          },
          error => alert(error),
          () => {
            this.loading = false ;
          }
        );
      },
      error => alert(error),
      () => console.log("Localhost Test")
    );
  }

}
