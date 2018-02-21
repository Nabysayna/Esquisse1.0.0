import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { AdminmultipdvMajcaution }    from '../../models/adminmultipdv-majcaution';
import {AdminmultipdvService} from "../../services/adminmultipdv.service";


@Component({
  selector: 'app-admin-multi-pdv-update-caution',
  templateUrl: './admin-multi-pdv-update-caution.component.html',
  styleUrls: ['./admin-multi-pdv-update-caution.component.css']
})
export class AdminmultipdvUpdateCautionComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;

  public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "adminpdv";
    public sortOrder = "desc";
    public categoriepoint='---' ;
    public adminmultipdvMajcaution: AdminmultipdvMajcaution[];
    loading = false ;

    inputCaution: number;
    majcaution:AdminmultipdvMajcaution;
  constructor(private _adminmultipdvService: AdminmultipdvService) { }

  ngOnInit() {
    this.loading = true ;
    this.listmajcautions();
  }

  listmajcautions(){

    this._adminmultipdvService.listmajcautions({type:"azrrtt"}).subscribe(
      adminmultipdvServiceWebList => {
        if(adminmultipdvServiceWebList.errorCode == 1){
          this.adminmultipdvMajcaution = adminmultipdvServiceWebList.response.map(function (elt) {
            return {
              adminpdv:elt.adminpdv,
              adresse: JSON.parse(elt.adresse).address,
              cautioninitiale:elt.cautioninitiale,
              date_last_deposit:elt.date_last_deposit.date.split('.')[0],
              idcaution:elt.idcaution,
              iduser:elt.idUser,
              montantconsomme:elt.montantconsomme,
              telephone:elt.telephone,
              categorie: (elt.cautioninitiale==0)?'pas':((100*elt.montantconsomme)/elt.cautioninitiale)<25?'faible':((100*elt.montantconsomme)/elt.cautioninitiale)>=25 && ((100*elt.montantconsomme)/elt.cautioninitiale)<=50?'passable':'bien',
            }
          })
          console.log(this.adminmultipdvMajcaution);
        }
        else{
          this.adminmultipdvMajcaution = [];
        }
      },
      error => alert(error),
      () => {
        this.getCategorie('Tous');
        this.loading = false ;
      }
    )

  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.adminpdv.length;
  }

  public maj(item):void {
    this.inputCaution = null;
    this.majcaution = item;
  }

  public validermaj(item):void {
    this.loading = true ;
    this._adminmultipdvService.depositinitialconsommeparservice({type: "azrrtt", idadminpdv: this.majcaution.idcaution, modifycaution: this.inputCaution, categorie:this.categoriepoint}).subscribe(
      adminmultipdvServiceWebList => {
        console.log(adminmultipdvServiceWebList);
        this.closeModal();
        this.loading = false ;
        this.listmajcautions();
        this.categoriepoint = '---' ;
      },
      error => alert(error),
      () => {
        this.loading = false ;
      }
    )
  }

  // -------------- Categorisations
  public categorie:string = 'Tous';
  public listepoints:any[] = [];
  public pointasuivre:any;

  getCategorie(categorie: string){
    console.log(categorie)
    if(categorie=='Tous'){
      this.categorie = 'Tous';
      this.listepoints = this.adminmultipdvMajcaution;
    }
    if(categorie=='Pas de depot'){
      this.categorie = 'Pas de depot';
      this.listepoints = this.adminmultipdvMajcaution.filter(type => type.categorie=='pas');
    }
    if(categorie=='Faible'){
      this.categorie = 'Faible';
      this.listepoints = this.adminmultipdvMajcaution.filter(type => type.categorie=='faible');
    }
    if(categorie=='Passable'){
      this.categorie = 'Passable';
      this.listepoints = this.adminmultipdvMajcaution.filter(type => type.categorie=='passable');
    }
    if(categorie=='Bien'){
      this.categorie = 'Bien';
      this.listepoints = this.adminmultipdvMajcaution.filter(type => type.categorie=='bien');
    }
    this.loading = false ;
  }

  tocurrency(number){
    return Number(number).toLocaleString();
  }



}
