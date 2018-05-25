import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

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
    public adminmultipdvMajcaution: any[];
    loading = false ;

    inputCaution: number;
    majcaution:any;
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
              cautioninitiale:Number(elt.cautioninitiale),
              date_last_deposit:elt.date_last_deposit.date.split('.')[0],
              idcaution:elt.idcaution,
              iduser:elt.idUser,
              montantconsomme:Number(elt.montantconsomme),
              telephone:elt.telephone,
              categorie: (elt.cautioninitiale==0 && elt.montantconsomme==0 )?'pas':(elt.cautioninitiale==0 && elt.montantconsomme!=0 )?'pasdepot_aveccaution':((100*elt.montantconsomme)/elt.cautioninitiale)<25?'faible':((100*elt.montantconsomme)/elt.cautioninitiale)>=25 && ((100*elt.montantconsomme)/elt.cautioninitiale)<=50?'passable':'bien',
            }
          })
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
    if(confirm("Confirmer Positionnement dépot")){
      this.loading = true;
      this._adminmultipdvService.modifymajcaution({type: "azrrtt", idadminpdv: this.majcaution.idcaution, modifycaution: this.inputCaution, categorie:this.categoriepoint}).subscribe(
        adminmultipdvServiceWebList => {
          this.closeModal();
          this.categoriepoint = '---' ;
        },
        error => alert(error),
        () => {
          this.listmajcautions();
          this.loading = false ;
        }
      )
    }
    else{
      console.log("Je ne confirme pas")
    }



  }

  // -------------- Categorisations
  public categorie:string = 'Tous';
  public listepoints:any[] = [];
  public pointasuivre:any;

  getCategorie(categorie: string){
    if(categorie=='Tous'){
      this.categorie = 'Tous';
      this.listepoints = this.adminmultipdvMajcaution;
    }
    if(categorie=='Pas de depot'){
      this.categorie = 'Pas de depot';
      this.listepoints = this.adminmultipdvMajcaution.filter(type => type.categorie=='pas');
    }
    if(categorie=='Pas de depot Avec caution'){
      this.categorie = 'Pas de depot Avec caution';
      this.listepoints = this.adminmultipdvMajcaution.filter(type => type.categorie=='pasdepot_aveccaution');
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
