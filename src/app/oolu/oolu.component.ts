import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-oolu',
  templateUrl: './oolu.component.html',
  styleUrls: ['./oolu.component.css']
})
export class OoluComponent implements OnInit {
  telephone:string;
  compte:string;
  montant:string;
  etatsuccess:boolean=false;
  etaterror:boolean=false;

  /******************************************************************************************************/
  constructor(){}

  ngOnInit() { }

  payeroolusolar(){
    sessionStorage.setItem('curentProcess',JSON.stringify({'nom':'OOLU SOLAR','operateur':8,'operation':5,'telephone':this.telephone.toString(), 'compte':this.compte, 'montant':this.montant}));
  }


}

