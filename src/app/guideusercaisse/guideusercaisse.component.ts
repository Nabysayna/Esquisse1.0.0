import {
   Component,
  OnInit,
  ComponentFactoryResolver, 
  Type,
  ViewChild,
  ViewContainerRef} from '@angular/core';
import {TarifsService} from "../services/tarifs.service";
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/operator/concat';
import { ZoningComponent } from 'app/zoning/zoning.component';
import { NewAnfantComponent } from 'app/new-anfant/new-anfant.component';





@Component({
  selector: 'app-guideusercaisse',
  templateUrl: 'guideusercaisse.component.html',
  styleUrls: ['guideusercaisse.component.css']
})


export class GuideUserCaisseComponent implements OnInit {

    token : string = JSON.parse(sessionStorage.getItem('currentUser')).baseToken ;
    loading = false ;
    // r:ViewRef;

    // @ViewChild("vc", {read: ViewContainerRef}) vc: ViewContainerRef;
    // @ViewChild("tpl") tpl: TemplateRef<any>;

    // nginsertView() {
    //     this.contact ={
    //       id: 1,
    //       name: "Laura",
    //       email: "lbutler0@latimes.com",
    //       age: 47
    //     };

    //     let view = this.tpl.createEmbeddedView(null);
    //     this.r = this.vc.insert(view);
    // }

    // ngdeleteAfterView(i:number) {
    //     let index = this.vc.indexOf(this.r);
    //     console.log(index);
    //     this.vc.detach(index);
    // }




    contacts = [
      {
        id: 1,
        name: "Laura",
        email: "lbutler0@latimes.com",
        age: 47
      },
      {
        id: 1,
        name: "Laura",
        email: "lbutler0@latimes.com",
        age: 47
      },
      {
        id: 1,
        name: "Laura",
        email: "lbutler0@latimes.com",
        age: 47
      },
      {
        id: 1,
        name: "Laura",
        email: "lbutler0@latimes.com",
        age: 47
      },
      {
        id: 1,
        name: "Laura",
        email: "lbutler0@latimes.com",
        age: 47
      }
    ];

  constructor(private _tarifsService:TarifsService,private componentFactoryResolver: ComponentFactoryResolver) {
          
   }

  ngOnInit() {
   

    this._tarifsService.getTarifTntAbon({typedemande:'abonne',typedebouquet:1,duree:2})
      .subscribe(
        data => {
          console.log(data);
        },
        error => alert(error),
        () => {
          console.log('test getTarifTnt sentool')
        }
      );
  }




}
