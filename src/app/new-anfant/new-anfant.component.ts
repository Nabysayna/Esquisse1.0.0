import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-anfant',
  templateUrl: './new-anfant.component.html',
  styleUrls: ['./new-anfant.component.css']
})
export class NewAnfantComponent implements OnInit {


  private jsonData : any[] =  JSON.parse(sessionStorage.getItem('datas'));;

  constructor() { 

  }

  ngOnInit() {
  }
}
