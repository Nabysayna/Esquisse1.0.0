import { Component, OnInit, NgZone, ViewChild, Input, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { Http, RequestOptions, RequestMethod, Headers  } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import {EcomService, Commande} from "../services/ecom.service";
import * as _ from "lodash";


class Article {
  public id:number;
  public nomImg:string;
  public designation:string;
  public description:string;
  public prix:number;
  public stock:number;
}

export class Vente {
  public id:number;
  public quantite:number;
  public designation:string;
  public prixUnitaire:number ;
  public tel:number;
  public fullName:string;
  public dateVente:string;
}

export class newCommande{
  public idarticle:number ;
  public qte: number ;
  public prix: number ;
  public montant:number ;
  public designation: string ;
  public description: string ;
  public imagelink: string ;
  public pourvoyeur: number
}


@Component({
  selector: 'app-espace-perso',
  templateUrl: './espace-perso.component.html',
  styleUrls: ['./espace-perso.component.css']
})
export class EspacePersoComponent implements OnInit {

  articles:Article[][];
  loading = false ;
  coderecept : string ;
  listeVentes : any[] ;
  listeCommande : Commande[] ;
  listarticles : Article[] ;
  newImage = "imagevide.jpg" ;
  articlemodif:any={};

  shownPrice : number ;
  partenairesParts : number ;
  customerReduct : number = 0 ;
  addtype = '' ;
  id : any ;

  token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
  nomImage : string ;
  categoriea : string ;
  designationa: string;
  descriptiona: string ;
  prixa:number;
  stocka:number;
  Bcosmetique:boolean=false;
  Bvetement:boolean=false;
  Bchaussure:boolean=false;
  Belectronique:boolean=false;
  Bbureau:boolean=false;
  Belectromenager:boolean=false;
  Baccessoire:boolean=false;
  Bmaison:boolean=false;
  Bsac:boolean=false;
  Bautre:boolean=false;
  categoriepta : string ;
  designationpta: string;
  descriptionpta: string ;
  prixpta:number;
  stockpta:number;
  provenance:string;
  marque:string;
  couleur:string;
  origine:string;
  tendence:string;
  sexe:string;
  mode:string;
  utilisation:string;
  fonctions:string;
  modele:string;
  capacite:string;
  matiere:string;
  tendances:string;
  categorie:string;
  infosup:string;
  prix:string;

  modif:string="-";
  modifart:string;
  orderedArticles : string ;
  nbrePieds : number ;
  smart : string ;
  descriptionsvalues=[];

  zone: NgZone;

  receivedArticles = "" ;
  articlesFournis = "" ;
  categories  : string[] = [] ;
  designation = "designation" ;
  asc = "asc" ;

  constructor(private http: Http,private ecomCaller:EcomService) { }

  ngOnInit() {

    this.loading = true ;
    this.ecomCaller.listeArticles(this.token, 'perso').then( response =>
    {
      this.articles = _.chunk(response, 3) ;
      this.listarticles = response;
      this.loading = false ;
    });

    this.ecomCaller.listerCategorie(this.token).then( response =>
    {
      this.categories = response;
    });
  }
  deleteArticle(article:Article) {
    for(var j=0; j<this.articles.length; j++){
      var ligne=this.articles[j];
      for (var i=0; i<ligne.length; i++)
        if (ligne[i].nomImg==article.nomImg)
        {
          this.loading = true ;
          let artcle = JSON.stringify(ligne[i]) ;
          let params = { article: artcle ,token: this.token } ;
          this.ecomCaller.supprimerArticle(params).then( response =>
          {
            ligne.splice(i,1);
            this.loading = false ;
          });
          break;
        }
    }
  }

  filtre : string = "" ;

  filtrerCatalogue() : Article[][] {

    let catalogueApresFiltre : Article[][] = [] ;
    if (this.filtre=="" || this.filtre==null)
      return this.articles ;
    else
      for(var j=0; j<this.articles.length; j++){
        var ligne=this.articles[j] ;
        let ligneCopy : Article[] = [] ;
        let k : number = 0 ;
        for (var i=0; i<ligne.length; i++)
          if (this.repondAuFiltre(ligne[i]))
          {
            ligneCopy[k]=ligne[i];
            k=k+1 ;
          }
        catalogueApresFiltre.push(ligneCopy) ;
      }
    return catalogueApresFiltre ;
  }

  repondAuFiltre(article : Article) : boolean {
    if (this.filtre=="" || this.filtre==null)
      return true ;
    else
    if ( (article.nomImg.toLowerCase().match( this.filtre.toLowerCase() )!=null) || (article.designation.toLowerCase().match( this.filtre.toLowerCase() )!=null) )
      return true ;
    else
      return false ;
  }


  ajouter(){
    this.loading = true ;
    var data=(JSON.stringify({categorie:this.categorie,provenance:this.provenance,marque:this.marque,couleur:this.couleur,origine:this.origine,model:this.modele,capacite:this.capacite,fonctions:this.fonctions,matiere:this.matiere,tendance:this.tendances,mode:this.mode,sexe:this.sexe,infosup:this.infosup})).toString();
    //let params = { token: this.token , designation: this.designationa, description:this.descriptiona, prix: this.prixa, stock:this.stocka, img_link: this.uploadFile.generatedName, categorie:JSON.stringify({categorie : this.categoriea, type:'ecom'}) };
    let params = { token: this.token , designation: this.designationa, description:data, prix: this.prixa, stock:this.stocka, img_link: this.uploadFile.generatedName, categorie:JSON.stringify({categorie : this.categoriea, type:'ecom'}) };
    console.log(params);
    this.ecomCaller.ajouterArticle(params).then( response =>
    {
      console.log('fi la yamme');
      this.loading = false ;
      this.designationa=undefined;
      this.descriptiona=undefined;
      this.prixa=undefined ;
      this.stocka=undefined;
      this.uploadFile.generatedName = null ;
      this.uploadFile.originalName = null ;
      this.newImage = "imagevide.jpg" ;
      this.prixa = undefined ;
      this.categoriea = "--- Catégorie ---" ;
      this.hideAddChildModal();
    });
  }

  ajouterpta(){
    this.loading = true ;

    let params = { token: this.token , designation: this.designationpta, description:this.descriptionpta, prix: this.prixpta, stock:this.stockpta, img_link: this.uploadFile.generatedName, categorie:JSON.stringify({categorie : this.categoriepta, type:'petiteannonce'}) }
    this.ecomCaller.ajouterArticle(params).then( response =>
    {
      this.designationpta=undefined;
      this.descriptionpta=undefined;
      this.prixpta=undefined ;
      this.stockpta=undefined;
      this.uploadFile.generatedName = null ;
      this.uploadFile.originalName = null ;
      this.newImage = "imagevide.jpg" ;
      this.prixpta = undefined ;
      this.loading = false ;
      this.categoriepta = "--- Catégorie ---" ;
    });
  }


  chargerCommandes(typeListe : string){
    console.log('azertrytuyiuokyjtrgez chargerCommandes azertrytuyiuokyjtrgez')
    this.loading = true ;
    this.ecomCaller.listerCommandes(this.token, typeListe).then( response =>
    {
      console.log('azertrytuyiuokyjtrgez')
      console.log(response)
      this.listeCommande = null ;
      if(typeListe=='toDeliver'){
        this.smart =  response.borom;
        this.listeCommande = response.order;
      }
      else
        this.listeCommande =  response;
      this.loading = false ;
    });
  }

  chargerVentes(){
    this.loading = true ;
    this.ecomCaller.listerVentes(this.token).then( response =>
    {
      this.listeVentes = [] ;
      this.listeVentes =  response ;
      this.loading = false ;
    });
  }

  receptionner(idCommande : number){
    let params = {token: this.token, idCommande: idCommande};
    this.loading = true ;
    this.ecomCaller.receptionnerCommandes(params).then( response =>
    {
      if(response=="ok")
        this.receivedArticles = this.receivedArticles + "-"+idCommande.toString()+"-" ;
      this.loading = false ;
    });
  }

  fournir(idCommande : number){
    let params = {token: this.token, idCommande: idCommande};
    this.loading = true ;
    this.ecomCaller.fournirCommandes(params).then( response =>
    {
      if(response=="ok")
        this.articlesFournis = this.articlesFournis + "-"+idCommande.toString()+"-" ;
      this.loading = false ;
    });
  }

  receivedCmd(idCommande : number){
    return ( this.receivedArticles.indexOf("-"+idCommande.toString()+"-")>-1 ) ;
  }

  cmdFournis(idCommande : number){
    return ( this.articlesFournis.indexOf("-"+idCommande.toString()+"-")>-1 ) ;
  }

  modifArticle(article:Article){
    this.modif=article.nomImg;
    this.modifart="record"+article.nomImg;
  }

  enregArticle(article: Article){
    this.modif="";
    this.modifart="";

    this.loading = true ;

    for(var j=0; j<this.articles.length; j++){
      var ligne=this.articles[j];
      for (var i=0; i<ligne.length; i++)
        if (ligne[i].nomImg==article.nomImg)
        {
          if(!(this.uploadFile === undefined)){
            ligne[i].nomImg = this.uploadFile.generatedName ;
          }
          let artcle = JSON.stringify(ligne[i]) ;
          let params = { article: artcle ,token: this.token } ;
          this.ecomCaller.modifierArticle(params).then( response =>
          {
            this.loading = false ;
          });
          break;
        }
    }
  }

  annulArticle(){
    this.loading = true ;
    this.ecomCaller.listeArticles(this.token, 'perso').then( response =>
    {
      this.articles = _.chunk(response, 5) ;
      this.listarticles = response;
      this.loading = false ;
    });
    this.modif="";
    this.modifart="";

  }

  reinitialiser(){
    this.provenance=undefined;
    this.marque=undefined;
    this.couleur=undefined;
    this.origine=undefined;
    this.tendence=undefined;
    this.sexe=undefined;
    this.mode=undefined;
    this.utilisation=undefined;
    this.fonctions=undefined;
    this.modele=undefined;
    this.capacite=undefined;
    this.matiere=undefined;
    this.tendances=undefined;

  }

  detailsCurrentCommande() : newCommande[]{
    if(this.orderedArticles){
      let tabOrder : newCommande[] = JSON.parse(this.orderedArticles) ;
      return tabOrder ;
    }
    return [] ;
  }

  uploadFile: any;

  @ViewChild('childModal') public childModal:ModalDirective;

  public showChildModal(ordereddArticles):void {
    this.orderedArticles = ordereddArticles ;
    if(JSON.parse(this.orderedArticles).length%3 == 0)
      this.nbrePieds = JSON.parse(this.orderedArticles).length/3 ;
    else
      this.nbrePieds = JSON.parse(this.orderedArticles).length/3 + 1;
    this.childModal.show();
  }

  public hideChildModal():void {
    this.childModal.hide();
  }

  /*-----------------------------------------------------------*/

  @ViewChild('addChildModal') public addChildModal:ModalDirective;
  @ViewChild('modalmodif') public modalmodif:ModalDirective;
  public showmodaldif(article){
    this.articlemodif=article;
    console.log(this.articlemodif);
    this.modalmodif.show();
    //modifArticle(article)
  }
  hidemodalmodif(){
    this.modalmodif.hide();
  }

  validermodif(article){
    // modifArticle(article);
    let data=(JSON.stringify({provenance:this.provenance,marque:this.marque,couleur:this.couleur,origine:this.origine,tendance:this.tendances,mode:this.mode,sexe:this.sexe})).toString();
    let params=JSON.stringify({'article':{description:data,prix:this.prix,designation:this.designation,id:article.id,nomImg:article.nomImg,token:this.token}});
    console.log(params);
    this.ecomCaller.modifierArticle(params).then( response =>
    {
      console.log(response);
      // this.loading = false ;
      this.hidemodalmodif();
      this.reinitialiser();
    });

  }

  public showAddChildModal():void {
    this.descriptionsvalues=[];
    this.addChildModal.show();
  }

  public hideAddChildModal():void {
    this.addChildModal.hide();
    this.categoriea = "--- Catégorie ---" ;
    this.addtype = '' ;
    this.prixa = 0 ;
  }


  annuler(){
    this.hideAddChildModal() ;
    this.newImage = "imagevide.jpg" ;
    this.categoriea = "--- Catégorie ---" ;
  }

  apiEndPoint = 'https://sentool.bbstvnet.com/sslayer/server-backend-upload/index.php' ;

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      let formData:FormData = new FormData();
      formData.append('file', file, file.name);
      let headers = new Headers();

      /** No need to include Content-Type in Angular 4 */
      //Applying content-type in the current case leads to an impossible upload

      // headers.append('Content-Type', 'multipart/form-data');

      headers.append('Accept', 'application/json');
      let options = new RequestOptions({
        headers: headers
      });

      this.http.post(`${this.apiEndPoint}`, formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
          data => {
            let newData = data;
            this.uploadFile = newData;
            this.newImage = this.uploadFile.generatedName ;
          },
          error => {}
        )
    }
  }

  tauxreduc(basicPrice){
    if (basicPrice<=10000){
      return 0.1 ;
    }
    if (basicPrice>10000 && basicPrice<=50000){
      return 0.085 ;
    }
    if (basicPrice>50000 && basicPrice<=100000){
      return 0.095 ;
    }
    if (basicPrice>100000 && basicPrice<=250000){
      return 0.09 ;
    }
    if (basicPrice>250000 && basicPrice<=500000){
      return 0.07 ;
    }
    if (basicPrice>500000 && basicPrice<=750000){
      return 0.05 ;
    }
    if (basicPrice>750000 && basicPrice<=1000000){
      return 0.04 ;
    }
    else{
      return 0.035 ;
    }
  }

  reduirePrix(basicPrice){
    if (basicPrice<=10000){
      this.customerReduct = Math.round((basicPrice*0.1)*0.5) ;
    }
    if (basicPrice>10000 && basicPrice<=50000){
      this.customerReduct = Math.round((basicPrice*0.085)*0.5) ;
    }
    if (basicPrice>50000 && basicPrice<=100000){
      this.customerReduct = Math.round((basicPrice*0.095)*0.5) ;
    }
    if (basicPrice>100000 && basicPrice<=250000){
      this.customerReduct = Math.round((basicPrice*0.09)*0.5) ;
    }
    if (basicPrice>250000 && basicPrice<=500000){
      this.customerReduct = Math.round((basicPrice*0.07)*0.5) ;
    }
    if (basicPrice>500000 && basicPrice<=750000){
      this.customerReduct = Math.round((basicPrice*0.05)*0.5) ;
    }
    if (basicPrice>750000 && basicPrice<=1000000){
      this.customerReduct = Math.round((basicPrice*0.04)*0.5) ;
    }
    else{
      this.customerReduct = Math.round((basicPrice*0.035)*0.5) ;
    }

  }

  roundedValueOf(decimal){
    return Math.round(decimal) ;
  }

  descriptionarticle(categorie:string){
    if(categorie=="--- Catégorie ---"){
      this.descriptionsvalues=[];
    }
    //for(let i=0;i<this.descriptions.length;i++){
    //if(this.descriptions[i].description==categorie){
    // this.descriptionsvalues=this.descriptions[i].value;
    switch(categorie){
      case 'Cosmetiques':{
        this.categorie='cosmetiques';
        this.reinitialiser();
        this.Bcosmetique=true;
        this.Bvetement=false;
        this.Bchaussure=false;
        this.Belectronique=false;
        this.Bbureau=false;
        this.Belectromenager=false;
        this.Baccessoire=false;
        this.Bsac=false;
        break;
      }
      case 'Accessoires':{
        this.categorie='accessoires';
        this.reinitialiser();
        this.Bcosmetique=false;
        this.Bvetement=false;
        this.Bchaussure=false;
        this.Belectronique=false;
        this.Bbureau=false;
        this.Belectromenager=false;
        this.Bsac=false;
        this.Baccessoire=true;
        break;
      }
      case 'Vêtements':{
        this.categorie='vetements';
        this.reinitialiser();
        this.Bvetement=true;
        this.Bcosmetique=false;
        this.Belectronique=false;
        this.Bchaussure=false;
        this.Baccessoire=false;
        this.Bbureau=false;
        this.Belectromenager=false;
        this.Bsac=false;
        break;
      }
      case 'Chaussures':{
        this.categorie='chaussures';
        this.reinitialiser();
        this.Bvetement=false;
        this.Bcosmetique=false;
        this.Belectronique=false;
        this.Bchaussure=true;
        this.Baccessoire=false;
        this.Bbureau=false;
        this.Belectromenager=false;
        this.Bsac=false;
        break;
      }
      case 'Electronique':{
        this.categorie='electronique';
        this.reinitialiser();
        this.Bvetement=false;
        this.Bcosmetique=false;
        this.Bchaussure=false;
        this.Baccessoire=false;
        this.Belectronique=false;
        this.Bbureau=false;
        this.Belectromenager=false;
        this.Bsac=false;
        break;
      }
      case 'Outils de bureau':{
        this.categorie='bureau';
        this.reinitialiser();
        this.Bvetement=false;
        this.Bcosmetique=false;
        this.Bchaussure=false;
        this.Belectronique=false;
        this.Baccessoire=false;
        this.Bbureau=true;
        this.Belectromenager=false;
        this.Bsac=false;
        break;
      }
      case 'Electromenager':{
        this.categorie='electromenager';
        this.reinitialiser();
        this.Bvetement=false;
        this.Bcosmetique=false;
        this.Bchaussure=false;
        this.Belectronique=false;
        this.Bbureau=false;
        this.Belectromenager=true;
        this.Baccessoire=false;
        this.Bsac=false;
        break;
      }
      case 'Sacs':{
        this.categorie='sacs';
        this.reinitialiser();
        this.Bvetement=false;
        this.Bcosmetique=false;
        this.Bchaussure=false;
        this.Belectronique=false;
        this.Bbureau=false;
        this.Belectromenager=false;
        this.Baccessoire=false;
        this.Bsac=true;
        break;
      }
      default:break;
    }

  }

}
