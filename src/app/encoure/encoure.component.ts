import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-encoure',
  templateUrl: './encoure.component.html',
  styleUrls: ['./encoure.component.css']
})
export class EncoureComponent implements OnInit {

  constructor() { }

  @Input() process:any[];
  
  ngOnInit() {
  }

}
